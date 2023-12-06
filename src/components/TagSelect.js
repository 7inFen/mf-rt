import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Space, Tag, Popover } from 'antd'
import styled from 'styled-components'
import cx from 'classnames'

const { CheckableTag } = Tag

const StyledSpace = styled(Space)`
  .ant-tag {
    border: 2px dashed transparent;
    &.indeterminate {
      border-color: ${({ theme }) => theme.color.primary};
    }
  }
`

const TagItem = ({ data, value, onChange }) => {
  return (
    <Space size="small" wrap style={{ maxWidth: 500 }}>
      {data.map((item) => (
        <Tag.CheckableTag
          key={item.value}
          checked={value?.[item.value]}
          onChange={(checked) =>
            onChange({
              ...item,
              checked,
            })
          }
        >
          {item.label}
        </Tag.CheckableTag>
      ))}
    </Space>
  )
}

TagItem.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

const TagSelect = ({ DEFAULT_ALL_KEY = 'all', data, onChange, ref, ...rest }) => {
  const INITIAL_VALUE = {
    [DEFAULT_ALL_KEY]: {},
  }
  const [values, setValues] = useState(INITIAL_VALUE)

  const getValues = (childValue, fatherKey, uniqueChecked) => {
    const value = {}
    for (const key in childValue) {
      if (childValue.hasOwnProperty(key)) {
        if (childValue[key]) {
          value[key] = true
        }
      }
    }

    const combineValues = {
      ...values,
      [fatherKey]: value,
    }

    if (!Object.keys(value).length && !uniqueChecked) {
      delete combineValues[fatherKey]
    }

    const fatherKeyList = Object.keys(combineValues)
    if (!fatherKeyList.length) {
      combineValues[DEFAULT_ALL_KEY] = {}
    } else {
      if (fatherKeyList.length > 1) {
        delete combineValues[DEFAULT_ALL_KEY]
      }
    }

    return combineValues
  }

  const handleChildChange = (info, fatherKey) => {
    const { value, checked } = info
    const childValue = {
      ...values?.[fatherKey],
      [value]: checked,
    }
    setValues(getValues(childValue, fatherKey))
  }

  const handleChange = (checked, info) => {
    const { value: fatherKey, children = [] } = info
    if (fatherKey === DEFAULT_ALL_KEY) {
      setValues(INITIAL_VALUE)
      return
    }

    const childValue = {}
    children.forEach((child) => {
      childValue[child.value] = checked
    })
    const uniqueChecked = !children.length && checked
    setValues(getValues(childValue, fatherKey, uniqueChecked))
  }

  useEffect(() => {
    let submitValue = values
    if (!Object.keys(values).length) {
      submitValue = INITIAL_VALUE
    }
    setValues(submitValue)

    onChange(submitValue)
  }, [values])

  const getFatherChecked = (fatherKey) => {
    const fatherItem = data.filter((item) => item.value === fatherKey)[0]
    const fatherValue = values?.[fatherKey]
    if (fatherValue) {
      if ((fatherItem?.children || []).length === Object.keys(fatherValue).length) {
        return true
      }
      return 'indeterminate'
    }
    return false
  }

  return (
    <StyledSpace wrap>
      {data.map((item) => {
        const { value, children = [] } = item
        const checkStatus = getFatherChecked(value)
        const element = (
          <CheckableTag
            checked={checkStatus === true}
            key={item.value}
            className={cx({
              indeterminate: checkStatus === 'indeterminate',
            })}
            onChange={(checked) => handleChange(checked, item)}
            ref={ref}
          >
            {item.label}
          </CheckableTag>
        )
        if (children.length) {
          return (
            <Popover
              key={value}
              content={
                <TagItem data={children} value={values?.[value]} onChange={(info) => handleChildChange(info, value)} />
              }
            >
              {element}
            </Popover>
          )
        }
        return element
      })}
    </StyledSpace>
  )
}

TagSelect.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
}

export default TagSelect
