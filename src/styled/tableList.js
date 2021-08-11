import { Table, Pagination } from 'antd'
import styled from 'styled-components'
import doubleRightIcon from '../assets/icon/doubleRight.png'

export default styled(Table)`
  .ant-table {
    .ant-table-container {
      .ant-table-tbody {
        color: rgba(0, 0, 0, 0.85);
        & > tr {
          td {
            vertical-align: middle;
            /* &.verticalMiddle {
              vertical-align: middle;
            } */
            padding-left: 20px;
            padding-right: 20px;
            &:not([class*='ant-table-cell-fix']) {
              padding-left: 40px;
              padding-right: 40px;
            }
            &.ant-table-selection-column {
              vertical-align: middle;
              padding-left: 40px;
            }
            /* 固定列右边框 */
            &.ant-table-cell-fix-left-last {
              &:after {
                content: '';
                width: 1px;
                height: 50%;
                top: 25%;
                background: ${({ theme }) => theme.color.border};
              }
            }
          }
          &:not(:last-child) td {
            border-bottom-width: 15px;
            border-bottom-color: ${({ theme }) => theme.color.bg};
          }
          &:last-child td {
            border-bottom: none;
          }
        }
      }
    }
    &.ant-table-ping-right:not(.ant-table-ping-left) {
      .ant-table-row {
        position: relative;
        &:after {
          content: '';
          position: absolute;
          display: block;
          width: 70px;
          height: 115px;
          background: url(${doubleRightIcon}) no-repeat;
          background-size: 70%;
          background-position: center;
          right: 0;
          z-index: -1;
          /* animation: 100ms leftRight ease-in forwards; */
        }
        @keyframes leftRight {
          0% {
            right: 0;
          }
          50% {
            right: -50px;
          }
          100% {
            right: 0;
          }
        }
      }
    }
  }
`
