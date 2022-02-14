import React, { useState } from 'react'
import '../styles/SelectFeed.css'
import { Link } from 'react-router-dom'

// const initialFormState = {
//   selected: '',
// }

function SelectFeed() {
  // const [form, setForm] = useState('')
  // const [checked, setChecked] = useState(false)

  return (
    <div className="SelectFeedContainer">
      <div className="RadioSelect">
        <div className="Selection">
          <Link>ETH/USD</Link>
        </div>
        <div className="Selection">
          <Link>BTC/USD</Link>
        </div>
        <div className="Selection">
          <label className="container" for="AMPL/USD">
            <input type="checkbox" />
            <span className="checkmark"></span>
            AMPL/USD
          </label>
        </div>
        <div className="Selection">
          <label className="container" for="USPCE">
            <input type="checkbox" />
            <span className="checkmark"></span>
            USPCE
          </label>
        </div>
        <div className="Selection">
          <label className="container" for="TRB/USD">
            <input type="checkbox" />
            <span className="checkmark"></span>
            TRB/USD
          </label>
        </div>
        <div className="Selection">
          <label className="container" for="ETH/JPY">
            <input type="checkbox" />
            <span className="checkmark"></span>
            ETH/JPY
          </label>
        </div>
      </div>
    </div>
  )
}

export default SelectFeed
