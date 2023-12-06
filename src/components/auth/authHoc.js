/**
 * @author QIN Fen
 * @email fen.qin@mediafull.cn
 * @create date 2020-02-17 18:19:20
 * @modify date 2021-04-21 14:37:11
 * @desc 控件权限
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import project from '../../../config/project'
// import { isNumber } from '../../utils/parseNumber'
// import { roleMap } from '../../../config/role'
import cx from 'classnames'

const AUTH_OPEN = project.auth

export default (WrapComponent) =>
  connect(
    (state) => ({
      account: state.auth.account,
    }),
    {},
  )(
    class Auth extends Component {
      static displayName = 'Auth_HOC'
      static propTypes = {
        auth: PropTypes.array,
        authDenied: PropTypes.array,
        onClick: PropTypes.func,
        onChange: PropTypes.func,
        account: PropTypes.object,
        children: PropTypes.node,
        className: PropTypes.string,
      }

      // checkAuthAccess = () => {
      //   // 可以使用roleMap的key, desc, name作为auth的子项校验
      //   const { auth = [], account } = this.props
      //   const accountType = account?.account_type
      //   let authAccess = false
      //   for (let index = 0; index < auth?.length; index++) {
      //     const authItem = auth?.[index]
      //     Object.keys(roleMap).forEach(roleKey => {
      //       if (
      //         (roleKey === accountType) &&
      //            [
      //              roleMap[roleKey]?.key,
      //              roleMap[roleKey]?.desc,
      //              roleMap[roleKey]?.name
      //            ].includes(authItem)
      //       ) {
      //         authAccess = true
      //       }
      //     })
      //     if (authAccess) break
      //   }
      //   return authAccess
      // }
      render() {
        const {
          auth = [],
          authDenied = [],
          onClick,
          onChange,
          children,
          account,
          className = '',
          ...restProps
        } = this.props
        const accountType = account?.account_type
        // const authAccess = this.checkAuthAccess()

        let click = onClick
        let change = onChange
        let authAccess = true

        // TODO: 权限标记
        if (AUTH_OPEN) {
          if (auth?.length) {
            authAccess = auth?.includes?.(accountType)
          } else if (authDenied?.length) {
            authAccess = !authDenied?.includes?.(accountType)
          } else {
            authAccess = false
          }
          authAccess = authAccess || false
          if (!authAccess) {
            click = () => {}
            change = () => {}
          }
        }

        const props = {
          ...Map(restProps).toJS(),
          onClick: click,
          onChange: change,
        }

        let renderChildren = children
        if (typeof children === 'function') {
          renderChildren = children?.(authAccess)
        }

        return (
          <WrapComponent
            {...props}
            className={cx({
              _auth: true,
              _authAccess: authAccess,
              _authDenied: !authAccess,
              [className]: !!className,
            })}
            authAccess={authAccess}
            component={<WrapComponent />}
          >
            {renderChildren}
          </WrapComponent>
        )
      }
    },
  )
