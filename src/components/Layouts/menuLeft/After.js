import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
import styled from 'styled-components'

const StyledAfter = styled.div``

const After = ({ name }) => {
  if (!name) {
    return null
  }

  let element = null
  switch (name) {
    case 'divider':
      element = <Divider />
      break
    default:
      break
  }

  return <StyledAfter>{element}</StyledAfter>
}

After.propTypes = {}

export default After
