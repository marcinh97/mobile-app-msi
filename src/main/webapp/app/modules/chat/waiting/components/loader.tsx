import React from "react";
import './loader.scss'

export const Loader = props => {
  return (
    <div className="content">
      <div className="waiting-screen">
        <p className="content-header">Finding someone to talk to... </p>
        <div className="loading">
          <p>Wait...</p>
          <span></span>
        </div>
      </div>
      {/*<button style={{position: 'absolute', bottom: '25px'}}> FIND! </button>*/}
    </div>
  )
}

