import React from 'react'
import { Col } from 'antd'

export const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
export default layout

export const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
}

export const ColLabel = props => <Col {...layout.labelCol} {...props} />
export const ColWrapper = props => <Col {...layout.wrapperCol} {...props} />
