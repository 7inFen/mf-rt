import React from 'react'
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons'
import BackgroundImage from '../styled/BackgroundImage'
import iconSolution from '../assets/icon/progress/solution.svg'
import iconFieldTime from '../assets/icon/progress/field-time.svg'
import iconMembers from '../assets/icon/project/成员.svg'
import iconSearch from '../assets/icon/搜索.png'
import 开票 from '../assets/icon/finance/开票.png'
import 收票 from '../assets/icon/finance/收票.png'
import 付款 from '../assets/icon/finance/付款.png'
import 回款 from '../assets/icon/finance/回款.png'
import 审核 from '../assets/icon/finance/审核.png'
import 撤销 from '../assets/icon/finance/撤销.png'
import 编辑 from '../assets/icon/finance/编辑.png'
import 删除 from '../assets/icon/finance/删除.png'
import 历史记录 from '../assets/icon/finance/历史记录.png'
import 购物车添加 from '../assets/icon/cart+.jpg'
import 购物车移除 from '../assets/icon/cart-.jpg'
import theme from '../theme'

const ICON_MAP = {
  solution: iconSolution,
  fieldTime: iconFieldTime,
  members: iconMembers,
  search: iconSearch,
  开票,
  收票,
  付款,
  回款,
  审核,
  撤销,
  编辑,
  删除,
  历史记录,
  购物车添加,
  购物车移除,
}

export default function CustomIcon({ icon = '', width: _width, height: _height, size, loading, ...restProps }) {
  const width = _width ?? size ?? 22
  const height = _height ?? size ?? 22
  return loading ? (
    <LoadingOutlined style={{ fontSize: Math.min(width, height), color: theme.color.primary }} />
  ) : (
    <BackgroundImage $url={ICON_MAP[icon]} width={width} height={height} {...restProps} />
  )
}

CustomIcon.propTypes = {}
