import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledLeftRightLayout = styled.div`
  .row {
    display: flex;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    .label {
      /* font-weight: bold; */
      min-width: ${({ leftWidth }) => `${leftWidth}px` ?? 'unset'};
      margin-right: 10px;
      text-align: right;
      white-space: nowrap;
      flex: none;
    }
    .value {
      flex: 1;
    }
  }
`

export default function LeftRightLayout({ data = [], leftWidth }) {
  return (
    <StyledLeftRightLayout leftWidth={leftWidth}>
      {data.map((item, idx) => (
        <div className="row" key={`${idx}`}>
          <span className="label">{item.label}: </span>
          <span className="value">{item.value}</span>
        </div>
      ))}
    </StyledLeftRightLayout>
  )
}

LeftRightLayout.propTypes = {}
