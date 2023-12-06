import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'
import styled from 'styled-components'
import UploadList from './FileList'
import BtnLink from '../BtnLink'

const StyledBtn = styled.span`
  color: ${({ theme }) => theme.color.primary};
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  margin-left: 5px;
  font-size: 13px;
  cursor: pointer;
`

export default function LogFiles({ data, fileList: _fileList, files, title = '预览', children = '查看' }) {
  const [visible, setVisible] = useState(false)
  const openModal = () => {
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
  }

  const fileList = data || _fileList || files || []

  return (
    <>
      {/* zIndex比Popover大 1 */}
      <Modal title={title} open={visible} onCancel={closeModal} zIndex={1031}>
        <UploadList fileList={fileList} disabled />
      </Modal>
      {fileList.length ? <BtnLink onClick={openModal}>{children}</BtnLink> : null}
    </>
  )
}

LogFiles.propTypes = {}
