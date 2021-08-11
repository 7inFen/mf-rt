import React from 'react'
import PropTypes from 'prop-types'
import emptyBg from '../../assets/logo/authmn.png'
import BackgroundImage from '../../styled/BackgroundImage'
import styled from 'styled-components'
import { Spin } from 'antd'

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .styled-bg-image {
    margin-top: -50px;
  }
  .text {
    color: ${({ theme }) => theme.color.grey};
  }
`

export default function Placeholder(props) {
  const { children = null, style = {}, loading } = props
  return (
    <Spin spinning={loading}>
      <StyledWrap style={style}>
        <BackgroundImage url={emptyBg} width={400} height={220} />
        <span className="text">{children}</span>
      </StyledWrap>
    </Spin>
  )
}

Placeholder.propTypes = {}
