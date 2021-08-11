/**
 * @author QIN Fen
 * @email fen.qin@mediafull.cn
 * @create date 2021-05-21 11:44:58
 * @modify date 2021-08-03 14:47:04
 * @desc 取客户或供应商数据
 */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchClientList } from '../actions/finance'
import message from '../utils/message'

export default function useClientOrSupplierData(props) {
  const { type, params = {}, tick: propsTick } = props
  const dataInStore = useSelector((store) => store.finance[type]) || {
    loading: false,
    list: [],
    map: {},
  }

  const needFetchInitial = !dataInStore.list?.length
  const _tick = propsTick !== undefined ? propsTick : needFetchInitial

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

  const data = {
    loading: false,
    list: [],
    map: {},
    ...dataInStore,
  }

  const dispatch = useDispatch()
  const { current, pageSize } = data.pagination || {}
  const fetchData = () => {
    dispatch(
      fetchClientList({
        current,
        pageSize,
        type,
        ...params,
      }),
    )
  }

  return data
}

useClientOrSupplierData.propTypes = {}
