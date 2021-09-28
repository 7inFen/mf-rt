import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover, Space } from 'antd'
import { createGlobalStyle } from 'styled-components'
import history from '_history'
import { logout } from '../../actions/auth'
import Modal from '../Modal'
import ChangePasswordForm from './ChangePasswordForm'
import QualificationInfo from './QualificationInfo'
import cx from 'classnames'

export const StyledUserPop = createGlobalStyle`
  .userpop-list {
    .ant-popover-inner {
      border-radius: ${({ theme }) => theme.radius};
      /* box-shadow: ${({ theme }) => theme.shadow}; */
    }
    .ant-popover-inner-content {
      padding: 10px 0;
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        li {
          /* padding: 5px 0; */
          font-size: 13px;
          & > div {
            padding: 5px 0;
            margin: 0 20px;
          }
          &:not(:last-child) > div {
            border-bottom: 1px solid #eee;
          }
          &:not(.no-cursor) {
            cursor: pointer;
            &:hover {
              background: #eee;
            }
          }
        }
      }
    }
  }
`

export default connect(
  (state) => ({
    initAccountStatusMap: state.map?.init?.accountStatus || false,
    accountStatusMap: state.map?.map?.accountStatus || {},
  }),
  {
    logout,
  },
)(
  class UserPop extends Component {
    static propTypes = {
      children: PropTypes.node,
      logout: PropTypes.func,
      account: PropTypes.object,
      isRoot: PropTypes.bool,
      initAccountStatusMap: PropTypes.bool,
      fetchMap: PropTypes.func,
      accountStatusMap: PropTypes.object,
      isAgentAdmin: PropTypes.bool,
    }

    state = {
      infoShow: false,
      passwordShow: false,
      popShow: false,
    }

    handleLogout = () => {
      const { logout } = this.props
      logout()
      history.replace('/login')
    }

    handlePasswordShow = () => {
      this.setState({
        passwordShow: true,
        popShow: false,
      })
    }

    handlePasswordHide = () => {
      this.setState({
        passwordShow: false,
      })
    }

    handleInfoShow = () => {
      const { isAgentAdmin } = this.props
      if (isAgentAdmin) {
        // 涉及隐私问题，只有代理管理员可查看资质信息
        this.setState({
          infoShow: true,
          popShow: false,
        })
      }
    }

    handleInfoHide = () => {
      this.setState({
        infoShow: false,
      })
    }

    render() {
      const { infoShow, passwordShow, popShow } = this.state
      const { children, account, isRoot, accountStatusMap, isAgentAdmin } = this.props
      const { company = '', account_status = '', accountTypeName = '' } = account
      const popContent = (
        <ul>
          <StyledUserPop />
          {!isRoot && (
            <li
              onClick={this.handleInfoShow}
              className={cx({
                'no-cursor': !isAgentAdmin,
              })}
            >
              <div>
                <Space>
                  <span>{company}</span>
                  <span className="bold">{accountStatusMap?.[account_status] || ''}</span>
                </Space>
              </div>
            </li>
          )}
          <li className="no-cursor">
            <div>账户类型：{accountTypeName}</div>
          </li>
          <li onClick={this.handlePasswordShow}>
            <div>修改密码</div>
          </li>
          <li onClick={this.handleLogout}>
            <div>退出登录</div>
          </li>
        </ul>
      )
      return (
        <>
          <Popover
            // getPopupContainer={() => document.getElementById('app')}
            placement="bottomRight"
            content={popContent}
            visible={popShow}
            onVisibleChange={(visible) => this.setState({ popShow: visible })}
            overlayClassName="userpop-list"
          >
            {children}
          </Popover>
          <Modal title="修改密码" visible={passwordShow} onCancel={this.handlePasswordHide}>
            <ChangePasswordForm onCancel={this.handlePasswordHide} onSuccess={this.handlePasswordHide} />
          </Modal>
          <Modal title="代理商资质信息" visible={infoShow} onCancel={this.handleInfoHide} width={800}>
            <QualificationInfo onCancel={this.handleInfoHide} onSuccess={this.handleInfoHide} />
          </Modal>
        </>
      )
    }
  },
)
