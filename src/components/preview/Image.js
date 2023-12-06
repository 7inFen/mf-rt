import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'antd'
import { message } from '../../hooks/useApp'
import { createGlobalStyle } from 'styled-components'

const StyledPreviewImage = createGlobalStyle`
  .ant-image.preview-image {
    display: none;
  }
  .ant-image-preview-img {
    max-height: 85%;
  }
`

export default function PreviewImage({ file = {} }) {
  if (!file) {
    return null
  }

  const [visible, setVisible] = useState(false)
  const [src, setSrc] = useState(null)

  useEffect(() => {
    if (file.url) {
      setSrc(file.url)
    } else {
      message.error('图片预览失败')
    }
  }, [file])

  useEffect(() => {
    setVisible(!!src)
  }, [src])

  return (
    <>
      <StyledPreviewImage />
      <Image
        rootClassName="preview-image"
        className="hidden"
        preview={{
          visible,
          src,
          onVisibleChange: (visible) => {
            if (!visible) {
              setSrc(null)
            }
          },
        }}
      />
    </>
  )
}

PreviewImage.propTypes = {}
