import React from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'

function RequestLoading ({ site: { loading = '' }, full }) {
  if (loading) {
    return <img src={loading} style={{ width: 150, height: 'auto', display: 'block', margin: '0 auto' }} />
  }
  return <Spin spinning style={{ height: '100vh', minHeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
}

function mapStateToProps ({ config: { site } }) {
  return {
    site
  }
}
export default connect(mapStateToProps)(RequestLoading)
