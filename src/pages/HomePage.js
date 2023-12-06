import React, { Component } from 'react'
import { version as reactDOMVersion } from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/home'
import { version as antdVersion } from 'antd'
import Block from 'styled/Block'

export class HomePage extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return null
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Block>
        <p>React version: {React.version}</p>
        <p>ReactDOM version: {reactDOMVersion}</p>
        <p>antd version: {antdVersion}</p>
      </Block>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
