import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message } from 'antd'

interface IProps {
  text?: string
  children: React.ReactNode
}

const Copy: React.FC<IProps> = (props) => {
  const { text = '', children } = props
  const copyText = text || children
  const handleCopy = (): void => {
    message.success('复制成功')
  }
  return (
    <CopyToClipboard text={copyText} onCopy={handleCopy}>
      <span>{children}</span>
    </CopyToClipboard>
  )
}

export default Copy
