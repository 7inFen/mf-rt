import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Space, Row } from 'antd'
import CustomIcon from '../../CustomIcon'
import styled from 'styled-components'
import theme from '../../../theme'

const StyledBefore = styled.div`
  padding-left: 35px;
  padding-right: 12px;
  margin-top: -5px;
  margin-bottom: 5px;
  background: #fff;
  border-bottom-right-radius: ${theme.borderRadius};
  .group-row {
    width: 100%;
    .ant-space-item:nth-child(2) {
      width: 100%;
    }
  }
`

const Before = ({ name }) => {
  if (!name) {
    return null
  }

  let element = null
  switch (name) {
    case '抖音':
    case '小红书':
      element = (
        <Space className="group-row" size={10}>
          <CustomIcon icon={name} size={18} />
          <Divider orientation="left" orientationMargin={0}>
            {name}
          </Divider>
        </Space>
      )
      break
    default:
      break
  }

  return <StyledBefore>{element}</StyledBefore>
}

Before.propTypes = {}

export default Before
