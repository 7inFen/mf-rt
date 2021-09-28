import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const SetPageTitle = () => {
  const { pathMap = {} } = useSelector((store) => store.init)
  const { site = {} } = useSelector((store) => store.config)
  const location = useLocation()
  const { title = '' } = pathMap[location.pathname] || {}
  let siteTitle = title ? `${title} | ${site.name}` : site.name
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    // eslint-disable-next-line no-undef
    siteTitle = `(${REPO_INFO?.branch}) ${siteTitle}`
  }

  return (
    <Helmet>
      <title>{siteTitle}</title>
    </Helmet>
  )
}

export default SetPageTitle
