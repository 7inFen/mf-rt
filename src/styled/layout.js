import { createGlobalStyle } from 'styled-components'
// import fontImpact from '../assets/fonts/impact.ttf'
// import './fonts/index.css'
import { device } from '../reducers/config'

console.log(device)

export const hideScrollBar = `
  /* 隐藏滚动条 */
  /* Chrome Safari */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Firefox */
  scrollbar-width: none;
  /* IE 10+ */
  -ms-overflow-style: none;
`
// mac下强制显示滚动条
export const showScrollBar = device.platform.mac
  ? `
  ::-webkit-scrollbar{
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb{
    border-radius: 1em;
    background-color: rgba(50,50,50,.3);
  }

  ::-webkit-scrollbar-track{
    border-radius: 1em;
    background-color: rgba(50,50,50,.1);
  }
`
  : ''

export default createGlobalStyle`
  #app {
    height:  100vh;
    font-size: 14px;
    min-width: 1200px;

    & > .ant-layout  {
      min-height: 100vh;
    }

    /* utils */
    .hide {
      display: none !important;
    }
    .hide-v, .hide_v, .hidden {
      visibility: hidden !important;
    }
    .underline {
      cursor: pointer;
      text-decoration: underline;
    }
    .bold {
      font-weight: bold;
    }
    .red, .danger {
      color: #C60D01;
    }
    .green, .success {
      color: green;
    }
    .center {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right {
      text-align: right;
    }
    .no-mb, .margin-0, .mb0, .mb-0 {
      margin-bottom: 0 !important;
    }
    .nowrap {
      white-space: nowrap !important;
    }
    .primary {
      color: ${({ theme }) => theme.color.primary};
    }
    .grey, .secondary {
      color: #bbb;
    }
    .font12, .font-12 {
      font-size: 12px;
    }
    .no-padding, .nopadding, .padding-0 {
      padding: 0;
    }
    .link {
      color: #3da0ea;
      cursor: pointer;
    }
    .pointer {
      cursor: pointer;
    }
    .size-0 {
      display: block;
      width: 0;
      height: 0;
    }

    /* 控件 */
    /* 表单 */
    .ant-input-number:not(.show-step) {
      .ant-input-number-handler-wrap {
        display: none;
      }
    }
    .ant-checkbox-inner {
      /* 使复选框圆角为0 */
      border-radius: 0;
    }

    /* 表单错误消息 */
    .ant-form-item-explain {
      font-size: 11px;
    }

    /* 使 popover title 不换行 */
    /* 达人报价操作列弹窗 */
    .ant-popover-message-title {
      white-space: nowrap;
    }

    /* 控件高度 */
    /* 长列表 */

    /* tooltip背景色 */
    .ant-tooltip {
      .ant-tooltip-content {
        .ant-tooltip-inner, .ant-tooltip-arrow-content {
          /* background: #fff;
          color: ${({ theme }) => theme.color.font}; */
          /* white-space: normal;
          min-width: 300px; */
        }
      }
    }

    .checkbox-vertical {
      .ant-checkbox-wrapper {
        display: block;
        margin: 5px 0;
      }
    }

    /* 引入字体 */
    /* @font-face {
  font-family: "fontImpact";
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
} */
  }
`
