import styled from 'styled-components'
import bg from '../assets/bg/流星.jpg'
// import bg from '../assets/bg/signupBase64'
import logo from '../assets/logo/mf-white.png'

export default styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: '';
    width: 158px;
    height: 42px;
    background-image: url(${logo});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    position: absolute;
    z-index: 3;
    top: 40px;
    left: 40px;
  }
  &:after {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.17);
    z-index: 2;
  }

  & > footer {
    position: absolute;
    z-index: 3;
    bottom: 0;
    &,
    * {
      color: #fff;
      font-size: 12px;
    }
  }
`

export const StyledBg = styled.div`
  background-image: url(${bg});
  /* background-color: black; */
  background-repeat: no-repeat;
  background-size: cover;
  /* background-position: top left; */
  background-position: center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  position: absolute;
  top: -10%;
  right: -10%;
  bottom: -10%;
  left: -10%;
  z-index: -1;
  width: 120%;
  height: 120%;
  transition: all 150ms ease-in-out;
`
