import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'

export default function Tp(props) {
  const { title, children, style, ellipsis, rows, width, maxWidth, minWidth, ...restProps } = props
  return (
    <Typography.Paragraph
      style={{
        margin: 0,
        // width: width,
        ...(maxWidth
          ? {
              maxWidth,
            }
          : minWidth
          ? {
              minWidth,
            }
          : {
              width,
            }),
        ...style,
      }}
      ellipsis={{ rows: rows || 2, ...ellipsis }}
      {...restProps}
    >
      <span title={title || children}>{children || '-'}</span>
    </Typography.Paragraph>
  )
}

Tp.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  ellipsis: PropTypes.object,
  rows: PropTypes.number,
  width: PropTypes.number,
}
