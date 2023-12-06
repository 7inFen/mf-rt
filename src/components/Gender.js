import React from 'react'
import PropTypes from 'prop-types'
import { ManOutlined, WomanOutlined } from '@ant-design/icons'

const Gender = ({ gender }) => {
  let element = gender
  switch (gender) {
    case '男':
      element = (
        <ManOutlined
          style={{
            color: '#1677ff',
          }}
          title="男"
        />
      )
      break
    case '女':
      element = (
        <WomanOutlined
          style={{
            color: '#eb2f96',
          }}
          title="女"
        />
      )
      break
    default:
      break
  }
  return element
}

Gender.propTypes = {}

export default Gender
