import React from 'react'
import PropTypes from 'prop-type'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLocalStorage from 'redux-local-storage'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducer'

class Root extends React.Component {

  static propTypes = {
    children: PropTypes.any
  }

  constructor(props) {

    super(props)

    const loggerMiddleware = createLogger({ collapsed: true })

    const localStorageMiddleware = createLocalStorage()

    const createStoreWithMiddleware = applyMiddleware(
      thunkMiddleware,
      localStorageMiddleware,
      loggerMiddleware
    )(createStore)

    this.store = createStoreWithMiddleware(reducer)

  }

  render() {
    return (
      <Provider store={ this.store }>
        { this.props.children }
      </Provider>
    )
  }

}

export default Root
