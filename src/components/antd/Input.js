import React from 'react'
import PropTypes from 'prop-types'
import { Input as DefaultInput } from '../../../node_modules/antd'
import styled from 'styled-components'

const StyledInput = styled(DefaultInput)``

// Input 增加 width 属性
export const Input = (props) => {
  const { width, style = {}, ...restProps } = props
  return (
    <StyledInput
      style={{
        width,
        ...style,
      }}
      {...restProps}
    />
  )
}

Input.Group = DefaultInput.Group
Input.Search = DefaultInput.Search
Input.TextArea = DefaultInput.TextArea
Input.Password = DefaultInput.Password

export default Input

Input.propTypes = {
  width: PropTypes.number,
  style: PropTypes.object,
}
