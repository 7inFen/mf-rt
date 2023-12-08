import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getList } from '../../actions/project'
import Filter from './Filter'
import List from './List'
import { useUpdateEffect } from 'ahooks'

function ProjectIndex(props) {
  const [filterValue, setFilterValue] = useState({})

  const handleFilterChange = (values) => {
    setFilterValue(values)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const fetchData = (params) => {
    setLoading(true)
    getList(
      {
        ...filterValue,
        ...pagination,
        ...params,
      },
      (data) => {
        const { list, pagination } = data
        setList(list)
        setPagination(pagination)
        setLoading(false)
      },
      () => {
        setLoading(false)
      },
    )()
  }

  useUpdateEffect(() => {
    fetchData(filterValue)
  }, [filterValue])

  return (
    <>
      <Filter onChange={handleFilterChange} />
      <List loading={loading} list={list} pagination={pagination} onChange={fetchData} />
    </>
  )
}

ProjectIndex.propTypes = {}

export default ProjectIndex
