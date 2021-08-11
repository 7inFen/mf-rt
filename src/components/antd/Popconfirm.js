import React from 'react'
import PropTypes from 'prop-types'
import { Popconfirm as DefaultPopconfirm } from '../../../node_modules/antd'
import { createGlobalStyle } from 'styled-components'

const StyledPopConfirm = createGlobalStyle`
  .ant-popover {
    .ant-popover-buttons {
      text-align: right;
      & > :first-child {
        margin-left: 20px;
      }
    }
  }
`

// 调换确定和取消按钮位置
export const PopConfirm = (props) => {
  const {
    okText = '确定',
    okType = 'primary',
    cancelText = '取消',
    cancelType = 'default',
    onConfirm = () => {},
    onCancel = () => {},
    okButtonProps,
    cancelButtonProps,
    ...restProps
  } = props
  return (
    <>
      <StyledPopConfirm />
      <DefaultPopconfirm
        okText={cancelText}
        okType={cancelType}
        cancelText={okText}
        okButtonProps={cancelButtonProps}
        cancelButtonProps={{
          type: okType,
          ...okButtonProps,
        }}
        onConfirm={onCancel}
        onCancel={onConfirm}
        {...restProps}
      />
    </>
  )
}

export default PopConfirm

PopConfirm.propTypes = {
  okText: PropTypes.string,
  okType: PropTypes.string,
  cancelText: PropTypes.string,
  cancelType: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
}
