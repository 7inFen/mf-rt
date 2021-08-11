import React from 'react'
import PropTypes from 'prop-types'
import BackgroundImage from '../styled/BackgroundImage'
import iconSolution from '../assets/icon/progress/solution.svg'
import iconFieldTime from '../assets/icon/progress/field-time.svg'
import iconMembers from '../assets/icon/project/成员.svg'
import iconSearch from '../assets/icon/搜索.png'
import 财务节点 from '../assets/icon/project/财务节点.png'
import 财务节点_激活 from '../assets/icon/project/财务节点_激活.png'
import 财务节点_通过 from '../assets/icon/project/财务节点_通过.png'
import 财务节点_未通过 from '../assets/icon/project/财务节点_未通过.png'
import 开票 from '../assets/icon/finance/开票.png'
import 收票 from '../assets/icon/finance/收票.png'
import 付款 from '../assets/icon/finance/付款.png'
import 回款 from '../assets/icon/finance/回款.png'
import 审核 from '../assets/icon/finance/审核.png'
import 撤销 from '../assets/icon/finance/撤销.png'
import 编辑 from '../assets/icon/finance/编辑.png'
import 删除 from '../assets/icon/finance/删除.png'
import 历史记录 from '../assets/icon/finance/历史记录.png'

const ICON_MAP = {
  solution: iconSolution,
  fieldTime: iconFieldTime,
  members: iconMembers,
  search: iconSearch,
  财务节点,
  财务节点_激活,
  财务节点_通过,
  财务节点_未通过,
  开票,
  收票,
  付款,
  回款,
  审核,
  撤销,
  编辑,
  删除,
  历史记录,
}

export default function CustomIcon({ icon = '', width, height, size, ...restProps }) {
  const _width = width ?? size ?? 22
  const _height = height ?? size ?? 22
  return <BackgroundImage url={ICON_MAP[icon]} width={_width} height={_height} {...restProps} />
}

CustomIcon.propTypes = {}
