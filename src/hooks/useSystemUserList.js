import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { fetchUserList } from '../actions/organization'
import { getCEO } from '../components/auth'
import mapKeys from '../utils/mapKeys'

// 取用户列表
export default function useSystemUserList(props) {
  const { tick: _tick = true, params, withCEO = false } = props || {}
  const [tick, setTick] = useState()
  const { isAll = '1' } = params || {}

  const CEOInfo = getCEO()

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
    list: [],
    map: {},
  }

  const [list, setList] = useState([])
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (list.length) {
      const combineList = withCEO
        ? [
            {
              rankRemark: 'CEO',
              isLeader: true,
              ...CEOInfo,
            },
          ].concat(list)
        : list
      setData({
        ...data,
        loading: false,
        list: combineList,
        map: mapKeys(combineList, {
          key: 'id',
          name: 'name',
        }),
        mapAll: mapKeys(combineList, {
          key: 'id',
          mapAll: true,
        }),
      })
    }
  }, [list])

  const fetchData = () => {
    setData({
      ...initialData,
      loading: true,
    })
    fetchUserList(
      {
        isAll,
        // rnd: Date.now(),
        ...params,
      },
      (list) => {
        setList(list)
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

useSystemUserList.propTypes = {}
