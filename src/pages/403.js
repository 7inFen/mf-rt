import React from 'react'
import { Helmet } from 'react-helmet'
import { Result, Button } from 'antd'
import history from '_history'

const PermissionDeniedPage = () => {
  return (
    <>
      <Helmet>
        <title>403</title>
      </Helmet>
      <Result
        status='403'
        title='403'
        subTitle='抱歉，你没有权限访问'
        extra={<Button
          type='primary' onClick={() => {
            history.replace('/')
          }}
        >回到首页
        </Button>}
      />
    </>
  )
}

export default PermissionDeniedPage
