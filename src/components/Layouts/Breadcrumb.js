import React from 'react'
// import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import IconFont from '../IconFont'

export default withRouter((props) => {
  // console.log(props)
  const { location, pathMap } = props
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  if (pathSnippets.length <= 2) {
    return null
  }
  const breadcrumbItems = []
  pathSnippets.forEach((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    if (index === pathSnippets.length - 1) {
      breadcrumbItems.push(<Breadcrumb.Item key={url}>{pathMap[url].title}</Breadcrumb.Item>)
    } else if (index > 0) {
      breadcrumbItems.push(
        <Breadcrumb.Item key={url}>
          <Link to={url}>{pathMap[url].title}</Link>
        </Breadcrumb.Item>,
      )
    }
  })
  return (
    <div className="site__breadcrumb">
      <IconFont type="iconditu" style={{ fontSize: 18, marginTop: 2 }} />
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  )
})
