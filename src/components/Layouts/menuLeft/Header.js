import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { toggleMenuFold } from '../../../actions/config'
import { Layout, Divider } from 'antd'
import styled from 'styled-components'
import User from '../User'
import Breadcrumb from './Breadcrumb'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const HeaderWrap = styled(Layout.Header)`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius};
  margin-bottom: 20px;
  padding: 0 20px;
  box-shadow: 0px 5px 11px 0px rgba(0, 0, 0, 0.03);
`
const Left = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.h1`
  font-size: 16px;
  margin: 0;
`
const Right = styled.div`
  color: ${({ theme }) => theme.color.grey};
`
const MenuToggleWrap = styled.div`
  cursor: pointer;
  font-size: 16px;
  margin-right: 12px;
`

export default () => {
  const location = useLocation()
  const pathMap = useSelector((store) => store.init?.pathMap || {})
  const { title } = pathMap?.[location.pathname] || {}
  const dispatch = useDispatch()
  const menuFold = useSelector((store) => store.config?.menu?.fold) || false
  const toggleMenu = () => {
    dispatch(toggleMenuFold(!menuFold))
  }

  return (
    <HeaderWrap>
      <Left>
        <MenuToggleWrap onClick={toggleMenu}>{menuFold ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</MenuToggleWrap>
        <Title>{title}</Title>
        <Breadcrumb />
      </Left>
      <Right>
        <User />
      </Right>
    </HeaderWrap>
  )
}
