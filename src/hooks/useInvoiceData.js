/**
 * @author QIN Fen
 * @email fen.qin@mediafull.cn
 * @create date 2021-05-21 11:44:58
 * @modify date 2021-07-21 21:05:43
 * @desc 取发票数据
 */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchInvoiceList } from '../actions/invoice'
import message from '../utils/message'

export default function useInvoiceData(props) {
  const { type, params = {}, tick: propsTick } = props
  const dataInStore = useSelector((store) => store.invoice[type]) || {
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
      fetchInvoiceList({
        current,
        pageSize,
        type,
        ...params,
      }),
    )
  }

  return data
}

useInvoiceData.propTypes = {}
