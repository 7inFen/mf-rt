import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
import { BorderlessTableOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const StyledDivider = styled(Divider)`
  font-weight: bold;
  &:before {
    width: 1%;
    visibility: hidden;
  }
`

export default function Bar({ children }) {
  return (
    <StyledDivider orientation="left">
      <BorderlessTableOutlined />
      &nbsp;
      {children}
    </StyledDivider>
  )
}

Bar.propTypes = {}
