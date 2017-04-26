import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import Canvas from './canvas'
import { BrowserRouter as Router, IndexRoute, Route } from 'react-router-dom'

const router = (
  <Router>
    <Root>
      <Canvas />
    </Root>
  </Router>
)

ReactDOM.render(router, document.getElementById('main'))
