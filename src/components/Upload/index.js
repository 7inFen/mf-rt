/* eslint-disable complexity */
/**
 * @author QIN Fen
 * @email fen.qin@mediafull.cn
 * @create date 2021-04-22 18:23:17
 * @modify date 2022-11-07 11:38:47
 * @desc 上传文件组件，主要处理了照片墙和
 */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Upload, Form, Button, Divider } from 'antd'
import { message } from '../../hooks/useApp'
import api from 'api'
import { PlusOutlined } from '@ant-design/icons'
import Immutable from 'immutable'
import styled from 'styled-components'
import { StyledExtra } from '../../styled/CommonUse'
import Modal from '../Modal'
//  import { IdCardUpload } from '../../styled/upload/idCardBtn'
import BtnLink from '../BtnLink'
import getApiFullPath from '../../utils/getApiFullPath'
import cx from 'classnames'
import getUploadFiles, { getUploadFilesKey } from '../../utils/getUploadFiles'
import xlsIcon from '../../assets/icon/files/excel_48x1.svg'
import pptIcon from '../../assets/icon/files/powerpoint_48x1.svg'
import pdfIcon from '../../assets/icon/files/pdf.svg'
import docIcon from '../../assets/icon/files/doc_docx.svg'
import compressIcon from '../../assets/icon/files/compress.png'
import mp4Icon from '../../assets/icon/files/mp4.png'
//  import FileRemark from './FileRemark'
//  import FileVersion from './FileVersion'
import previewUrl, { xDocSupport, isImage } from '../preview/url'
import ImagePreview from '../preview/Image'

const Wrap = styled.div`
  .ant-upload {
    padding: 0;
    /* border: none; */
    background: rgb(239, 239, 239);
  }
  /* 去掉注册页上传组件margin，如果修改请注意注册页ui */
  .ant-form-item {
    margin-bottom: 0;
  }
  .ant-upload-select-picture-card {
    margin: 0;
  }
  .ant-upload-list-picture-card-container {
    min-height: 104px;
    /* margin: 0; */
  }
  .ant-upload-list-item {
    margin: 0;
    padding: 0;
    border: none;
  }
  .ant-upload-list-false {
    display: none;
  }
  .ant-upload-list-picture {
    margin-top: 20px;
    .ant-upload-list-item {
      height: 40px;
      padding-bottom: 20px;
      &:hover {
        background: #eee;
      }
      .ant-upload-list-item-info {
        & > span {
          display: flex;
          align-items: center;
          a[href] + .ant-upload-list-item-name {
            color: ${({ theme }) => theme.color.primary};
            padding-left: 18px;
            cursor: pointer;
          }
        }
        .ant-upload-list-item-thumbnail {
          position: relative;
          top: 8px;
          left: 5px;
          width: 30px;
          height: 30px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .ant-upload-list-item-name {
          padding-left: 10px;
          padding-right: 50px;
          font-size: 13px;
        }
        .ant-upload-list-item-card-actions {
          top: 11px;
        }
      }
      .ant-upload-list-item-progress {
        padding-left: 52px;
        .ant-progress-line {
          top: 20px;
        }
      }
    }
  }
  &.disabled {
    .ant-upload-list-picture {
      margin-top: 0;
    }
  }

  &.listType-picture {
    .ant-upload {
      background: transparent;
    }
  }
  /* 向上对齐 */
  .alignTop {
    .ant-upload-list {
      margin-top: -16px;
    }
  }

  .hideSelect {
    .ant-upload-select {
      display: none;
    }
    .ant-upload-list {
      margin-top: 0;
    }
  }

  &.usePictureLinkButton {
    .ant-upload-list.ant-upload-list-picture {
      margin-top: -16px;
    }
  }

  /* wrap end */
`
const StyledPreviewContent = styled.div`
  height: 80vh;
  img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
  }
`
const StyledPreviewModal = styled(Modal)`
  width: ${({ width }) => width}px;
  height: unset !important;
  /* height: ${({ height }) => height}px; */
  .ant-modal-content {
    /* height: ${({ height }) => height}px; */
  }
`
const StyledFileInfo = styled.div`
  font-size: 12px;
  color: #777;
  position: relative;
  left: 48px;
  bottom: 20px;
  /* max-width: 350px; */
  /* 减去左侧文件图标宽度 */
  width: calc(100% - 55px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
`

const StyledUploadedTip = styled.div`
  font-size: 14px;
  margin-bottom: 6px;
`

const StyledChooseFileTip = styled.span`
  /* background: transparent; */
  margin-left: 10px;
  color: #777;
  font-size: 13px;
  cursor: pointer;
`

const StyledExtraRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

// eslint-disable-next-line complexity
// 处理文件缩略图
const handleThumbUrl = (file) => {
  let { url, name } = getUploadFiles([file])[0] || {}
  let thumbnail = url
  name = name || file?.name
  const thumbnailFileFormat = `${name?.split?.('.')?.slice?.(-1)?.[0] || ''}`.toLowerCase()
  switch (thumbnailFileFormat) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'svg':
      break
    case 'xls':
    case 'xlsx':
    case 'csv':
      thumbnail = xlsIcon
      break
    case 'ppt':
    case 'pptx':
      thumbnail = pptIcon
      break
    case 'pdf':
      thumbnail = pdfIcon
      break
    case 'doc':
    case 'docx':
      thumbnail = docIcon
      break
    case 'mp4':
      thumbnail = mp4Icon
      break
    // case 'zip':
    // case 'rar':
    // case '7z':
    //   thumbnail = compressIcon
    //   break
    default:
      thumbnail = compressIcon
      break
  }
  // if (file.originFileObj) {
  //   return await getBase64(file.originFileObj)
  // }
  return file.thumbUrl || thumbnail || file.url
}

const normalizeValue = (fileList = [], name) => {
  // 设置传递到表单的值
  // 初始化不会执行
  return fileList.map((fileItem, idx) => {
    // 如果需要将上传文件保存到redux store
    // 可以在此处删除不需要的属性
    // console.log(fileItem)
    return Immutable.Map(fileItem)
      .remove('originFileObj')
      .set('_upload', name)
      .set('_uploadType', fileItem.uid?.startsWith('rc-upload') ? 'new' : 'server')
      .set('_uploadIdx', idx)
      .toJS()
  })
}

// 文件上传组件
const CustomUpload = (props) => {
  const {
    accept,
    uploadUrl,
    children,
    length,
    fileList: propsFileList = [],
    onChange,
    listType,
    // preview,
    acceptDownload = '',
    onPreview,
    limitSize,
    disabled = false,
    uploadButton,
    onMaxUploadIdxFromServerChange,
    name: formName,
    uploadTip = '请选择文件并提交',
    version,
    className,
    ...restProps
  } = props

  const account = useSelector((store) => store.auth?.account)
  const UPLOAD_UUID = `_upload-${Date.now()}`

  const [fileList, setFileList] = useState([])
  // console.log(fileList, propsFileList)
  useEffect(() => {
    const hasNewFile = propsFileList?.some((file) => file._uploadType === 'new')
    let diffFileFormServer = false
    if (!hasNewFile) {
      // props 多次下发来自服务端的文件
      const fileIdList = fileList.map((file) => file.uid)
      const propsFileIdList = propsFileList.map((file) => file.uid)
      diffFileFormServer = !Immutable.List(fileIdList).equals(Immutable.List(propsFileIdList))
    }
    // console.log(diffFileFormServer)
    // 对于新文件需要关注上传状态
    // 对于服务端文件，需要关注文件uid是否一致
    if (fileList?.length !== propsFileList?.length || hasNewFile || diffFileFormServer) {
      setFileList(normalizeValue(propsFileList, formName))
    }
  }, [propsFileList])

  useEffect(() => {
    return () => {
      setFileList([])
    }
  }, [])

  // 得到最后一个从服务端取回文件的idx
  // 用来分隔已上传文件和新文件
  const [maxUploadIdxFromServer, setMaxUploadIdxFromServer] = useState(-1)
  useEffect(() => {
    setMaxUploadIdxFromServer(
      fileList.reduce((prevIdx, file) => {
        const { _uploadType, _uploadIdx } = file
        if (_uploadType === 'server') {
          return _uploadIdx > prevIdx ? _uploadIdx : prevIdx
        }
        return prevIdx
      }, -1),
    )
  }, [fileList])

  useEffect(() => {
    onMaxUploadIdxFromServerChange(maxUploadIdxFromServer)
  }, [maxUploadIdxFromServer])

  const beforeUpload = (file) => {
    const { size, type, name } = file
    let errorMsg = []
    if (size > limitSize) {
      errorMsg.push(
        `超过最大可上传文件大小【${name}】。文件大小：${size / 1024 / 1024}MB，限制大小：${limitSize / 1024 / 1024}MB`,
      )
    }
    // 不支持以下格式
    // - 邮件格式
    if (['message/rfc822'].includes(`${type}`.toLowerCase())) {
      errorMsg.push(`不支持邮件格式文件上传【${name}】`)
    }
    if (errorMsg.length) {
      message.error(errorMsg.join('；'), 5)
      return Upload.LIST_IGNORE
    }
    return true
  }

  // 文件添加url解决下载问题
  const updateFileList = () => {
    let files = fileList
    if (typeof acceptDownload === 'string') {
      const acceptDownloadList = acceptDownload.replace(/\s/g, '').split(',')
      files = fileList.map((file) => {
        const { name, url } = getUploadFiles([file])[0] || {}
        if (name) {
          const fileFormat = name?.split?.('.')?.slice?.(-1)?.[0]
          if (acceptDownloadList.includes(`.${fileFormat}`)) {
            return {
              ...file,
              status: file.status ?? 'done',
              url,
            }
          }
        }
        return file
      })
    } else if (acceptDownload) {
      files = fileList.map((file) => {
        const { url } = getUploadFiles([file])[0] || {}
        return {
          ...file,
          status: file.status ?? 'done',
          url,
        }
      })
    }
    // console.log(files)
    return files.map((file) => ({
      ...file,
      thumbUrl: handleThumbUrl(file),
    }))
  }

  // 渲染上传按钮
  // 预置照片墙和文件列表两种形式
  const _uploadButton =
    listType === 'picture-card' ? (
      <PlusOutlined style={{ fontSize: 50, color: '#bbb' }} />
    ) : (
      <Button type="primary">选择文件</Button>
    )
  // uploadButton属性可为 null 不渲染上传按钮
  const uploadControl = children || (uploadButton === null ? null : _uploadButton) || null
  // 禁用模式，超出限制文件数下不渲染上传按钮
  let renderUploadButton = !disabled && (length ? (fileList.length < length ? uploadControl : null) : uploadControl)
  // 文件列表模式下增加 tips 提示
  if (renderUploadButton && listType === 'picture') {
    renderUploadButton = (
      <>
        {renderUploadButton}
        <StyledChooseFileTip>{uploadTip}</StyledChooseFileTip>
      </>
    )
  }

  // 自定义文件列表模式下的列表渲染
  // 将已上传和新上传文件分开
  const handleItemRender = (node, file, fileList) => {
    if (listType !== 'picture') {
      return node
    }
    const {
      uploadBy = file._uploadBy,
      uploadAt = file._uploadAt,
      uploadIdx = file._uploadIdx,
      uploadType = file._uploadType,
    } = getUploadFiles([file], {
      keys: ['uploadBy', 'uploadAt'],
    })?.[0] || {}

    // 是否显示文件更新时间和更新用户
    const showUploadInfo = uploadBy || uploadAt
    const renderUploadInfo = showUploadInfo ? (
      <>
        {uploadBy}&nbsp;&nbsp;{uploadAt}
      </>
    ) : null
    // 对于已上传过的文件增加 tip 说明
    const itemUploadedTip =
      !disabled && uploadType === 'server' && uploadIdx === 0 ? (
        <StyledUploadedTip className="uploaded-files-tip">已提交文件</StyledUploadedTip>
      ) : null
    // 渲染自定义新文件上传按钮
    const itemUploadButton =
      maxUploadIdxFromServer >= 0 && uploadIdx === maxUploadIdxFromServer && renderUploadButton ? (
        <>
          <Divider type="horizontal" style={{ marginTop: 0, marginBottom: 10 }} className="upload-divider" />
          {renderUploadButton}
        </>
      ) : null
    return (
      <>
        {itemUploadedTip}
        {node}
        <StyledFileInfo>
          {renderUploadInfo}
          {/* <StyledExtraRow>
             <FileVersion file={file} version={version} />
             <FileRemark file={file} />
           </StyledExtraRow> */}
        </StyledFileInfo>
        <span
          onClick={() => {
            document.querySelector(`.${UPLOAD_UUID}`)?.click()
          }}
        >
          {itemUploadButton}
        </span>
        {itemUploadButton && <div className="_item-bottom-placeholder" style={{ height: 10 }} />}
      </>
    )
  }

  const handleChange = (params) => {
    const { file, fileList, event } = params
    // 文件上传失败处理
    if (file.status === 'done' && file.response.status !== 'success') {
      params.file.status = 'error'
    }
    onChange(params)
  }

  return (
    <Upload
      // directory
      multiple
      listType={listType}
      headers={{
        Authorization: account.auth || null,
      }}
      action={uploadUrl || api.uploadFile}
      accept={accept ?? '.jpg, .png, .jpeg'}
      beforeUpload={beforeUpload}
      onPreview={onPreview}
      disabled={disabled}
      {...restProps}
      name="files"
      fileList={updateFileList()}
      onChange={handleChange}
      // showUploadList={{
      //   showPreviewIcon: listType === 'picture-card' || /png|jpg|jpeg|gif|bmp|svg/.test(accept),
      //   showDownloadIcon: !!acceptDownload,
      // }}
      showUploadList={
        fileList.length
          ? {
              showPreviewIcon: listType === 'picture-card' || /png|jpg|jpeg|gif|bmp|svg/.test(accept),
              showDownloadIcon: !!acceptDownload,
            }
          : false
      }
      itemRender={handleItemRender}
      className={cx({
        hideSelect: !renderUploadButton,
        [className]: !!className,
      })}
    >
      {listType === 'picture' ? (
        <span
          className={cx({
            [UPLOAD_UUID]: !!UPLOAD_UUID,
            hide: maxUploadIdxFromServer >= 0 && listType === 'picture',
          })}
        >
          {renderUploadButton}
        </span>
      ) : (
        renderUploadButton
      )}
    </Upload>
  )
}

CustomUpload.propTypes = {
  accept: PropTypes.string,
  uploadUrl: PropTypes.string,
  children: PropTypes.node,
  length: PropTypes.number,
  fileList: PropTypes.array,
  onChange: PropTypes.func,
  uploadButton: PropTypes.node,
  handlePreview: PropTypes.func,
  preview: PropTypes.bool,
  listType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

// 入口
const UploadForm = (props) => {
  const {
    name = 'files',
    label = '文件',
    desc = '',
    required = true,
    extra = '请上传资质编号清晰可见的相关资质照片。仅支持 jpg、png、jpeg格式图片',
    rules,
    length,
    className = '',
    style = {},
    example,
    preview = true,
    listType = 'picture-card',
    onPreview,
    // limitSize = 1024 * 1024 * 5,
    limitSize = Number.MAX_SAFE_INTEGER,
    disabled = false,
  } = props

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  // 因为表单缘故，这里的fileList仅与upload组件做值的同步
  // const [fileList, setFileList] = useState([])
  // const handleChange = (data) => {
  //   const { fileList } = data
  //   setFileList(normalizeValue(fileList))
  // }

  const [maxUploadIdxFromServer, setMaxUploadIdxFromServer] = useState(-1)
  const handleMaxUploadIdxFromServerChange = (idx) => {
    setMaxUploadIdxFromServer(idx)
  }

  const [previewFile, setPreviewFile] = useState(null)

  const handlePreview = (file) => {
    if (!preview) return
    const url = file?.url || file?.thumbUrl || file || ''
    if (typeof onPreview === 'function') {
      onPreview?.(url)
      return
    }

    const combineFileInfo = {
      name: url,
      ...file,
      url,
    }
    if (xDocSupport(combineFileInfo)) {
      window.open(previewUrl(combineFileInfo))
      return
    }

    if (isImage(combineFileInfo)) {
      setPreviewFile(combineFileInfo)
      return
    }

    window.open(url)
  }

  return (
    <Wrap
      style={style}
      className={cx({
        hideList: !listType,
        disabled,
        [`listType-${listType}`]: !!listType,
        usePictureLinkButton: !disabled && listType === 'picture' && maxUploadIdxFromServer >= 0,
      })}
    >
      {/* 身份证ui */}
      {/* {className === 'idcard-upload' && <IdCardUpload />} */}
      <Form.Item
        name={name}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        // onChange已经处理了normalize，如果需要性能优化可注释下行
        normalize={(list) => normalizeValue(list, name)}
        // noStyle
        rules={
          rules || [
            // ...rules,
            {
              validator: (rule, fileList = []) => {
                const error = fileList.some((f) => f.size > limitSize)
                if (error) {
                  const errorMsg = `${length === 1 ? '' : '单个'}文件不能超过${limitSize / 1024 / 1024}MB！`
                  return Promise.reject(errorMsg)
                }
                return Promise.resolve()
              },
            },
            {
              validator: (rule, fileList = []) => {
                const error = fileList.some((f) => f.status === 'error')
                if (error) {
                  const errorMsg =
                    length === 1 ? `${desc || label}上传失败,请删除后重新上传!` : '请删除上传失败的文件！'
                  return Promise.reject(errorMsg)
                }
                return Promise.resolve()
              },
            },
            {
              validator: (rule, fileList = []) => {
                const error = fileList.some((f) => f.status === 'uploading')
                if (error) {
                  const errorMsg = `${desc || label}上传中...`
                  return Promise.reject(errorMsg)
                }
                return Promise.resolve()
              },
            },
            {
              validator: (rule, fileList = []) => {
                const error = fileList.length === 0
                if (required && error) {
                  const errorMsg = `请上传${desc || label}！`
                  return Promise.reject(errorMsg)
                }
                return Promise.resolve()
              },
            },
          ]
        }
      >
        <CustomUpload
          {...props}
          limitSize={limitSize}
          listType={listType}
          preview={preview}
          // fileList={fileList}
          // onChange={handleChange}
          onPreview={handlePreview}
          onMaxUploadIdxFromServerChange={handleMaxUploadIdxFromServerChange}
        />
      </Form.Item>
      {example && (
        <BtnLink
          className="font12"
          onClick={() => {
            handlePreview(getApiFullPath(example?.url))
          }}
        >
          查看示例
        </BtnLink>
      )}
      {extra && <StyledExtra>{extra}</StyledExtra>}
      <ImagePreview file={previewFile} />
    </Wrap>
  )
}

UploadForm.propTypes = {
  accept: PropTypes.string,
  uploadUrl: PropTypes.string,
  children: PropTypes.node,
  account: PropTypes.object,
  length: PropTypes.number,
  name: PropTypes.string,
  required: PropTypes.bool,
  extra: PropTypes.node,
  rules: PropTypes.array,
  style: PropTypes.object,
  label: PropTypes.string,
  desc: PropTypes.string,
  className: PropTypes.string,
  example: PropTypes.object,
  preview: PropTypes.bool,
  listType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

export default UploadForm
