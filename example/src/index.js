import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import Canvas from './canvas'

const router = (
  <Root>
    <Canvas />
  </Root>
)

ReactDOM.render(router, document.getElementById('main'))
