import React from 'react'
import PropTypes from 'prop-types'
import { Pagination as DefaultPagination } from '../../../node_modules/antd'

export const paginationOptions = {
  size: 'default',
  // showQuickJumper: true,
  defaultPageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ['10', '30', '50'],
  showTotal: (total) => `共 ${total} 条`,
}

const Pagination = ({ ...restProps }) => {
  return <DefaultPagination {...paginationOptions} {...restProps} />
}

export default Pagination
