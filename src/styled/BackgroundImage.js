import React from 'react'
import styled from 'styled-components'
import cx from 'classnames'

const Bg = styled.div`
  background-image: ${({ $url, src }) => `url(${$url || src})`};
  background-repeat: no-repeat;
  background-size: ${({ size }) => size || '100%'};
  background-position: center;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  cursor: ${({ $pointer }) => ($pointer ? 'pointer' : 'default')};
  &.blend {
    background-image: ${({ $url, src }) => `url(${$url || src})`},
      linear-gradient(
        ${({ $blendColor, theme }) => `${$blendColor || theme.color.primary}, ${$blendColor || theme.color.primary}`}
      );
    background-blend-mode: lighten;
    background-size: cover;
  }
`

export default ({ className, ...rest }) => (
  <Bg
    {...rest}
    className={cx({
      [className]: !!className,
      'styled-bg-image': true,
      blend: !!rest.$blendColor,
    })}
  />
)
