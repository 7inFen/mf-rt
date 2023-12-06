import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import getUploadFiles, { getUploadFilesKey } from '../../utils/getUploadFiles'
import Immutable from 'immutable'
import Upload from './index'
import { Button, Form } from 'antd'

export default function FileList({ fileList = [], onChange, disabled = false, onUpload, ...restProps }) {
  const [files, setFiles] = useState([])

  const [form] = Form.useForm()

  useEffect(() => {
    // if (fileList.length && !files.length) {
    setFiles(fileList)
    form.setFieldsValue({
      files: fileList,
    })
    // }
  }, [fileList])

  const handleChange = (values) => {
    const uploadedFilesKeys = getUploadFilesKey(files)
    const uploadFilesKeys = getUploadFilesKey(values.files)
    // console.log(data, values)
    // console.log(uploadedFilesKeys, uploadFilesKeys)
    if (!Immutable.List(uploadedFilesKeys).equals(Immutable.List(uploadFilesKeys))) {
      // onChange(uploadFilesKeys, getUploadFiles(values.files))
      setFiles(getUploadFiles(values.files))
      onUpload?.(values)
    }
  }

  useEffect(() => {
    onChange?.(getUploadFilesKey(files), files)
  }, [files])

  return (
    <Form
      form={form}
      initialValues={{
        files,
      }}
      onValuesChange={handleChange}
    >
      <Upload
        {...restProps}
        fileList={files}
        extra=""
        listType="picture"
        // 不限制上传文件格式
        accept=""
        acceptDownload
        limitSize={Number.MAX_SAFE_INTEGER}
        disabled={disabled}
      />
    </Form>
  )
}

FileList.propTypes = {}
