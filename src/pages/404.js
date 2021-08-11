import React from 'react'
import { Helmet } from 'react-helmet'
import { Result, Button } from 'antd'
import history from '_history'

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，页面不存在"
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.replace('/')
            }}
          >
            回到首页
          </Button>
        }
      />
    </>
  )
}

export default NotFoundPage
