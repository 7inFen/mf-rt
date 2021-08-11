import styled, { createGlobalStyle } from 'styled-components'
import frontBg from '../../assets/admin/id-obverse.png'
import backBg from '../../assets/admin/id-reverse.png'

const common = () => `
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  width: 177px;
  height: 102px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: '+';
    width: 67px;
    height: 67px;
    border-radius: 50%;
    background: rgba(240, 240, 240, .8);
    font-size: 56px;
    /* line-height: 67px; */
    /* text-align: center; */
    color: #bbb;
    display: block;
    line-height: 56px;
  }
  &:hover {
    &:after {
      background: rgba(240, 240, 240, 1);
      transition: all ease-in 120ms;
    }
  }
`
export const IdCardFrontBtn = styled.div`
  ${common};
  background-image: url(${frontBg});
`
export const IdCardBackBtn = styled.div`
  ${common};
  background-image: url(${backBg});
`

export const IdCardUpload = createGlobalStyle`
  .idcard-upload {
    width: 177px;
    .ant-upload-list-item {
      width: 177px;
    }
  }
`
