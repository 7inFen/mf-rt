import styled from 'styled-components'

export default styled.div`
  z-index: 3;
  width: 360px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.radius};
  padding: 50px 80px;
  .site-title {
    color: #fff;
    font-size: 26px;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 45px;
  }
  .ant-input-affix-wrapper {
    border-radius: 4px;
  }
  .button-wrapper {
    margin-bottom: 16px;
    button {
      width: 100%;
      border-radius: 4px;
      &.login-btn {
        .anticon {
          padding: 8px;
        }
      }
    }
  }
  .ant-input-affix-wrapper,
  button {
    height: 40px;
  }
  .mb0 {
    /* margin-bottom: 30px; */
    height: 90px;
    margin-bottom: 0;
  }
  .ant-form-item-explain {
    font-size: 13px;
  }
  .account-error {
    height: 60px;
    .ant-alert {
      background: #ffe2e2;
      border: 1px solid #e44848;
      border-radius: 6px;
      padding: 2px 5px;
      display: flex;
      align-items: center;
      .anticon {
        left: 0;
        top: unset;
        position: relative;
      }
      .ant-alert-message {
        padding-left: 5px;
        font-size: 12px;
        color: #e44848;
      }
    }
  }
  .account-helper {
    display: flex;
    justify-content: space-between;
    a {
      color: #fff;
      font-size: 12px;
    }
  }

  /* 输入框label与icon切换 */
  .inputItem {
    display: block;
    .ant-input-prefix {
      width: 14px;
      overflow: hidden;
      transition: all 200ms ease;
    }
    &.hideIcon {
      .ant-input-prefix {
        width: 0;
      }
    }
  }
  .ant-form-item-label {
    label {
      & > div {
        color: transparent;
        font-size: 13px;
        transition: all 100ms ease;
        &.show {
          color: #b2b2b2;
        }
        .anticon {
          margin-right: 3px;
        }
      }
    }
  }
`
