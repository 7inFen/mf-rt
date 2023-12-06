import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toKeyName } from 'is-hotkey'
import { useKeyPress as useKeyPressHook, useInterval, useThrottle } from 'ahooks'
import { updateKeyPress } from '../actions/config'

const FILTER_KEYS = ['ctrl', 'alt', 'meta']
const DISABLE_PAGES = ['/set']

export default function useKeyPress() {
  const location = useLocation()
  const { pathname } = location
  if (DISABLE_PAGES.includes(pathname)) {
    return
  }

  const dispatch = useDispatch()
  const keyPress = useSelector((store) => store.config.keyPress)

  // const [pressEvent, setPressEvent] = useState(null)
  useKeyPressHook(FILTER_KEYS, (e) => {
    // setPressEvent(e)
    handleParseKeyEvent(e)
  })

  // const throttledEvent = useThrottle(pressEvent, { wait: 100 })
  // useEffect(() => {
  //   if (throttledEvent) {
  //     handleParseKeyEvent(throttledEvent)
  //   }
  // }, [throttledEvent])

  useInterval(() => {
    checkKeyDown()
  }, 500)

  const [data, setData] = useState(keyPress)

  const handleParseKeyEvent = (e) => {
    const { key, timeStamp } = e
    const keyName = toKeyName(key)
    setData({
      ...data,
      current: {
        key: keyName,
        timeStamp,
      },
      isPress: true,
    })
  }

  const checkKeyDown = () => {
    if (data.current.timeStamp) {
      if (!data.last.timeStamp || data.current.timeStamp !== data.last.timeStamp) {
        setData({
          ...data,
          last: {
            ...data.current,
          },
        })
      } else {
        setData({
          ...data,
          current: {
            key: '',
            timeStamp: 0,
          },
          isPress: false,
        })
      }
    }
  }
  useEffect(() => {
    dispatch(updateKeyPress(data))
  }, [data])

  return null
}

useKeyPress.propTypes = {}
