import React from 'react'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import cx from 'classnames'

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-left: 24px;
  font-size: 12px;
  margin-top: 4px;
  .ant-breadcrumb-separator {
    margin: 0 2px;
  }
`

export default function BreadcrumbComponent() {
  const pathname = useLocation().pathname
  const { pathMap } = useSelector((store) => store.init)
  const { trackPath } = pathMap?.[pathname] || []
  if (trackPath?.length <= 1) {
    return null
  }
  return (
    <StyledBreadcrumb>
      {trackPath.map((item) => {
        const { title, path } = item
        const plain = path === pathname
        return (
          <Breadcrumb.Item
            key={path}
            className={cx({
              plain,
            })}
          >
            {plain ? <span>{title}</span> : <NavLink to={path}>{title}</NavLink>}
          </Breadcrumb.Item>
        )
      })}
    </StyledBreadcrumb>
  )
}

BreadcrumbComponent.propTypes = {}
