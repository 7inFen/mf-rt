import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import request from '../lib/request'
import Modal from './Modal'
import { Form, Button, Spin } from 'antd'
import Immutable from 'immutable'
import styled from 'styled-components'
import cx from 'classnames'
// import Upload from './Upload'
import getUploadFiles, { getUploadFilesKey } from '../utils/getUploadFiles'
// import { parseArray } from '../utils/parsePost'

const defaultLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

// 按钮
const defaultTailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
}

const StyledContent = styled.div`
  padding: 20px;
  max-height: ${({ $maxHeight = 600 }) => $maxHeight}px;
  overflow: auto;
`

const StyledFooter = styled.div`
  padding: 16px 0;
  position: relative;
  z-index: 2;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;

  & > div {
    flex: 1;
    margin: 0;
  }
`

const valueIsChanged = (v1, v2) => {
  // 不设置 initialValues 时，表单项默认值为 undefined
  // 移除值为 undefined 的项
  const removeUndefinedValueKey = (obj = {}) => {
    return Object.keys(obj).reduce((prev, curr) => {
      const value = obj[curr]
      if (value !== undefined) {
        prev[curr] = value
      }
      return prev
    }, {})
  }
  const _v1 = removeUndefinedValueKey(v1)
  const _v2 = removeUndefinedValueKey(v2)
  console.log(_v1, _v2)
  return !Immutable.Map(_v1).equals(Immutable.Map(_v2))
}

export default function FormModal(props) {
  const {
    title = '标题',
    initialValues = {},
    data = [],
    open,
    visible: _visible,
    onCancel,
    api,
    url,
    method = 'get',
    params,
    onSubmit,
    onChange,
    parseParams,
    width,
    forceInitValue,
    layout: _layout,
    tailLayout: _tailLayout = defaultTailLayout,
    closeAfterSubmit = true,
    checkEmpty = true,
    className = '',
    styled = null,
    onForm,
    readonly = false,
    contentLoading = false,
    loading: _contentLoading = false,
    plain = false,
    footer = () => {},
    formLayout = 'horizontal',
    leftWidth = 6,
  } = props

  const visible = open ?? _visible

  // 表单布局
  const layout = _layout || {
    ...defaultLayout,
    labelCol: {
      span: leftWidth ?? defaultLayout.labelCol.span,
    },
    wrapperCol: {
      span: typeof leftWidth === 'number' ? 24 - leftWidth : defaultLayout.wrapperCol.span,
    },
  }

  const tailLayout = _tailLayout || {
    ...defaultTailLayout,
    wrapperCol: {
      offset: leftWidth ?? defaultTailLayout.wrapperCol.offset,
      span: typeof leftWidth === 'number' ? 24 - leftWidth : defaultTailLayout.wrapperCol.span,
    },
  }

  const [loading, setLoading] = useState(false)

  const handleFinish = (values) => {
    console.log(values, initialValues)
    if (checkEmpty && !valueIsChanged(values, initialValues)) {
      onCancel?.()
      return
    }

    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        const itemValue = values[key]
        const target = data.filter((i) => i.name === key)?.[0] || {}
        switch (target.valueType) {
          case 'number':
            values[key] = Number(itemValue)
            break
          case 'date':
            values[key] = itemValue?.format?.('YYYY-MM-DD') || itemValue
            break
          default:
            break
        }
      }
    }

    const allParams = {
      ...values,
      ...params,
    }

    // 解析文件格式
    const populateParams = (() => {
      const values = parseParams ? parseParams(allParams) : allParams
      const uploadKeys = data.filter((item) => item.type === 'upload').map((item) => item.name)
      const uploadFileKeys = data.filter((item) => item.type === 'upload' && !!item.sourceFile).map((item) => item.name)
      const populateValues = {}
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          const value = values[key]
          if (uploadFileKeys.includes(key)) {
            populateValues[key] = getUploadFiles(value)
          } else if (uploadKeys.includes(key)) {
            populateValues[key] = getUploadFilesKey(value)
          } else {
            populateValues[key] = value
          }
          // if (populateValues[key] instanceof Array) {
          //   populateValues[key] = parseArray(populateValues[key])
          // }
        }
      }
      // console.log(populateValues)
      return populateValues
    })()

    if (!api && !url) {
      onSubmit?.(populateParams)
      if (closeAfterSubmit) {
        onCancel?.()
      }
      return
    }

    setLoading(true)

    if (typeof api === 'function') {
      // console.log(api)
      const _api = api(populateParams, handleSuccess, handleFail)
      typeof _api === 'function' && _api()
    } else {
      request({
        url,
        method,
        params: populateParams,
        onSuccess: handleSuccess,
        onFail: handleFail,
      })()
    }
  }

  const handleSuccess = (resData) => {
    onSubmit?.(resData)
    setLoading(false)
    if (closeAfterSubmit) {
      onCancel?.()
    }
  }

  const handleFail = () => {
    setLoading(false)
  }

  const [form] = Form.useForm()
  onForm?.(form)

  useEffect(() => {
    if (forceInitValue) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues])

  const handleFormValuesChange = (values) => {
    console.log(values)
    onChange?.(values)
  }

  if (!visible) {
    return null
  }

  // 是否有上传文件表单
  const hasUpload = data.some((item) => item.type === 'upload')

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      width={width}
      noPadding
      className={cx({
        [className]: !!className,
      })}
    >
      {styled}
      <Spin spinning={contentLoading || _contentLoading}>
        <Form
          {...layout}
          onFinish={handleFinish}
          initialValues={initialValues}
          onValuesChange={handleFormValuesChange}
          form={form}
          layout={formLayout}
          preserve={false}
        >
          <StyledContent $maxHeight={readonly ? 650 : 600}>
            {data.map((item, idx) => {
              const {
                label = '',
                name = '',
                message = '',
                rules,
                required = true,
                render,
                visible = true,
                renderKey = idx,
                colon = true,
                className = '',
                type = '',
                disabled = false,
                renderPlain,
                style = {},
                extra = undefined,
                // whitespace = true,
                version = '',
                length,
              } = item

              let renderElement = null
              if (type === 'upload') {
                // renderElement = (
                //   <Upload
                //     disabled={disabled}
                //     required={required}
                //     name={name}
                //     extra=""
                //     listType="picture"
                //     // 不限制上传文件格式
                //     accept=""
                //     acceptDownload
                //     uploadTip={extra}
                //     version={version}
                //     length={length || Number.MAX_SAFE_INTEGER}
                //   />
                // )
              } else {
                // console.log(typeof render, name, form.getFieldValue(name))
                if (plain) {
                  const _renderPlain = renderPlain || render
                  renderElement = typeof _renderPlain === 'function' ? _renderPlain(initialValues[name]) : _renderPlain
                } else {
                  renderElement =
                    typeof render === 'function'
                      ? render(form.getFieldValue(name), (v) =>
                          form.setFieldsValue({
                            [name]: v,
                          }),
                        )
                      : render
                }
              }
              const initialRules = []
              if (name && required) {
                initialRules.push({
                  required: true,
                  message: message || `${label}不能为空`,
                })
                // if (whitespace) {
                //   initialRules[0].whitespace = true
                // }
              }
              return visible ? (
                <Form.Item
                  key={`${name || renderKey}`}
                  {...(name && type !== 'upload'
                    ? {
                        name,
                      }
                    : {})}
                  label={label}
                  colon={colon}
                  required={name && required && !disabled}
                  rules={rules || initialRules}
                  className={cx({
                    [className]: !!className,
                  })}
                  style={style}
                  extra={type === 'upload' ? '' : extra}
                >
                  {renderElement}
                </Form.Item>
              ) : null
            })}
          </StyledContent>
          {!readonly && (
            <StyledFooter>
              <Form.Item {...tailLayout} style={{ paddingLeft: 15 }}>
                {footer?.({
                  loading,
                  onCancel,
                  onSubmit: () => {
                    form
                      .validateFields()
                      .then((values) => {
                        handleFinish(values)
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                  },
                }) || (
                  <>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      {hasUpload ? '提交' : '确定'}
                    </Button>
                    <Button htmlType="reset" style={{ marginLeft: 20 }} onClick={onCancel}>
                      取消
                    </Button>
                  </>
                )}
              </Form.Item>
            </StyledFooter>
          )}
        </Form>
      </Spin>
    </Modal>
  )
}

FormModal.propTypes = {
  title: PropTypes.string,
  initialValues: PropTypes.object,
  data: PropTypes.array,
  open: PropTypes.bool,
  // visible: PropTypes.bool,
  onCancel: PropTypes.func,
  api: PropTypes.func,
  url: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  parseParams: PropTypes.func,
}
