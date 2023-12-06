// SearchSelect的2.0版
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select, AutoComplete } from 'antd'
import cx from 'classnames'
import request from '../lib/request'
// import debounce from '../utils/debounce'
import mapKeys from '../utils/mapKeys'
// import Immutable from 'immutable'
import { useDebounceFn, useThrottleFn } from 'ahooks'
import { uniqueObjList } from '../utils/unique'

export default function SearchFilter({
  api, // 接口
  url, // 接口url
  params = {},
  value: propsValue = undefined,
  onChange,
  valueKey = 'id',
  labelKey = 'name',
  placeholder = '请输入搜索内容',
  className = '',
  mode = 'select',
  renderRow,
  style,
  width = 500,
  initList = false, // 初始化列表
  initListTick, // 重载列表的时间戳
  onListReady,
  populateData,
  localSearch = false, // 是否本地搜索
  ...restProps
}) {
  const [value, setValue] = useState()
  useEffect(() => {
    if (value !== propsValue) {
      setValue(propsValue)
    }
  }, [propsValue])

  const initialPagination = {
    current: 1,
    pageSize: localSearch ? Number.MAX_SAFE_INTEGER : 50,
  }
  const [pagination, setPagination] = useState(initialPagination)

  useEffect(() => {
    if ((typeof initList === 'boolean' && initList) || initListTick) {
      handleSearch('', {
        init: true,
      })
    } else if (initList instanceof Array) {
      handleFetchSuccess({
        list: initList.filter((item) => !!(item[valueKey] && item[labelKey])),
        pagination: initialPagination,
      })
      // 外部initList更新后，重置pagination
      setPagination(initialPagination)
    }
  }, [initList, initListTick])

  const IS_INPUT_MODE = mode === 'input'

  // 输入中文完整字符的锁定状态
  let cpLock = false

  const handleSearch = (value, option) => {
    // console.log(value)
    if (localSearch && !option?.init) {
      return
    }
    handleFetch({
      keywords: value,
      current: 1,
    })
  }

  const handleCompositionStart = (e) => {
    console.log('中文输入开始')
    cpLock = true
  }

  const handleCompositionEnd = (e) => {
    // handleSearch会在handleCompositionEnd前触发
    console.log('中文输入结束')
    cpLock = false
    const value = e.target.value
    if (localSearch) {
      list.forEach((item, idx) => {
        filterOption(value, {
          key: `${idx}`,
          value: item[valueKey],
          children: item[labelKey],
        })
      })
    } else {
      handleFetch({
        keywords: value,
        current: 1,
      })
    }
  }

  const [loading, setLoading] = useState(false)
  const deFetch = (_params) => {
    if (cpLock) {
      return
    }
    setLoading(true)
    const allParams = {
      current: pagination.current || initialPagination.current,
      // pageSize: Number.MAX_SAFE_INTEGER,
      pageSize: pagination.pageSize || initialPagination.pageSize,
      ..._params,
      ...params,
    }
    allParams.keywords = allParams.keywords?.trim() || ''
    // 保证关键字与结果一致性
    // if (!allParams.keywords) {
    //   return
    // }
    console.log('fetch', allParams)
    if (api) {
      api(allParams, handleFetchSuccess, handleFetchFail)
    } else if (url) {
      request({
        url,
        params: allParams,
        onSuccess: handleFetchSuccess,
        onFail: handleFetchFail,
      })()
    } else {
      setLoading(false)
      console.log('未指明请求方法')
    }
  }

  // const handleFetch = debounce(deFetch)
  const { run: handleFetch } = useDebounceFn(deFetch, {
    wait: 200,
  })

  const [list, setList] = useState([])
  const [listValueMap, setListValueMap] = useState({})
  const [listLabelMap, setListLabelMap] = useState({})
  // console.log(list)
  const handleFetchSuccess = (data) => {
    const { list: dataList = [], pagination } = populateData?.(data) || data

    setPagination({
      ...initialPagination,
      ...pagination,
    })

    const listResult = (pagination?.current === 1 ? [] : list).concat(dataList)
    // .map((item) => ({
    //   ...item,
    // }))

    const _list = uniqueObjList(listResult, valueKey)

    setList(_list)

    setListValueMap(
      mapKeys(_list, {
        key: valueKey,
        mapAll: true,
      }),
    )
    setListLabelMap(
      mapKeys(_list, {
        key: labelKey,
        mapAll: true,
      }),
    )
    onListReady?.(_list)
    setLoading(false)
  }
  const handleFetchFail = () => {
    setLoading(false)
  }

  const handleSelect = (value) => {
    // 找出选中项的label和value
    setValue(value)
    onChange(value, IS_INPUT_MODE ? listLabelMap[value] : listValueMap[value])
  }

  const options = list.map((item) => {
    // const value = item?.[valueKey] || ''
    const label = item?.[labelKey] || '未指定labelKey'
    return {
      label,
      // input模式的value为其label
      value: label,
    }
  })

  // 输入模式不一定选择下拉内容，需要同步输入值
  const { run: deChange } = useDebounceFn(onChange, {
    wait: 200,
  })
  const handleInputChange = (value) => {
    setValue(value)
    deChange(value, listLabelMap[value] || {})
  }
  const handleSelectChange = (value) => {
    setValue(value)
    deChange(value, listValueMap[value] || {})
  }

  const thPopupScroll = (e) => {
    const target = e.target
    if (!target) {
      return
    }
    const dropDOwnHeight = target.offsetHeight
    const scrollHeight = target.scrollHeight
    const scrollTop = target.scrollTop
    if (scrollHeight - (dropDOwnHeight + scrollTop) < 500) {
      if (pagination.total > list.length) {
        handleFetch({
          current: pagination.current + 1,
        })
      }
    }
  }

  const { run: handlePopupScroll } = useThrottleFn(thPopupScroll, {
    wait: 50,
  })

  const filterOption = (value, option) => {
    // if (localSearch && !cpLock) {
    const { value: optionValue = '', children: optionLabel = '' } = option
    const valueTrim = `${value}`.toLowerCase().trim()
    const optionValueTrim = `${optionValue}`.toLowerCase().trim()
    const optionLabelTrim = `${optionLabel}`.toLowerCase().trim()
    return optionValueTrim.includes(valueTrim) || optionLabelTrim.includes(valueTrim)
  }
  // console.log(value, list)

  return IS_INPUT_MODE ? (
    <AutoComplete
      filterOption={localSearch && filterOption}
      value={value}
      // value={list.filter((item) => item?.[valueKey] === value)?.[0]?.[labelKey] || value}
      onSelect={handleSelect}
      onSearch={handleSearch}
      onChange={handleInputChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      placeholder={placeholder}
      dropdownMatchSelectWidth={false}
      getPopupContainer={() => document.getElementById('content')}
      loading={loading}
      // open
      onPopupScroll={handlePopupScroll}
      defaultActiveFirstOption={false}
      style={{
        width,
        ...style,
      }}
      {...(renderRow
        ? {}
        : {
            options,
          })}
      {...restProps}
    >
      {list.map((item, idx) => {
        const label = item?.[labelKey] || '未指定labelKey'
        return (
          <AutoComplete.Option key={`${idx}`} value={label}>
            {renderRow?.(item)}
          </AutoComplete.Option>
        )
      })}
    </AutoComplete>
  ) : (
    <Select
      showSearch
      filterOption={localSearch && filterOption}
      value={value}
      onSelect={handleSelect}
      onSearch={handleSearch}
      onChange={handleSelectChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      placeholder={placeholder}
      dropdownMatchSelectWidth={false}
      getPopupContainer={() => document.getElementById('content')}
      loading={loading}
      onPopupScroll={handlePopupScroll}
      defaultActiveFirstOption={false}
      className={cx({
        [className]: !!className,
        'filter-select': true,
      })}
      style={{
        width,
        ...style,
      }}
      {...restProps}
    >
      {list.map((item, idx) => {
        const value = item?.[valueKey] || ''
        const label = item?.[labelKey] || '未指定labelKey'
        return (
          <Select.Option key={`${idx}`} value={value}>
            {renderRow?.(item) || label}
          </Select.Option>
        )
      })}
    </Select>
  )
}

SearchFilter.propTypes = {}
