import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/home'
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
      <Block>home</Block>
      // <div style={{ height: 1800 }}>home</div>
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
