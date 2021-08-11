import React from 'react'
import { Result, Button } from 'antd'
import { Helmet } from 'react-helmet'
import history from '_history'

const ServerErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>500</title>
      </Helmet>
      <Result
        status='500'
        title='500'
        subTitle='抱歉，似乎出了些问题'
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

export default ServerErrorPage
