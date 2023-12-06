import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import cx from 'classnames'
import theme from '../theme'

const StyledLink = styled(Link)`
  font-size: ${({ fontSize }) => fontSize}px;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.primary};
`
const StyledA = styled.a`
  font-size: ${({ fontSize }) => fontSize}px;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.primary};
  &:hover {
    background: #eee;
  }
`

export default function CustomLink({ fontSize = parseInt(theme.fontSize, 10), className, a, ...restProps }) {
  if (a) {
    return (
      <StyledA
        fontSize={fontSize}
        className={cx({
          [className]: !!className,
          'router-link': true,
        })}
        target="_blank"
        rel="noreferrer"
        {...restProps}
      />
    )
  }
  return (
    <StyledLink
      fontSize={fontSize}
      className={cx({
        [className]: !!className,
        'router-link': true,
      })}
      rel="opener"
      {...restProps}
    />
  )
}

Link.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}
