import React from 'react'
import PropTypes from 'prop-types'
// import questionIcon from ''
import { Tooltip } from 'antd'
import { QuestionCircleOutlined, ExclamationCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { createGlobalStyle } from 'styled-components'
import getStrWidth from '../utils/getStrWidth'
import cx from 'classnames'

const GlobalStyles = createGlobalStyle`
  .ant-tooltip {
    max-width: unset;
    .ant-tooltip-inner {
      font-size: 13px;
      /* color: ${({ theme }) => theme.color.font}; */
      white-space: ${({ nowrap }) => (nowrap ? 'nowrap' : 'pre-line')};
      /* width: ${({ width }) => width}px; */
      p {
        margin: 0;
        /* white-space: nowrap; */
      }
    }
    // 防止边缘处的弹窗箭头指示错误
    .ant-tooltip-arrow {
      display: none;
    }
  }
`
export default function TooltipQuestion(props) {
  const {
    title = '',
    color = '#fff',
    children,
    iconStyle,
    iconProps = {},
    nowrap,
    icon = 'question',
    withIcon = false,
    ...restProps
  } = props
  const PADDING = 8
  let width = 0
  const renderTitle = (
    <>
      {title.split('\n').map((row, idx) => {
        width = Math.max(
          getStrWidth(row, {
            chinese: 13,
          }),
          width,
        )
        return <p key={`${idx}`}>{row}</p>
      })}
    </>
  )

  const _iconProps = {
    style: { marginLeft: 5, ...iconStyle },
    ...iconProps,
  }
  let renderIcon = <QuestionCircleOutlined {..._iconProps} />
  switch (icon) {
    case 'info':
      renderIcon = <ExclamationCircleOutlined {..._iconProps} />
      break
    case 'info-filled':
      renderIcon = <ExclamationCircleFilled {..._iconProps} />
      break
    default:
      break
  }

  let renderElement = children
  if (withIcon || !renderElement) {
    renderElement = (
      <>
        {renderElement}
        {renderIcon}
      </>
    )
  }
  return (
    <Tooltip
      title={renderTitle}
      // visible
      // color={color}
      // placement="top"
      // arrowPointAtCenter={false}
      // autoAdjustOverflow={false}
      {...restProps}
      className={cx({
        'tq-tooltip': true,
      })}
      overlayStyle={{
        width: Math.min(407, width + PADDING * 2),
      }}
    >
      <GlobalStyles nowrap={nowrap} />
      <span
        className={cx({
          pointer: true,
          center: withIcon,
        })}
      >
        {renderElement}
      </span>
    </Tooltip>
  )
}

TooltipQuestion.propTypes = {
  title: PropTypes.node,
  color: PropTypes.func,
  children: PropTypes.node,
  iconStyle: PropTypes.object,
  nowrap: PropTypes.bool,
}
