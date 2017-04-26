import React from 'react'
import Session from './session'

class Canvas extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="container">
          <div className="col-md-12 text-center">
            <Session />
          </div>
        </div>
      </div>
    )
  }

}

export default Canvas
