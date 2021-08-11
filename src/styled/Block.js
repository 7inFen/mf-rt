import styled from 'styled-components'

export default styled.div`
  background: #fff;
  padding: 20px;
  border-radius: ${({ radius }) => `${radius ?? 12}px`};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.03);
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`
