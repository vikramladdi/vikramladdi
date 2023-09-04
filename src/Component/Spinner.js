import React from 'react'
import Spin from './spin.gif';

function Spinner() {
  return (
    <div>
        <h2 className="text-center"><img src={Spin} alt="spinner"/></h2>
    </div>
  )
}

export default Spinner
