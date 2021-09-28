import React from 'react'
import PropTypes from 'prop-types'
import StyledFullBg from '../../styled/FullBg'
import Footer from './Footer'

export default function FullBg (props) {
  return (
    <StyledFullBg>
      {props.children || 'Empty'}
      <Footer />
    </StyledFullBg>
  )
}

FullBg.propTypes = {
  children: PropTypes.node.isRequired,
}
