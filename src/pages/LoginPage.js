/**
 * @author QIN Fen
 * @email hellowd93@gmail.com
 * @create date 2019-05-22 15:23:33
 * @modify date 2023-04-04 11:46:36
 * @desc 登录页
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/auth'
import { Form, Input, Button, Alert } from 'antd'
import { MobileOutlined, LockOutlined } from '@ant-design/icons'
import queryString from 'query-string'
// import Footer from '../components/Layouts/Footer'
import isIE from '../utils/isIE'
import cx from 'classnames'
import StyledLogin from 'styled/login'
import { Helmet } from 'react-helmet'
import FullLayout from '../components/Layouts/Fullbg'
import history from '_history'

const FormItem = Form.Item
const formItemLayout = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 4 }
  // },
  // wrapperCol: {
  //   xs: { span: 24 },
  //   sm: { span: 24 }
  // }
}

// const browserDownloadLink = {
//   chrome: 'https://www.google.cn/chrome/',
//   firefox: 'https://www.firefox.com.cn/',
//   ie11: 'https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads'
// }

export class LoginPage extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    login: PropTypes.func,
    isLogining: PropTypes.bool,
    location: PropTypes.object,
    project: PropTypes.object,
    site: PropTypes.object,
    authSuccess: PropTypes.bool,
    requestFail: PropTypes.object,
    account: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {
        phone: '',
        password: '',
      },
      currentFocus: '',
      showRequestFailMsg: true,
    }
    this._form = React.createRef()
    this._password = React.createRef()
  }

  componentDidMount() {
    const { authSuccess, location, account, logout } = this.props
    if (authSuccess) {
      history.replace(this.getRedirectLink())
    }
    // 将手机号设置到输入框
    const { phone = '' } = queryString.parse(location.search)
    const form = this._form.current
    if (form && phone) {
      form.setFieldsValue({
        phone,
      })
      this._password.current.focus()
    }
  }

  getRedirectLink = () => {
    const { location, project } = this.props
    return queryString.parse(location.search).redirect || `${project.history.baseName}`
  }

  handleLogin = (values) => {
    const { login } = this.props
    values.phone = values.phone.trim()
    login(
      {
        ...values,
        tick: Date.now(),
      },
      (data) => {
        // const { verification_required } = data
        // if (verification_required) {
        //   history.push(`/verification-account?phone=${values.phone}`)
        // } else {
        // 登录后需要强刷更新路由权限
        setTimeout(() => {
          window.location.href = this.getRedirectLink()
        }, 0)
        // }
      },
      (failMsg) => {
        this.setState({
          showRequestFailMsg: true,
        })
      },
    )
  }

  handleValuesChange = (_, allValues) => {
    this.setState({
      data: allValues,
      showRequestFailMsg: false,
    })
  }

  render() {
    const { data, showRequestFailMsg } = this.state
    const { isLogining, site, authSuccess, requestFail } = this.props
    const phoneIsSet = !!data.phone
    const passwordIsSet = !!data.password
    const requestFailMsg = requestFail.type === 'AUTH_ACCOUNT_LOGIN' ? requestFail.msg : ''
    return authSuccess ? null : (
      <FullLayout
        className={cx({
          'login-warp': true,
          ie9: isIE(10, 'lt'),
        })}
      >
        <Helmet>
          <title>登录</title>
        </Helmet>
        <StyledLogin>
          <div className="site-title">{`${site.name}`}</div>
          <Form
            {...formItemLayout}
            layout="vertical"
            onFinish={this.handleLogin}
            ref={this._form}
            onValuesChange={this.handleValuesChange}
            hideRequiredMark
          >
            <FormItem
              label={
                <div
                  className={cx({
                    show: phoneIsSet,
                  })}
                >
                  <MobileOutlined />
                  手机号
                </div>
              }
              colon={false}
              name="phone"
              type="tel"
              rules={[
                { required: true, message: '请输入手机号！' },
                {
                  message: '手机号格式不正确！',
                  // 登录页需要放行root账号
                  pattern: /^\s*(1[345789]\d{9}|root|rd|op)\s*$/i,
                },
              ]}
              className={cx({
                mb0: true,
                hideIcon: phoneIsSet,
                inputItem: true,
              })}
            >
              <Input
                prefix={<MobileOutlined />}
                placeholder="手机号"
                autoFocus
                onFocus={() => {
                  this.setState({
                    currentFocus: 'phone',
                  })
                }}
              />
            </FormItem>
            <FormItem
              label={
                <div
                  className={cx({
                    show: passwordIsSet,
                  })}
                >
                  <LockOutlined />
                  密码
                </div>
              }
              colon={false}
              name="password"
              rules={[
                { required: true, message: '请输入密码！' },
                { min: 8, message: '密码不能少于8位！' },
              ]}
              className={cx({
                hideIcon: passwordIsSet,
                inputItem: true,
              })}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
                onFocus={() => {
                  this.setState({
                    currentFocus: 'password',
                  })
                }}
                ref={this._password}
                allowClear
              />
            </FormItem>
            <div className="account-error">
              {showRequestFailMsg && requestFailMsg ? <Alert message={requestFailMsg} type="error" showIcon /> : ''}
            </div>
            <FormItem className="button-wrapper">
              <Button
                type="primary"
                htmlType="submit"
                className="login-btn"
                loading={isLogining}
                // loading
              >
                登录
              </Button>
            </FormItem>
          </Form>
          <div className="account-helper">
            <a href="https://oa.mdfull.com/signup" target="_blank">
              注册账号
            </a>
            <a href={`https://oa.mdfull.com/reset-password?phone=${data.phone}`} target="_blank">
              忘记密码
            </a>
          </div>
        </StyledLogin>
      </FullLayout>
    )
  }
}

function mapStateToProps({
  auth: { isLogining, authSuccess, account },
  config: { site, project },
  init: { currentRequestFail: requestFail },
}) {
  return {
    isLogining,
    site,
    project,
    authSuccess,
    requestFail,
    account,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
