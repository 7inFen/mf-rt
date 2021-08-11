import { Typography } from 'antd'
import styled from 'styled-components'
import iconMovie from '../../assets/icon/movie.png'

const { Text } = Typography

export const StyledInfo = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.color.grey};
`
export const Font12Grey = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.color.grey};
`

export const StyledCover = styled.div`
  width: 80px;
  height: 80px;
  background: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }
  &:hover {
    .play {
      border-left-color: rgba(255, 255, 255, 0.7);
    }
  }
`
export const PlayBtn = styled.div`
  position: absolute;
  left: 30px;
  z-index: 3;
  width: 0;
  height: 0;
  /* border-width: 20px; */
  border-color: rgba(255, 255, 255, 0.5);
  border-style: solid;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-top-width: 15px;
  border-right-width: 0;
  border-bottom-width: 15px;
  border-left-width: 25px;
  border-radius: 4px;
  transition: all 100ms ease-in;
`

export const StyledCoverImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  z-index: 1;
`
export const StyledCoverPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${iconMovie});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
`

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 90px;
  align-items: center;
`
export const BlockTitle = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.color.grey};
  margin-bottom: 8px;
  white-space: nowrap;
`
export const BlockValue = styled.span`
  font-size: 20px;
  font-weight: bold;
  font-family: initial;
`
