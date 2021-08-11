import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

export default function useBrandInfo({ id, brandId }) {
  const _id = brandId || id
  const { map: brandMap } = useSelector((store) => store.init.brandList)
  const itemMap = brandMap[_id] || {}
  return {
    ...itemMap,
    brandName: itemMap.name,
  }
}

useBrandInfo.propTypes = {}
