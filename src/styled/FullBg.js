import styled from 'styled-components'
import bg from '../assets/bg/signup.jpg'
// import bg from '../assets/bg/signupBase64'
import logo from '../assets/logo/mf-white.png'

export default styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bg});
  /* background-color: black; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top left;
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
    background: rgba(0, 0, 0, 0.6);
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
