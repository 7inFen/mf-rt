import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import cx from 'classnames'

const StyledSpan = styled.span`
  position: relative;
  display: inline-block;
  &:after {
    content: '${({ content }) => content}';
    position: absolute;
    top: 0;
    right: -14px;
    display: block;
    background: red;
    color: #fff;
    border-radius: 50px;
    font-size: 12px;
    height: 15px;
    min-width: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0.8);
  }
  &.w2 {
    &:after {
      min-width: 20px;
      right: -20px;
    }
  }
  &.w3 {
    &:after {
      min-width: 26px;
      right: -26px;
    }
  }
  &.w4 {
    &:after {
      min-width: 33px;
      right: -33px;
    }
  }
  &.icon {
    &:after {
      margin-right: 10px;
      margin-top: -6px;
    }
  }
`

const StyledPositionElement = styled.span`
  white-space: nowrap;
`

export default function Badge({ children, counts, icon, ...restProps }) {
  const countsNumber = Number(counts)
  return countsNumber > 0 ? (
    <StyledSpan
      content={countsNumber > 999 ? '999+' : countsNumber}
      className={cx({
        w2: countsNumber >= 10 && countsNumber <= 99,
        w3: countsNumber > 99 && countsNumber <= 999,
        w4: countsNumber > 999,
        icon,
      })}
      {...restProps}
    >
      {/* <StyledPositionElement>{children}</StyledPositionElement> */}
      {children}
    </StyledSpan>
  ) : (
    children
  )
}

Badge.propTypes = {}
