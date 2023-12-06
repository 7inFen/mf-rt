import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import styled from 'styled-components'
import theme from '../theme'

const StyledBlock = styled.div`
  background: #fff;
  padding: 12px;
  border-radius: ${({ radius }) => `${radius ?? parseInt(theme.borderRadius, 10)}px`};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.03);
`
const StyledMargin = styled.div`
  &:not(:last-child) {
    margin-bottom: ${theme.gutter};
  }
`
export default function Block({ loading = false, ...restProps }) {
  return (
    <StyledMargin>
      <Spin spinning={loading}>
        <StyledBlock {...restProps} />
      </Spin>
    </StyledMargin>
  )
}

Block.propTypes = {}
