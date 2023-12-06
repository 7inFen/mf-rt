import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from 'antd'
// import { SearchOutlined } from '@ant-design/icons'
import search_icon from '../assets/icon/搜索.png'
import cx from 'classnames'

const StyledSearchWrap = styled.div`
  /* width: 400px; */
  .ant-input-affix-wrapper {
    padding-right: 10px;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
  .ant-input-search-icon {
    display: none;
  }
  .ant-input-group-addon {
    display: none;
  }
`

const StyledSearchIcon = styled.div`
  background-image: url(${search_icon});
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  background-size: ${({ $size }) => ($size === 'small' ? '80%' : '100%')};
  background-position: center;
  cursor: pointer;
`

const ListSearch = (props) => {
  const {
    placeholder = '',
    value = '',
    onChange = () => {},
    onSearch = () => {},
    width = 300,
    style,
    noMargin = false,
    size = 'middle',
    ...restProps
  } = props
  const [searchText, handleSearchChange] = useState(value)
  const [cpLock, setCpLock] = useState(false)

  useEffect(() => {
    handleSearchChange(value)
  }, [value])

  const {
    device: { browser },
  } = useSelector((store) => store.config || {})

  const isFirefox = browser.firefox

  return (
    <StyledSearchWrap
      className={cx({
        search: true,
        noMargin,
      })}
    >
      <Input.Search
        size={size}
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => {
          handleSearchChange(e.target.value)
          if (cpLock) return
          onChange(e)
        }}
        onSearch={onSearch}
        suffix={<StyledSearchIcon $size={size} onClick={() => onSearch(searchText)} />}
        onCompositionStart={() => {
          if (!isFirefox) {
            setCpLock(true)
          }
        }}
        onCompositionEnd={(e) => {
          if (!isFirefox) {
            setCpLock(false)
            onChange(e)
          }
        }}
        onFocus={(e) => e.target.select()}
        style={{
          width,
          ...style,
        }}
        {...restProps}
      />
    </StyledSearchWrap>
  )
}

ListSearch.propTypes = {
  enterButton: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSearch: PropTypes.func,
  style: PropTypes.object,
}

export default ListSearch
