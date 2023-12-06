import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Divider } from 'antd'
import styled from 'styled-components'
import icon from '../../assets/icon/公安备案.png'
import BackgroundImage from '../../styled/BackgroundImage'

const Footer = Layout.Footer
const StyledFooter = styled(Footer)`
  background: transparent;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

function FooterComponent(props) {
  const {
    site: { copyright = '', recordNumber = '' },
  } = props
  return (
    <StyledFooter style={{ ...props.style }}>
      {/* <Link to='/privacy' target='_blank' style={{ ...props.styleLink }}>
        隐私政策
      </Link>
      {' - '} */}
      {copyright ? `${copyright} - ` : ''}
      <a
        href="http://beian.miit.gov.cn/publish/query/indexFirst.action"
        target="_blank"
        title={recordNumber}
        style={{ ...props.styleLink }}
      >
        {recordNumber}
      </a>
      <Divider type="vertical" />
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010102006881"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <BackgroundImage $url={icon} width={14} height={14} style={{ marginRight: 5 }} />
        <span>沪公网安备 31010102006881号</span>
      </a>
    </StyledFooter>
  )
}

FooterComponent.propTypes = {
  style: PropTypes.object,
  styleLink: PropTypes.object,
  site: PropTypes.object,
}

function mapStateToProps({ config: { site } }) {
  return {
    site,
  }
}

export default connect(mapStateToProps)(FooterComponent)
