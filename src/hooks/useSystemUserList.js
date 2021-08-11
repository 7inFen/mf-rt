import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { fetchMemberList } from '../actions/project'

// 取用户列表
export default function useUserList(props) {
  const { tick: _tick = true, keywords } = props || {}
  const [tick, setTick] = useState()

  useEffect(() => {
    if (tick !== _tick) {
      setTick(_tick)
    }
  }, [_tick])

  useEffect(() => {
    if (tick) {
      fetchData()
    }
  }, [tick])

  const initialData = {
    loading: false,
    data: {},
    list: [],
  }

  const [data, setData] = useState(initialData)
  const fetchData = () => {
    setData({
      ...initialData,
      loading: true,
    })
    fetchMemberList(
      {
        keywords,
        current: 1,
        pageSize: Number.MAX_SAFE_INTEGER,
      },
      (data) => {
        const { list, pagination } = data
        setData({
          ...data,
          loading: false,
          data,
          list,
        })
      },
      () => {
        setData({
          ...data,
          loading: false,
        })
      },
    )()
  }

  return data
}

useUserList.propTypes = {}
