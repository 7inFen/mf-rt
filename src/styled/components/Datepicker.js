import { DatePicker } from 'antd'
import styled from 'styled-components'

export const StyledFilterDatePicker = styled(DatePicker)`
  border: none;
  box-shadow: none;
  padding: 0;
  .ant-picker-input {
    input {
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      border-radius: 0;
      font-size: 13px;
      text-align: center;
    }
  }
`

export const StyledFilterRangePicker = styled(DatePicker.RangePicker)`
  border: none;
  box-shadow: none;
  padding: 0;
  .ant-picker-input {
    input {
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      border-radius: 0;
      font-size: 13px;
      text-align: center;
    }
  }
`
