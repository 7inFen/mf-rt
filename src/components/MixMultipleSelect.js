/**
 * @author QIN Fen
 * @email fen.qin@mediafull.cn
 * @create date 2022-07-18 10:17:33
 * @modify date 2022-07-27 10:38:28
 * @desc 可混合多选的Select
 */

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select, Space, Button, Tag, Typography } from 'antd'
import { FlagTwoTone } from '@ant-design/icons'
import styled from 'styled-components'
import cx from 'classnames'

const StyledSelect = styled(Select)`
  &.mixMode {
    outline-color: #fde38e;
    .ant-select-selector {
      border-color: #fde38e;
      border-width: 2px;
      box-shadow: 0 0 0 2px rgba(253, 227, 142, 0.2);
    }
    .anticon-close {
      display: none;
    }
    .ant-select-dropdown {
      .ant-select-item-option-disabled {
        background: #f5f5f5;
      }
    }
  }
  .ant-select-selector {
    .ant-select-selection-overflow-item {
      margin-top: 1px;
      margin-bottom: 1px;
      .ant-tag {
        margin-right: 4px;
      }
    }
  }
`

const StyledOptionLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .leader {
    /* color: ${({ theme }) => theme.color.primary}; */
  }
  .remark {
    color: #aaa;
    font-size: 12px;
    padding-left: 10px;
  }
  .anticon {
    padding-left: 10px;
  }
`

const StyledMixGroup = styled(Typography.Text)`
  &.absolute {
    position: absolute;
    right: 0;
  }
  &.tag {
    margin-right: 4px;
  }
  font-size: 12px;
  font-family: sans-serif;
  font-weight: bold;
  line-height: 1;
  mark {
    padding: 0 4px;
  }
`

const TAG_COLOR_MAP = {
  0: 'blue',
  1: 'magenta',
  2: 'red',
  3: 'volcano',
  4: 'orange',
  5: 'gold',
  6: 'lime',
  7: 'green',
  8: 'cyan',
  9: 'purple',
}

const Option = Select.Option

const getMixValueByLabelValue = (label) => {
  return {
    is: /\d+-\d/.test(label),
    list: label.split('-').filter((i) => !!i),
  }
}

const MixGroup = (props) => {
  const { color, absolute, tag, ...restProps } = props
  return (
    <StyledMixGroup
      mark
      className={cx({
        absolute,
        tag,
      })}
      {...restProps}
    />
  )
}

const isHotKey = ({ key, keyCode }) => {
  return ['Control', 'Alt'].includes(key) || [17, 18].includes(keyCode)
}

export default function MixMultipleSelect({
  placeholder = '请选择...',
  style,
  width = 500,
  value: propsValue,
  onChange,
  options = [],
  mapList,
  ...restProps
}) {
  const [open, setOpen] = useState(false)

  const [mixMode, setMixMode] = useState(false)
  const toggleMix = () => {
    setMixMode(!mixMode)
  }

  const [value, setValue] = useState([])
  useEffect(() => {
    // console.log(value, propsValue, String(value) !== String(propsValue))
    if (String(value) !== String(propsValue)) {
      setValue(propsValue)
    }
  }, [propsValue])

  const [mixOnSelectValue, setMixOnSelectValue] = useState([])
  const handleChange = (v, option) => {
    if (mixMode) {
      const selectValue = v.slice(-1)[0]
      if (mixOnSelectValue.includes(selectValue)) {
        setMixOnSelectValue(mixOnSelectValue.filter((v) => v !== selectValue))
      } else {
        setMixOnSelectValue(mixOnSelectValue.concat(selectValue))
      }
    } else {
      setValue(v)
      onChange(v)
    }
  }

  useEffect(() => {
    if (!mixMode && mixOnSelectValue.length) {
      const mixValueJoin = mixOnSelectValue.join('-')
      const combineValue = (value || []).concat(mixValueJoin)
      setValue(combineValue)
      onChange(combineValue)
      setMixOnSelectValue([])
    }
    if (mixMode) {
      setOpen(true)
    }
  }, [mixMode])

  // useEffect(() => {
  //   console.log(value, propsValue, String(value) !== String(propsValue))
  //   // if (value instanceof Array && String(value) !== String(propsValue)) {
  //   //   onChange(value)
  //   // }
  // }, [value])

  const isInMixValue = (itemValue) => {
    let is = false
    for (let idx = 0; idx < (value || []).length; idx++) {
      const target = value[idx]
      const { is: isMixValue, list } = getMixValueByLabelValue(target)
      if (isMixValue && list.includes(itemValue)) {
        is = true
        break
      }
    }
    return is
  }

  const handleItemDisabled = (itemValue) => {
    let disabled = isInMixValue(itemValue)
    if (mixMode) {
      disabled = disabled || value?.includes(itemValue)
    }
    return disabled
  }

  // const handleDropDownRender = (node, ...restProps) => {
  //   console.log(node, restProps)
  //   return node
  // }

  const getInMixValueInfo = (item) => {
    const inMixValueInfo = {
      in: false,
      idx: 0,
    }
    for (let idx = 0; idx < (value || []).length; idx++) {
      const target = value[idx]
      const { is, list } = getMixValueByLabelValue(target)
      if (is) {
        inMixValueInfo.idx = inMixValueInfo.idx + 1
        if (list.includes(item.value)) {
          inMixValueInfo.in = true
          break
        }
      }
    }
    return inMixValueInfo
  }

  const handleTagRender = (props) => {
    // console.log(props)
    const { label, ...restProps } = props
    let labelName = label?.props?.label || label
    const { is: isMixValue, list: mixValueList } = getMixValueByLabelValue(labelName)
    const { idx: inMixValueIdx } = getInMixValueInfo({
      value: mixValueList[0],
    })

    if (isMixValue) {
      labelName = (
        <>
          <MixGroup color={TAG_COLOR_MAP[`${inMixValueIdx}`.slice(-1)[0]]} tag>
            {inMixValueIdx}
          </MixGroup>
          {mixValueList.map((value) => mapList?.[value] ?? value).join(' / ')}
        </>
      )
    }
    return <Tag {...restProps}>{labelName}</Tag>
  }

  const handleOptionLabelRender = (option) => {
    // console.log(option)
    const { label, value, data } = option
    const { rankRemark, isLeader } = data || {}
    const { in: inMixValue, idx: inMixValueIdx } = getInMixValueInfo(option)
    const inMixValueOnSelect = mixOnSelectValue.includes(value)
    return (
      <StyledOptionLabel label={label}>
        <div
          className={cx({
            label: true,
            leader: isLeader,
          })}
        >
          {label}
          {rankRemark && <span className="remark">{rankRemark}</span>}
          {isLeader && <FlagTwoTone title="leader" />}
        </div>
        {inMixValue && (
          <MixGroup color={TAG_COLOR_MAP[`${inMixValueIdx}`.slice(-1)[0]]} absolute>
            {inMixValueIdx}
          </MixGroup>
        )}
        {inMixValueOnSelect && (
          <MixGroup color={TAG_COLOR_MAP[`${inMixValueIdx + 1}`.slice(-1)[0]]} absolute>
            {inMixValueIdx + 1}
          </MixGroup>
        )}
      </StyledOptionLabel>
    )
  }

  const [focus, setFocus] = useState(false)
  const [eventListener, setEventListener] = useState({
    keydown: (e) => {
      // console.log('keydown', e)
      if (isHotKey(e)) {
        setMixMode(true)
      }
    },
    keyup: (e) => {
      // console.log('keyup', e)
      if (isHotKey(e)) {
        setMixMode(false)
      }
    },
  })

  useEffect(() => {
    if (focus) {
      document.addEventListener('keydown', eventListener.keydown)
      document.addEventListener('keyup', eventListener.keyup)
    } else {
      document.removeEventListener('keydown', eventListener.keydown)
      document.removeEventListener('keyup', eventListener.keyup)
    }
  }, [focus])

  return (
    <Space className="mixMultipleSelectWrap" align="start">
      <StyledSelect
        defaultActiveFirstOption={false}
        allowClear={!mixMode}
        mode="multiple"
        style={{
          ...style,
          width,
        }}
        className={cx({
          mixMultipleSelect: true,
          mixMode,
        })}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        // options={}
        // dropdownRender={handleDropDownRender}
        tagRender={handleTagRender}
        open={open}
        onDropdownVisibleChange={setOpen}
        onFocus={(e) => {
          setFocus(true)
        }}
        onBlur={(e) => {
          setFocus(false)
        }}
        getPopupContainer={() => document.getElementById('content')}
        {...restProps}
      >
        {options.map((item) => {
          const { label: itemLabel, value: itemValue, data } = item
          // return {
          //   ...item,
          //   disabled: handleItemDisabled(itemValue),
          // }
          return (
            <Option
              key={itemValue}
              value={itemValue}
              disabled={handleItemDisabled(itemValue)}
              label={itemLabel}
              data={data}
            >
              {handleOptionLabelRender(item)}
            </Option>
          )
        })}
      </StyledSelect>
      {mixMode ? (
        <Button type="primary" onClick={toggleMix}>
          混选完成
        </Button>
      ) : (
        <Button onClick={toggleMix}>混选模式</Button>
      )}
    </Space>
  )
}

MixMultipleSelect.Option = Select.Option

MixMultipleSelect.propTypes = {}
