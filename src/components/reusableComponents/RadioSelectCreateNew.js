import React, { useState } from 'react'
import '../../styles/RadioSelectCreateNew.css'
import { Link } from 'react-router-dom'

const RadioSelectCreateNew = () => {
  //Component State
  const [active, setActive] = useState(true)
  const [inactive, setInactive] = useState(true)
  //Handlers
  const handleSwitching = (tab) => {
    console.log(tab)
    if (tab === 'SpotPrice') {
      setActive(true)
      setInactive(true)
    } else if (tab === 'Custom') {
      setActive(false)
      setInactive(false)
    }
  }
  console.log(active)
  console.log(inactive)
  return (
    <div className="RadioSelectCreateNew">
      <Link
        to="/spotprice"
        className="SelectionCreateNew"
        onClick={() => handleSwitching('SpotPrice')}
      >
        <div className="RadioButtonCreateNew">
          <div
            id="SpotPrice"
            className={
              active
                ? 'RadioButtonCreateNewInner createNewDisplay'
                : 'RadioButtonCreateNewInner'
            }
          ></div>
        </div>
        <span>SpotPrice</span>
      </Link>
      <Link
        to="/create"
        className="SelectionCreateNew"
        onClick={() => handleSwitching('Custom')}
      >
        <div className="RadioButtonCreateNew">
          <div
            id="Custom"
            className={
              inactive
                ? 'RadioButtonCreateNewInner'
                : 'RadioButtonCreateNewInner createNewDisplay'
            }
          ></div>
        </div>
        <span>Custom</span>
      </Link>
    </div>
  )
}

export default RadioSelectCreateNew
