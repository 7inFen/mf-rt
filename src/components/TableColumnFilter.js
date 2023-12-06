import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Button, Space, Checkbox } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import storage from 'store'
import { createGlobalStyle } from 'styled-components'
import cx from 'classnames'

const StyledDropdown = createGlobalStyle`
  .tableColumnFilterDropdown {
    &.setMaxHeight {
      & > .ant-dropdown-menu {
        max-height: 300px;
        overflow-y: auto;
      }
    }
  }
`

const KEY_SEPARATE = '::'
const STORAGE_KEY = 'tableColumnFilter'

const getFilterKey = (item, father) => {
  if (father) {
    return `${father.text || father.title}${KEY_SEPARATE}${item.text || item.title}`
  }
  return item.text || item.title
}

const getStorageData = (key) => {
  return storage.get(STORAGE_KEY)?.[key]
}

const setStorageData = (key, value) => {
  const data = storage.get(STORAGE_KEY) || {}
  storage.set(STORAGE_KEY, {
    ...data,
    [key]: value,
  })
}

export default function TableColumnFilter({ columns = [], storageKey, onChange }) {
  const [filtered, setFiltered] = useState(false)
  const [values, setValues] = useState()
  useEffect(() => {
    if (storageKey) {
      setValues(getStorageData(storageKey))
    }
  }, [])

  const handleFilterChange = (e, options) => {
    e.stopPropagation?.()
    const { checked } = e.target
    const { hasChild, filterKey } = options

    const allValues = {
      ...values,
      [filterKey]: checked,
    }

    // 处理有children项的click
    if (hasChild) {
      let mayChecked = checked
      columns.forEach((item) => {
        const { children = [] } = item
        const itemFilterKey = getFilterKey(item)
        if (itemFilterKey === filterKey) {
          // 如果children中仅有filterDisabled项选中，将checked置为true
          const childrenCheckedList = children.filter((childItem) => {
            const childItemFilterKey = getFilterKey(childItem, item)
            return allValues[childItemFilterKey] ?? true
          })
          if (childrenCheckedList.every((item) => item.filterDisabled)) {
            mayChecked = true
            allValues[filterKey] = true
          }

          children
            .filter((i) => !i.filterDisabled)
            .forEach((childItem) => {
              const childItemFilterKey = getFilterKey(childItem, item)
              allValues[childItemFilterKey] = mayChecked
            })
        }
      })
    }

    // indeterminate: children中至少一个选中，至多length - 1
    const [key1] = filterKey.split(KEY_SEPARATE)
    columns.forEach((item) => {
      const { children = [] } = item
      const itemFilterKey = getFilterKey(item)
      if (key1 === itemFilterKey && children.length) {
        const childrenCheckedList = children.filter((childItem) => {
          const childItemFilterKey = getFilterKey(childItem, item)
          return allValues[childItemFilterKey] ?? true
        })

        if (childrenCheckedList.length === 0) {
          allValues[key1] = false
        } else if (childrenCheckedList.length > 0 && childrenCheckedList.length < children.length) {
          allValues[key1] = 'indeterminate'
        } else if (childrenCheckedList.length === children.length) {
          allValues[key1] = true
        }
      }
    })

    setValues(allValues)
  }

  useEffect(() => {
    setStorageData(storageKey, values)
    const columnList = []
    let filtered = false
    columns.forEach((item) => {
      const { children = [], filterDisabled } = item
      const filterKey = getFilterKey(item)
      if (values?.[filterKey] ?? true) {
        const childrenList = children.filter((childItem) => {
          const childFilterKey = getFilterKey(childItem, item)
          return (values?.[childFilterKey] ?? true) || childItem.filterDisabled
        })
        columnList.push({
          ...item,
          children: childrenList,
        })
        if (children.length > childrenList.length) {
          filtered = true
        }
      } else if (filterDisabled) {
        columnList.push(item)
      } else {
        filtered = true
      }
    })
    onChange(columnList)
    setFiltered(filtered)
  }, [values])

  const renderLabel = ({ title, text, filterDisabled = false }, options) => {
    const { filterKey } = options
    return (
      <Space className="nowrap">
        <Checkbox
          disabled={filterDisabled}
          onClick={(e) => handleFilterChange(e, options)}
          checked={values?.[filterKey] ?? true}
          indeterminate={values?.[filterKey] === 'indeterminate'}
        >
          {text || title}
        </Checkbox>
      </Space>
    )
  }

  const items = columns.map((item) => {
    const { children = [] } = item
    const filterKey = getFilterKey(item)
    if (children.length) {
      return {
        label: renderLabel(item, { filterKey, hasChild: true }),
        key: filterKey,
        children: children.map((childItem) => {
          const childFilterKey = getFilterKey(childItem, item)
          return {
            label: renderLabel(childItem, { filterKey: childFilterKey }),
            key: childFilterKey,
          }
        }),
      }
    }
    return {
      label: renderLabel(item, { filterKey, hasChild: false }),
      key: filterKey,
    }
  })

  const menuProps = {
    items,
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <StyledDropdown />
      <Dropdown
        menu={menuProps}
        overlayClassName={cx({
          tableColumnFilterDropdown: true,
          setMaxHeight: !columns.some((item) => !!item.children?.length),
        })}
      >
        <Button danger={filtered}>
          <Space>
            <FilterOutlined />
            列过滤
          </Space>
        </Button>
      </Dropdown>
    </div>
  )
}

TableColumnFilter.propTypes = {}
