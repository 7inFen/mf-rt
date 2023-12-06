/**
 * @author QIN Fen
 * @email fen.qin@mediafull.cn
 * @create date 2022-11-14 15:05:21
 * @modify date 2022-11-14 15:13:11
 * @desc 缓存表格列固定
 */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import storage from 'store'

const STORAGE_KEY = 'tableFixedColumn'
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

export default function useFixedColumn({ storageKey }) {

  const [fixed, setFixed] = useState(false)
  useEffect(() => {
    setFixed(getStorageData(storageKey))
  }, [])

  const onChange = (fix) => {
    setFixed(fix)
    setStorageData(storageKey, fix)
  }

  return {
    fixed,
    onChange,
  }
}

useFixedColumn.propTypes = {}
