import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Space } from 'antd'
import { message } from '../../hooks/useApp'
import { changePassword } from '../../actions/auth'
import { layout, tailLayout } from './layout'
import pattern from '../../utils/pattern'

export default function BasicInformation(props) {
  const { onCancel, onSuccess } = props
  const [form] = Form.useForm()
  const [isSubmiting, setIsSubmiting] = useState(false)

  const handleFinish = (values) => {
    setIsSubmiting(true)
    const { old_password, password } = values
    changePassword(
      {
        old_password,
        password,
      },
      (success) => {
        message.success('密码修改成功')
        onSuccess()
        setIsSubmiting(false)
      },
      (fail) => {
        setIsSubmiting(false)
      },
    )()
  }

  return (
    <Form {...layout} onFinish={handleFinish} form={form}>
      <Form.Item
        label="旧密码"
        colon
        name="old_password"
        rules={[
          {
            required: true,
            message: '请输入旧密码！',
          },
        ]}
      >
        <Input.Password allowClear autoFocus placeholder="请输入旧密码" autoComplete="old-password" />
      </Form.Item>
      <Form.Item
        label="新密码"
        colon
        name="password"
        rules={[
          {
            required: true,
            message: '请输入新密码！',
          },
          {
            validator: (rules, value) => {
              if (`${value}`.trim().length < 8) {
                return Promise.reject('密码不能少于8位！')
              } else if (!pattern.password.test(value)) {
                return Promise.reject('密码格式不正确，请输入8位以上数字、字母或下划线！')
              }
              return Promise.resolve()
            },
          },
        ]}
      >
        <Input.Password allowClear placeholder="8位以上数字、字母或下划线" autoComplete="new-password" />
      </Form.Item>
      <Form.Item
        label="重复新密码"
        colon
        name="r_password"
        rules={[
          {
            required: true,
            message: '请重复新密码！',
          },
          {
            validator: (rules, value) => {
              if (`${value}`.trim().length < 8) {
                return Promise.reject('密码不能少于8位！')
              } else if (value !== form.getFieldValue('password')) {
                return Promise.reject('两次密码输入不匹配！')
              }
              return Promise.resolve()
            },
          },
        ]}
      >
        <Input.Password allowClear placeholder="8位以上数字、字母或下划线" autoComplete="new-password" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space size="middle">
          <Button type="primary" htmlType="submit" loading={isSubmiting} width={80}>
            确定
          </Button>
          <Button onClick={onCancel} width={80}>
            取消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

BasicInformation.propTypes = {
  onGoto: PropTypes.func,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
}
