import React from 'react'
import project from '../../../config/project'
import authHoc from './authHoc'
import { Button, Switch, Input, InputNumber } from 'antd'
import ROLE from '../../../config/role'

export default authHoc
export const AuthBtn = authHoc(Button)
export const AuthSpan = authHoc((props) => <span {...props} />)
export const AuthDiv = authHoc((props) => <div {...props} />)
export const AuthSwitch = authHoc(Switch)
export const AuthInput = authHoc(Input)
export const AuthInputNumber = authHoc(InputNumber)

export const AuthHide = authHoc((props) => {
  const { authAccess, children } = props
  return authAccess ? children : null
})

export const getAccount = () => {
  const appStore = require('../../store/appStore').default
  const account = appStore?.getState()?.auth?.account || {}
  return account
}

const AUTH_OPEN = project.auth
export const authAccess = (params) => {
  const { auth = [], authDenied = [] } = params || {}
  const account = getAccount()
  const accountType = account?.account_type
  let access = true
  if (AUTH_OPEN) {
    if (auth?.length) {
      access = auth?.includes?.(accountType)
    } else if (authDenied?.length) {
      access = !authDenied?.includes?.(accountType)
    } else {
      access = false
    }
    access = access || false
  }
  return access
}

export const isAdmin = () => {
  let admin = false
  const account = getAccount()
  const accountType = account?.account_type
  switch (accountType) {
    case ROLE.ROOT:
    case ROLE.ADMIN:
    case ROLE.AGENT_ADMIN:
      admin = true
      break
    default:
      break
  }
  return admin
}

export const getCEO = () => {
  const appStore = require('../../store/appStore').default
  const { id: agentId } = appStore?.getState?.()?.auth?.agentInfo || {}
  const { map: agentMap } = appStore?.getState?.()?.init?.agent || {}
  return (
    agentMap?.[agentId]?.ceo || {
      id: '',
      name: '',
    }
  )
}

// 代理商管理员不会出现在账号列表
export const isCEO = (params) => {
  const { id, name } = params || {}
  if (id || name) {
    const { id: ceoId, name: ceoName } = getCEO()
    return ceoId === id || ceoName === name
  }
  // 判断当前用户是否ceo
  let ceo = false
  const account = getAccount()
  const accountType = account?.account_type
  switch (accountType) {
    case ROLE.AGENT_ADMIN:
      ceo = true
      break
    default:
      break
  }
  return ceo
}

export const isAgentEditable = () => {
  const appStore = require('../../store/appStore').default
  const { editable } = appStore?.getState?.()?.auth?.agentInfo || {}
  return !!editable
}
