import styled from 'styled-components'

export const ModalContent = styled.div`
  font-size: 20px;
  font-weight: bold;
  span {
    font-size: inherit;
    font-weight: inherit;
  }
  .red {
    color: red;
  }
`

export const SignupModal = styled.div`
  width: 800px;
  min-height: 500px;
  background: #fff;
  border-radius: ${({ theme }) => theme.radius};
  z-index: 3;
  position: relative;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
`
