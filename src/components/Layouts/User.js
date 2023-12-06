import React from 'react'
import styled from 'styled-components'
import UserPop from '../UserPop'
import { useSelector } from 'react-redux'
import { DownOutlined } from '@ant-design/icons'
import role, { roleMap } from '../../../config/role'

// const UserWrap = styled(Space)`
//   font-size: 13px;
//   .name {
//     padding-right: 5px;
//     cursor: pointer;
//   }
//   .anticon {
//     cursor: pointer;
//   }
// `
const Pointer = styled.span`
  cursor: pointer;
  line-height: 20px;
  color: #999;
`

export default () => {
  // const [count, setCount] = useState(0);
  const account = useSelector((state) => state?.auth?.account || {})
  let { phone = '', company = '', account_status = '', account_type = '', account_name = '' } = account
  account_type = `${account_type}`
  // account_name = account_name || roleMap?.[account_type]?.name || ''
  account_name = account_name || phone
  const accountTypeName = roleMap?.[account_type]?.name || ''
  const isRoot = account_type === role.ROOT
  const isAgentAdmin = account_type === role.AGENT_ADMIN
  if (isRoot) {
    phone = phone || 'Root'
  }

  return (
    // <UserWrap>
    <UserPop
      isRoot={isRoot}
      isAgentAdmin={isAgentAdmin}
      account={{
        company,
        account_status,
        account_type,
        accountTypeName,
      }}
    >
      <Pointer>
        <span className="name">{account_name}</span>
        <DownOutlined
          style={{
            marginLeft: 5,
            fontSize: 11,
            position: 'relative',
            bottom: 1,
          }}
        />
      </Pointer>
    </UserPop>
  )
}
