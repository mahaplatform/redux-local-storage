import React from 'react'
import PropTypes from 'prop-types'
import * as actions from './actions'
import { connect } from 'react-redux'

class Session extends React.Component {

  static propTypes = {
    status: PropTypes.string,
    value: PropTypes.object,
    onFetch: PropTypes.func
  }

  render() {
    const { status, value } = this.props
    return (
      <div>
        <button className='btn-success' onClick={ this._handleGetSession.bind(this) }>Get Session</button>
        <button className='btn-danger' onClick={ this._handleSetSession.bind(this) }>Set Session</button>
        <button className='btn-danger' onClick={ this._handleRemoveSession.bind(this) }>Remove Session</button>
        <p>
          <strong>STATUS:</strong><br />
          { status }
        </p>
        <p>
          <strong>VALUE:</strong><br />
          { value && JSON.stringify(value) }
        </p>
      </div>
    )
  }

  componentDidMount() {
    this.props.onGetSession()
  }

  _handleGetSession() {
    this.props.onGetSession()
  }

  _handleSetSession() {
    this.props.onSetSession({ foo: 1, bar: 2, bax: 3 })
  }

  _handleRemoveSession() {
    this.props.onRemoveSession()
  }

}

const mapStateToProps = state => ({
  status: state.status,
  value: state.value
})

const mapDispatchToProps = {
  onGetSession: actions.getSession,
  onSetSession: actions.setSession,
  onRemoveSession: actions.removeSession
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)
