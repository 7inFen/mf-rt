import React from 'react'
import PropTypes from 'prop-types'
import { Table as DefaultTable } from '../../../node_modules/antd'
import { paginationOptions } from './Pagination'
import styled from 'styled-components'

const StyledTable = styled(DefaultTable)`
  .ant-table-sticky-scroll {
    display: none;
  }
`

const Table = ({ pagination, ...restProps }) => {
  const showPagination = pagination !== false
  return (
    <StyledTable
      bordered
      sticky={{
        offsetHeader: -20,
      }}
      pagination={
        showPagination
          ? {
              ...paginationOptions,
              ...pagination,
            }
          : false
      }
      scroll={{
        scrollToFirstRowOnChange: true,
        x: 'max-content',
      }}
      {...restProps}
    />
  )
}

export default Table
