import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import Block from '../../styled/Block'
import Search from '../../components/Search'

const { Item } = Form

function Filter({ onChange }) {
  const handleValusChange = (_, allValues) => {
    onChange(allValues)
  }

  return (
    <Block>
      <Form onValuesChange={handleValusChange} layout="inline">
        <Item name="keywords" label="搜索" trigger="onSearch">
          <Search placeholder="请输入项目ID/名称" />
        </Item>
      </Form>
    </Block>
  )
}

Filter.propTypes = {
  onChange: PropTypes.func,
}

export default Filter
