import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Upload from './index'
import { Button, Form } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import BtnLink from '../BtnLink'

const Wrap = styled.div`
  position: relative;
`

const StyledUpload = styled(Upload)`
  .ant-upload-list-text {
    margin: 15px 0 5px;
    border-radius: 4px;
    overflow: hidden;
    & > div {
      padding: 5px 0;
      background: ${({ theme }) => theme.color.bg};
      .ant-upload-text-icon {
        display: none;
      }
      .ant-upload-list-item-name {
        padding-left: 5px;
        background: ${({ theme }) => theme.color.bg};
      }
      &:hover {
        background: #eee;
        .ant-upload-list-item-name {
          background: #eee;
        }
      }
      .ant-upload-list-item-progress {
        padding-left: 0;
      }
    }
  }
`

// TODO 处理响应式时需要注意此处ui
const StyledExample = styled.div`
  position: absolute;
  top: 0;
  left: 130px;
  line-height: 30px;
`

export const UploadBtn = (props) => {
  const {
    loading: propsLoading,
    onChange,
    label = '上传文件',
    buttonProps = {},
    icon = <UploadOutlined />,
    children,
    ...restProps
  } = props
  const [loading, setLoading] = useState(false)

  const handleChange = (values) => {
    const value = values.files.slice(-1)[0]
    const { status, response } = value
    if (status === 'uploading') {
      setLoading(true)
    } else {
      setLoading(false)
      // if (status === 'done') {
      //   onChange(
      //     response?.data || {
      //       id: 'fileId',
      //     },
      //   )
      // }
      if (status === 'done' && response?.status === 'success') {
        onChange(response?.data || {})
      }
    }
  }

  return (
    <Form onValuesChange={handleChange} style={{ display: 'inline-block' }}>
      <StyledUpload
        listType={false}
        extra=""
        accept=".xlsx,.xls"
        preview={false}
        showUploadList={{
          showPreviewIcon: false,
          showDownloadIcon: false,
          showRemoveIcon: true,
          // removeIcon: <StarOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
        }}
        {...restProps}
      >
        {children || (
          <Button icon={icon} loading={loading || propsLoading} {...buttonProps}>
            {label}
          </Button>
        )}
      </StyledUpload>
    </Form>
  )
}

export default function ImportUpload(props) {
  const { example, ...restProps } = props

  return (
    <Wrap>
      <StyledUpload
        listType="text"
        extra="支持xls和xlsx文件，单次最大导入数量不超过1000条"
        accept=".xlsx,.xls"
        preview={false}
        showUploadList={{
          showPreviewIcon: false,
          showDownloadIcon: false,
          showRemoveIcon: true,
          // removeIcon: <StarOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
        }}
        {...restProps}
      >
        <Button icon={<UploadOutlined />}>上传文件</Button>
      </StyledUpload>
      <StyledExample>
        <BtnLink download={example}>模板下载</BtnLink>
      </StyledExample>
    </Wrap>
  )
}

ImportUpload.propTypes = {
  example: PropTypes.object,
}
