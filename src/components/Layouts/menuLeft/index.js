import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Layout, FloatButton } from 'antd'
import Footer from '../Footer'
import logo from '../../../assets/logo/logo横版+slogan蓝@2x.png'
import logo_small from '../../../assets/logo/logo_small.png'
import Menu from './Menu'
import Header from './Header'
import history from '_history'
import { roleMap } from '../../../../config/role'
import { isAdmin } from '../../../components/auth'
import theme from '../../../theme'

const { BackTop } = FloatButton

const { Content, Sider } = Layout

const StyledWorkspace = styled(Content)`
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
`
const StyledContent = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  //padding: 20px 20px 0;
  padding: ${theme.gutter};
  background: ${({ theme }) => theme.color.bg};
  height: 100%;
  display: flex;
  flex-direction: column;
`
const ContentBody = styled.div`
  flex: 1;
`
const LogoWrap = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* margin-bottom: 50px; */
`
const logoCommon = () => `
  height: 42px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
`
const StyledLogo = styled.div`
  ${logoCommon};
  width: 158px;
  background-image: url(${logo});
`
const StyledSmallLogo = styled.div`
  ${logoCommon};
  width: 50px;
  background-image: url(${logo_small});
`

export const StyledLogoName = styled.span`
  font-size: ${({ fontSize = 20 }) => fontSize}px;
  font-weight: bold;
  letter-spacing: 2px;
  white-space: nowrap;
  &,
  a {
    /* color: ${({ theme }) => theme.color.primary}; */
    color: #333;
  }
`

export default function LayoutMenuLeft(props) {
  const config = useSelector((store) => store.config)
  const account = useSelector((store) => store.auth.account) || {}
  let href = roleMap[account.account_type]?.homeRoute || '/'

  const { menu, site } = config

  const switchToBrand = (e) => {
    e.preventDefault()
    setTimeout(() => {
      history.push(href)
    }, 0)
  }

  const isPress = useSelector((store) => store.config.keyPress.isPress)
  const handleToSet = () => {
    if (isAdmin() && isPress) {
      window.open('/set')
    }
  }

  return (
    <Layout>
      <Sider theme="light" collapsed={menu.fold} width={220} onDoubleClick={handleToSet}>
        <LogoWrap>
          <a href={href} onClick={switchToBrand}>
            <StyledLogoName>{menu.fold ? '' : site.name}</StyledLogoName>
          </a>
        </LogoWrap>
        <Menu />
      </Sider>
      <StyledWorkspace>
        <StyledContent id="content">
          <Header />
          <ContentBody>{props.children}</ContentBody>
          <Footer />
        </StyledContent>
        <BackTop target={() => document.getElementById('content')} style={{ bottom: 55, right: 55, zIndex: 999 }} />
      </StyledWorkspace>
    </Layout>
  )
}

LayoutMenuLeft.propTypes = {
  children: PropTypes.node,
}
