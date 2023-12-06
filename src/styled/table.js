import { Table, Pagination } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'
import { hideScrollBar } from './layout'

export const tableStyle = `
  &.ant-table, .ant-table {
    .ant-table-thead {
      & > tr > th {
        background: ${({ theme }) => theme.color.bg};
        font-weight: 500;
        font-size: 14px;
        white-space: nowrap;
        &:not(.padding-0), &.th-padding {
          padding-left: 10px;
          padding-right: 10px;
        }
        &:nth-child(n + 1):not(:last-child) {
          border-right-style: ${(props) => (props.showBorder ? 'solid' : 'none')};
        }
        text-align: left;
      }
      .ant-table-column-sorters {
        padding-left: 0;
      }
      & > tr:first-child:not(:last-child) {
        th {
          /* 分组表头有不一样的背景 */
          background: #eff2f5;
          &:not(:last-child) {
            border-right-color: rgb(235, 235, 235);
          }
        }
      }
    }
    .ant-table-tbody {
      color: rgba(0, 0, 0, 0.85);
      & > tr > td {
        &.ant-table-cell.ant-table-cell-fix-left.ant-table-cell-fix-left-last[colspan='3']:after {
          display: none;
        }
        font-size: 14px;
        &:nth-child(n + 1):not(:last-child) {
          border-right-style: ${(props) => (props.showBorder ? 'solid' : 'none')};
        }
        &:not(.padding-0) {
          padding-left: 10px;
          padding-right: 10px;
        }
        &.no-padding,
        &.nopadding {
          padding: 0 !important;
        }
        &.no-br {
          border-right-width: 0;
        }
      }
    }
  }
`

export default styled(Table)`
  ${tableStyle};
  .ant-pagination {
    width: 100%;
    background: ${({ theme }) => theme.color.bg};
    margin: 0;
    padding: 10px;
    text-align: right;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.color.border};
    border-top: none;
    .ant-select-dropdown {
      text-align: left;
    }
  }
  &.hide-footer {
    .ant-table-footer {
      display: none;
    }
  }
  &.hide-summary {
    .ant-table-summary {
      display: none;
    }
  }

  .ant-table-sticky-scroll {
    display: none;
  }
`

export const StyledPagination = styled(Pagination)`
  justify-content: flex-end;
  &.ant-pagination {
    width: 100%;
    background: ${({ theme }) => theme.color.bg};
    margin: 0;
    padding: 10px;
    text-align: right;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.color.border};
    border-top: none;
    .ant-select-dropdown {
      text-align: left;
    }
  }
`

export const StyledFixedTable = createGlobalStyle`
    // 固定表头
    .fixedTableThead {
      ${tableStyle};
      position: fixed;
      top: ${({ offsetTop }) => offsetTop + 20}px;
      z-index: 99;
      overflow-x: auto;
      overflow-y: hidden;
      line-height: 1;
      border-top: 1px solid #f0f0f0;
      border-left: 1px solid #f0f0f0;
      thead {
        cursor: pointer;
      }
      th {
        border-right: 1px solid #f0f0f0;
        padding-top: 0;
        padding-bottom: 0;
        /* line-height: 1.5715; */
        line-height: 1;
        &.padding-0:not(.th-padding-0), &.th-padding {
          padding: 12px 10px !important;
        }
      }
      &.scroll-left {
        th {
          &.ant-table-cell-fix-left-last {
            &:after {
              box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.15);
              position: absolute;
              top: 0;
              right: 0;
              bottom: -1px;
              width: 30px;
              transform: translateX(100%);
              transition: box-shadow 0.3s;
              content: '';
              pointer-events: none;
            }
          }
        }
      }
      &.scroll-ping-right {
        /* &:after {
          box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.15);
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          width: 30px;
          transition: box-shadow 0.3s;
          content: '';
          pointer-events: none;
        } */
      }

      /* 隐藏滚动条 */
      ${hideScrollBar}

      // 隐藏图片，icon等
      .anticon, .sticky-hidden {
        visibility: hidden;
      }
    }

`
