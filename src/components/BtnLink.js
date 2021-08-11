import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import styled from 'styled-components'
import downloadFunc from '../lib/download'
import cx from 'classnames'

const Link = styled(Button)`
  padding: 0 !important;
  height: auto !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  span {
    text-decoration: none;
  }
  color: ${({ theme }) => theme.color.primary};
  &.danger {
    color: #c60d01;
    &:hover {
      color: #c60d01;
    }
  }
  &[disabled] {
    color: rgba(0, 0, 0, 0.25);
  }
  & + button {
    margin-left: 8px;
  }
  /* font-size: 14px; */
`

const CustomLink = ({
  children,
  type,
  danger,
  download,
  onClick = (f) => f,
  fileName = '',
  className,
  ...restProps
}) => {
  const handleClick = () => {
    if (download) {
      const { url, name, params = {} } = download
      downloadFunc(
        {
          url,
          params,
        },
        name,
      )
    }
    onClick && onClick()
  }
  return (
    <Link
      type="link"
      className={cx({
        [className]: !!className,
        danger: danger || type === 'danger',
      })}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </Link>
  )
}

CustomLink.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  download: PropTypes.object,
  onClick: PropTypes.func,
  danger: PropTypes.bool,
  fileName: PropTypes.string,
}

export default CustomLink
