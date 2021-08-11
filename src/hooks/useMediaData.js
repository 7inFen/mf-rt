/**
 * @author QIN Fen
 * @email fen.qin@mediafull.cn
 * @create date 2021-05-21 11:44:58
 * @modify date 2021-07-29 14:22:54
 * @desc 取媒体数据
 */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchMediaList } from '../actions/media'
import message from '../utils/message'
import mapKeys from '../utils/mapKeys'

// 每个品牌的媒体不同，不用在store中存储
export default function useMediaData(props) {
  const { params = {}, tick: _tick = true } = props || {}

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
    pagination: {
      current: 1,
      pageSize: 10,
    },
    map: {},
  }

  const dispatch = useDispatch()

  const [data, setData] = useState(initialData)
  const { current, pageSize } = data.pagination || {}

  const fetchData = () => {
    setData({
      ...data,
      loading: true,
    })
    dispatch(
      fetchMediaList(
        {
          current,
          pageSize,
          ...params,
          _t: Date.now(),
        },
        (resData) => {
          const { list = [], pagination } = resData
          setData({
            ...data,
            list,
            pagination,
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

useMediaData.propTypes = {}
