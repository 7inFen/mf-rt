import React, { useState } from 'react'
import PropTypes from 'prop-types'
import StyledFullBg, { StyledBg } from '../../styled/FullBg'
import Footer from './Footer'

const getMove = (_move) => {
  const moveAbs = Math.abs(_move)
  const isNegative = _move !== moveAbs
  const maxMove = Math.min(moveAbs, 10)
  return isNegative ? -maxMove : maxMove
}

export default function FullBg(props) {
  const [bg, setBg] = useState(null)

  const handleMouseMove = (e) => {
    // const { movementX = 0, movementY = 0 } = e || {}
    // if (bg) {
    //   bg.style.transform = `translate3d(${getMove(movementX)}px, ${getMove(movementY)}px, 0px)`
    // }
  }

  return (
    <StyledFullBg onMouseMove={handleMouseMove}>
      <StyledBg ref={setBg} />
      {props.children || 'Empty'}
      <Footer />
    </StyledFullBg>
  )
}

FullBg.propTypes = {
  children: PropTypes.node.isRequired,
}
