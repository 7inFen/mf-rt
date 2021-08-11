import React from 'react'
import PropTypes from 'prop-types'
import { Avatar as DefaultAvatar } from '../../../node_modules/antd'
import styled from 'styled-components'
import waitIcon from '../../assets/icon/沙漏.png'
import cx from 'classnames'

const StyledAvatar = styled(DefaultAvatar)`
  .ant-avatar-string {
    transform: none;
    position: relative;
    left: 0;
  }
  img.wait {
    transform: scale(0.6);
  }
`

// Avatar的文字显示控制在一个字符
export const Avatar = (props) => {
  const { src, size, width, height, type, ...restProps } = props
  return (
    <StyledAvatar size={size} {...restProps}>
      <img
        className={cx({
          wait: !src,
        })}
        src={src || (type === 'talent' ? waitIcon : '')}
        referrerPolicy="no-referrer"
        style={{
          width: width ?? size ?? '100%',
          height: height ?? size ?? '100%',
        }}
      />
    </StyledAvatar>
  )
}

export default Avatar

Avatar.propTypes = {
  children: PropTypes.node,
}
