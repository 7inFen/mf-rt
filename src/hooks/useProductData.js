/**
 * @author QIN Fen
 * @email fen.qin@mediafull.cn
 * @create date 2021-05-21 11:44:58
 * @modify date 2021-07-29 14:37:20
 * @desc 取项目产品数据
 */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchProductList } from '../actions/project'
import message from '../utils/message'
import mapKeys from '../utils/mapKeys'

export default function useProductData(props) {
  const { tick: _tick = true, params = {} } = props || {}

  const [tick, setTick] = useState()

  useEffect(() => {
    message.listen((data) => {
      if (data.refresh) {
        setTick(Date.now())
      }
    })
  }, [])

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

  const dispatch = useDispatch()

  const [data, setData] = useState(initialData)

  // productList没有分页
  const fetchData = () => {
    setData({
      ...data,
      loading: true,
    })
    dispatch(
      fetchProductList(
        {
          ...params,
          pageSize: Number.MAX_SAFE_INTEGER,
          _t: Date.now(),
        },
        (list) => {
          setData({
            ...data,
            list,
            loading: false,
            map: mapKeys(list, {
              key: 'id',
              mapAll: true,
            }),
          })
        },
        () => {
          setData({
            ...data,
            loading: false,
          })
        },
      ),
    )
  }
  return data
}

useProductData.propTypes = {}
