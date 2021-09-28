import PropTypes from 'prop-types'
import React from 'react'
import { Modal, Button } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'

const StyledModal = styled(Modal)`
  .ant-modal-content {
    box-shadow: ${({ theme }) => theme.shadow};
    border-radius: ${({ theme }) => theme.radius};
    .ant-modal-header {
      border-top-left-radius: ${({ theme }) => theme.radius};
      border-top-right-radius: ${({ theme }) => theme.radius};
      .ant-modal-title {
        font-size: 20px;
        /* font-weight: 500; */
      }
    }
    .ant-modal-body {
      padding: 0;
      .content {
        padding: ${({ noPadding, padding }) => (noPadding ? '0' : `${padding}px`)};
        max-height: ${({ actionFixed }) => (actionFixed ? '600px' : 'unset')};
        overflow: ${({ actionFixed }) => (actionFixed ? 'auto' : 'unset')};
      }
      .footer {
        padding: 16px;
        border-top: 1px solid #f0f0f0;
      }
    }
  }
`

const DefaultFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ModalStyle = createGlobalStyle`
  .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

const CustomModal = ({
  title = '提示',
  okText = '确定',
  cancelText = '取消',
  onOk = () => {},
  onCancel = () => {},
  footer = null,
  children,
  okButtonProps,
  cancelButtonProps,
  visible,
  width,
  showOkBtn = false,
  showCancelBtn = false,
  defaultFooterStyle = {},
  noPadding = false,
  padding = 20,
  ...restProps
}) => {
  const actionFixed = showOkBtn || showCancelBtn

  return (
    <StyledModal
      title={title}
      destroyOnClose
      centered
      // mask={false}
      getContainer="#app"
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      visible={!!visible}
      width={width}
      {...restProps}
      footer={null}
      noPadding={noPadding}
      padding={padding}
      actionFixed={actionFixed}
    >
      <ModalStyle />
      <div className="content">{children}</div>
      {(footer || showOkBtn || showCancelBtn) && (
        <div className="footer">
          {footer || (
            <DefaultFooter style={defaultFooterStyle}>
              {showOkBtn && (
                <Button
                  type="primary"
                  {...okButtonProps}
                  onClick={onOk}
                  style={{
                    marginRight: 15,
                  }}
                >
                  {okText}
                </Button>
              )}
              {showCancelBtn && (
                <Button type="secondary" {...cancelButtonProps} onClick={onCancel}>
                  {cancelText}
                </Button>
              )}
            </DefaultFooter>
          )}
        </div>
      )}
    </StyledModal>
  )
}

CustomModal.propTypes = {
  okButtonProps: PropTypes.any,
  cancelButtonProps: PropTypes.any,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  showOkBtn: PropTypes.bool,
  showCancelBtn: PropTypes.bool,
  // visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  defaultFooterStyle: PropTypes.object,
}

export default CustomModal
