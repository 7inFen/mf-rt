import React from 'react'
import PropTypes from 'prop-types'
import { Button as DefaultButton } from '../../../node_modules/antd'
import styled from 'styled-components'
import { PlusOutlined, DownloadOutlined, UndoOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons'

const StyledButton = styled(DefaultButton)`
  /* loading时隐藏文字 */
  /* &.ant-btn-loading {
    & > :not(.ant-btn-loading-icon) {
      display: none;
    }
    .ant-btn-loading-icon {
      .anticon-loading {
        padding: 0;
      }
    }
  } */
  /* 解决按钮 loading 变形的问题 */
  &.ant-btn-loading {
    .anticon-loading {
      padding: 4px;
      margin-right: 4px;
    }
  }
`

// Button 增加 width 属性
export const Button = (props) => {
  const { width, style = {}, icon, ...restProps } = props
  let btnIcon = icon
  switch (icon) {
    case 'plus':
    case 'add':
      btnIcon = <PlusOutlined />
      break
    case 'download':
    case 'export':
      btnIcon = <DownloadOutlined />
      break
    case 'reset':
      btnIcon = <UndoOutlined />
      break
    case 'gear':
      btnIcon = <SettingOutlined />
      break
    case 'upload':
      btnIcon = <UploadOutlined />
      break
    default:
      break
  }
  return (
    <StyledButton
      style={{
        width,
        ...style,
      }}
      icon={btnIcon}
      {...restProps}
    />
  )
}

export default Button

Button.propTypes = {
  width: PropTypes.number,
  style: PropTypes.object,
}
