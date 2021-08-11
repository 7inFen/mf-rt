import { Tabs } from 'antd'
import styled from 'styled-components'

export default styled(Tabs)`
  &.ant-tabs {
    border-radius: ${({ theme }) => theme.radius};
    overflow: visible;
    & > .ant-tabs-nav {
      margin: 0;
      &:before {
        border: none;
      }
      & > div:first-child {
        display: flex;
      }
      .ant-tabs-nav-wrap {
        .ant-tabs-tab {
          margin-right: 0;
          position: relative;
          padding: 10px 40px 5px;
          /* padding: 0; */
          background: transparent;
          border-color: transparent;
          &.ant-tabs-tab {
            /* background: #fff; */
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            &:after {
              content: '';
              height: 2px;
              width: 100%;
              background: transparent;
              margin-top: 5px;
            }
            &.ant-tabs-tab-active {
              &:after {
                background: ${({ theme }) => theme.color.primary};
              }
            }
          }
        }
      }
    }
    & > .ant-tabs-content-holder {
      & > .ant-tabs-content {
        .ant-tabs-tabpane {
          padding: 0;
          background: transparent;
          border-bottom-left-radius: ${({ theme }) => theme.radius};
          border-bottom-right-radius: ${({ theme }) => theme.radius};
        }
        .search {
          &.noMargin {
            margin: 0;
          }
        }
      }
    }
    &.hide-tab-line {
      .ant-tabs-tab {
        padding: 10px 25px !important;
        & * {
          color: ${({ theme }) => theme.color.font};
        }
        &:after {
          display: none !important;
        }
      }
    }
  }
`

export const TabPane = styled(Tabs.TabPane)``

export const TabBarItem = styled.div`
  border-top-left-radius: ${({ theme }) => theme.radius};
  border-top-right-radius: ${({ theme }) => theme.radius};
  cursor: pointer;
  /* display: flex; */
  /* align-items: center; */
  &.active {
    background: #fff;
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: #fff;
      position: relative;
      bottom: 0;
      z-index: 2;
    }
  }
`
