/**
 * @author QIN Fen
 * @email hellowd93@gmail.com
 * @create date 2019-05-22 15:23:59
 * @modify date 2019-05-25 15:25:57
 * @desc 页面右上角用户、登出等功能模块
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import authActions from '../../actions/auth'
import { Icon, Popover } from 'antd'
import history from '../../store/history'
import styled, { createGlobalStyle } from 'styled-components'

const Wrap = styled.div`
  & > .ant-avatar {
    width: 24px;
    height: 24px;
 }
  & > span {
    margin-left: 10px;
  }
  .site-info__division {
    display: inline-block;
    width: 1px;
    height: 10px;
    background: #ddd;
    &:first-child {
      display: none;
    }
  }
  .anticon {
    margin-left: 20px;
  }
  .site-info__user-name {
    cursor: pointer;
  }
`

const StyledPopoverContent = createGlobalStyle`
  .siteInfo__userInfo {
    .ant-popover-inner-content {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      li {
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        a {
          color: $font-color;
        }
        &:hover {
          a {
            color: $primary-color;
          }
        }
      }
    }
  }
`

export class SiteInfo extends Component {
  static propTypes = {
    // isLoading: PropTypes.bool,
    actions: PropTypes.object,
    logout: PropTypes.func,
    account: PropTypes.object
  }

  handleLogout = () => {
    this.props.actions.logout()
    history.replace('/login')
  }

  render () {
    const { account } = this.props
    return (
      <Wrap>
        <StyledPopoverContent />
        <Popover
          title=''
          placement='bottom'
          overlayClassName='siteInfo__userInfo'
          trigger='hover'
          content={
            <ul>
              <li>
                <span onClick={this.handleLogout} style={{ color: '#f77' }}>
                  退出
                </span>
              </li>
            </ul>
          }
        >
          <span className='site-info__user-name' style={{ cursor: 'pointer' }}>
            {account.account_name || ''}
            <Icon type='caret-down' style={{ marginLeft: 5 }} />
          </span>
        </Popover>
      </Wrap>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.auth.account
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...authActions
      },
      dispatch
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteInfo)
