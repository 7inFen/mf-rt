import styled from 'styled-components'
import { Col, Row } from 'antd'

export const MiddleControl = styled(Row)`
  margin-bottom: 10px;
`
export const StyledColLeft = styled(Col)`
  & > *:not(:last-child) {
    margin-right: 10px;
  }
`
export const StyledColRight = styled(Col)`
  && {
    /* text-align: right; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .ant-select {
      width: 196px;
    }
    & > *:not(:last-child) {
      margin-right: 10px;
    }
  }
`

export const StyledExtra = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.grey};
`

export const ImageDiv = styled.div`
  width: ${(props) =>
    props.width === undefined ? 'auto' : typeof props.width === 'number' ? props.width + 'px' : props.width};
  height: ${(props) =>
    props.height === undefined ? 'auto' : typeof props.height === 'number' ? props.height + 'px' : props.height};
  img {
    width: ${(props) => (typeof props.width === 'number' ? '100%' : 'auto')};
    height: ${(props) => (typeof props.height === 'number' ? '100%' : 'auto')};
  }
`

export const ImageBgDiv = styled.div`
  width: ${(props) =>
    props.width === undefined ? 'auto' : typeof props.width === 'number' ? props.width + 'px' : props.width};
  height: ${(props) =>
    props.height === undefined ? 'auto' : typeof props.height === 'number' ? props.height + 'px' : props.height};
  background-size: 100% 100%;
  background-image: ${(props) => `url(${props.bg})`};
`

export const TopBlock = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`

export const MainBlock = styled.div`
  padding: 39px 35px;
  border-top: 1px solid #ddd;
`

export const RequiredLabel = styled.span`
  &:before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
`

export const Tip = styled.span`
  font-size: 12px;
  color: #999;
`
