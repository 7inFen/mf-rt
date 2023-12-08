import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import Block from '../../styled/Block'
import styled from 'styled-components'
import cx from 'classnames'

const StyledCounts = styled.div`
  &.red {
    color: red;
    font-weight: bold;
  }
`

function List({ loading, list, pagination, onChange }) {
  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination
    onChange({
      current,
      pageSize,
    })
  }

  return (
    <Block>
      <Table
        loading={loading}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
          },
          {
            title: '项目名',
            dataIndex: 'name',
          },
          {
            title: '子项目数',
            dataIndex: 'counts',
            render: (counts) => (
              <StyledCounts
                className={cx({
                  red: counts > 60,
                })}
              >
                {counts}
              </StyledCounts>
            ),
          },
          {
            title: '创建人',
            dataIndex: 'by',
          },
          {
            title: '创建时间',
            dataIndex: 'at',
          },
        ]}
        dataSource={list}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </Block>
  )
}

List.propTypes = {
  loading: PropTypes.bool,
  list: PropTypes.array,
  pagination: PropTypes.shape({
    current: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
  }),
  onChange: PropTypes.func,
}

export default List
