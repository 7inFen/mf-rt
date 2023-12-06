import { Tag } from 'antd'
import styled from 'styled-components'

// single word
const SW = styled(Tag)`
  font-weight: normal;
  color: ${({ theme, color }) => color || theme.color.primary};
  border-color: ${({ theme, color }) => color || theme.color.primary};
  border-radius: 2px;
  /* border: none; */
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-size: 12px;
  transform: scale(0.85);
  margin-right: 4px;
  cursor: pointer;
`

export default SW
