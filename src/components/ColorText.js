import React from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import { setThousands } from '../utils/parseNumber'

const StyledText = styled.span``

// interface IProps {
//   children: React.ReactNode
//   type?: string
//   value?: number | string
//   rest?: {
//     [propName: string]: boolean
//   }[]
//   cbValue: (value: number | string) => string
// }

const ColorText = (props) => {
  let { children = null, type = '', value = '', cbValue, ...rest } = props
  children = cbValue?.(value)
  if (type === 'profit') {
    children = `${setThousands(value)}%`
  }
  return (
    <StyledText
      className={cx({
        ...rest,
        green: type === 'profit' && Number(value) >= 30,
        red: type === 'profit' && Number(value) < 30,
      })}
    >
      {children}
    </StyledText>
  )
}

export default ColorText
