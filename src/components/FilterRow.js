/**
 * @author QIN Fen
 * @email fen.qin@mediafull.cn
 * @create date 2021-04-16 15:48:56
 * @modify date 2021-10-28 18:52:04
 * @desc 列表顶部筛选行
 */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Tag, Popover, Space, Divider, Skeleton } from 'antd'
import styled from 'styled-components'
import cx from 'classnames'

const StyledTag = styled(Tag)`
  color: #999;
  margin-right: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;
  border: none;
  box-shadow: none;
  font-size: 12px;
  padding: 0 10px;
  cursor: pointer;
  border: 1px solid transparent;
  &.active {
    color: ${({ theme }) => theme.color.primary};
    border-color: ${({ theme }) => theme.color.primary};
  }
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
  &[type='primary'] {
    color: #fff;
    background: ${({ theme }) => theme.color.primary};
  }
  &.child_active {
    color: ${({ theme }) => theme.color.primary};
  }
  &.childTag {
    margin: 0 !important;
  }
`

const StyledRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${({ margin = 0 }) => `${margin}px`};
  min-height: 32px;
`
const StyledLabel = styled.div`
  font-size: 13px;
  min-width: ${({ width }) => `${width}px`};
  text-align: right;
  flex: none;
  /* margin-right: 5px; */
`
const StyledContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  .ant-tag {
    margin-bottom: 10px;
  }
`

const StyledSkeleton = styled(Skeleton)`
  min-width: 500px;
  .ant-skeleton-title {
    display: none;
  }
  .ant-skeleton-paragraph {
    margin: 4px 0;
  }
`

export default function FilterRow({
  label = '标签',
  labelWidth = 70,
  data = [],
  value = '',
  hasAll = false,
  onChange,
  margin,
  nameKey = 'name',
  valueKey = 'key',
}) {
  // const [value, setValue] = useState(_value)
  const multiple = value instanceof Array

  const handleMultipleChange = (_value, item) => {
    if (_value === 'all') {
      onChange(['all'])
      return
    }
    const childKeyList = (item.children || []).map((child) => child[valueKey])
    const combineValue = value.filter((v) => v !== 'all') || []
    if (combineValue.includes(_value)) {
      const valueList = combineValue.filter((v) => v !== _value && !childKeyList.includes(v))
      onChange(valueList.length ? valueList : ['all'])
    } else {
      onChange(combineValue.concat(_value, childKeyList))
    }
  }

  const handleMultipleChildChange = (childValue, item) => {
    const fatherValue = item[valueKey]
    const combineValue = value.filter((v) => v !== 'all') || []
    if (combineValue.includes(childValue)) {
      const valueList = combineValue.filter((v) => v !== childValue && v !== fatherValue)
      onChange(valueList.length ? valueList : ['all'])
    } else {
      if (childValueCheckAll(childValue, item)) {
        onChange(combineValue.concat(childValue, fatherValue))
      } else {
        onChange(combineValue.concat(childValue))
      }
    }
  }

  const childValueCheckAll = (currentChildValue, item) => {
    const childKeyList = (item.children || []).map((child) => child[valueKey])
    const nextValue = value.concat(currentChildValue)
    let checkAll = true
    childKeyList.forEach((childValue) => {
      if (!nextValue.includes(childValue)) {
        checkAll = false
      }
    })
    return checkAll
  }

  const handleClick = (_value, item) => {
    if (multiple) {
      handleMultipleChange(_value, item)
      return
    }
    if (value !== _value) {
      onChange?.(_value)
    }
  }

  const handleChildClick = (_value, item) => {
    if (multiple) {
      handleMultipleChildChange(_value, item)
      return
    }
    if (value !== _value) {
      onChange?.(_value)
    }
  }

  let dataList = data
  if (hasAll) {
    dataList = [
      {
        [valueKey]: 'all',
        [nameKey]: '不限',
      },
    ].concat(data)
  }

  const getType = (key) => {
    if (multiple) {
      return value.includes(key) ? 'primary' : ''
    }
    return value === key ? 'primary' : ''
  }

  const getActive = (itemChildren) => {
    const childKeyList = (itemChildren || []).map((child) => child[valueKey])
    let active = false
    childKeyList.forEach((childKey) => {
      if (value.includes(childKey)) {
        active = true
      }
    })
    return active
  }

  return (
    <StyledRow margin={margin}>
      <StyledLabel width={labelWidth}>{label}：</StyledLabel>
      <StyledContent>
        {dataList.length ? (
          dataList.map((item, idx) => {
            const key = item[valueKey] || '未指定valueKey'
            const name = item[nameKey] || '未指定nameKey'
            const itemChildren = item.children || []
            const hasChild = !!itemChildren.length
            const rootTag = (
              <StyledTag
                key={`${idx}`}
                size="small"
                type={getType(key)}
                onClick={() => handleClick(key, item)}
                className={cx({
                  active: hasChild && getActive(itemChildren),
                })}
              >
                {name}
              </StyledTag>
            )
            if (hasChild) {
              return (
                <Popover
                  // key={`${label}_${Math.random()}`}
                  overlayClassName="content_type_btnLink-wrap"
                  content={
                    <div className="content-wrap">
                      {itemChildren.map((child, childIdx) => {
                        const childKey = child[valueKey] || '未指定valueKey'
                        const childName = child[nameKey] || '未指定nameKey'
                        return (
                          <Space key={`${key}-${childKey}`} direction="horizontal" size={0}>
                            <StyledTag
                              size="small"
                              onClick={() => {
                                handleChildClick(childKey, item)
                              }}
                              type={getType(key) || getType(childKey)}
                              className="childTag"
                            >
                              {childName}
                            </StyledTag>
                            <Divider
                              type="vertical"
                              className={cx({
                                hide: childIdx === itemChildren.length - 1,
                              })}
                            />
                          </Space>
                        )
                      })}
                    </div>
                  }
                >
                  {rootTag}
                </Popover>
              )
            }
            return rootTag
          })
        ) : (
          <StyledSkeleton active size="small" paragraph={{ rows: 1 }} />
        )}
      </StyledContent>
    </StyledRow>
  )
}

FilterRow.propTypes = {}
