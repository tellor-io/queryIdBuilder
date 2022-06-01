import React, { useState, useEffect } from 'react'
import '../../styles/RadioSelectCreateNew.css'
import { Link } from 'react-router-dom'

const RadioSelectCreateNew = ({ props }) => {
  //Component State
  const [active, setActive] = useState('')
  //useEffect for setting tabs correctly on load
  useEffect(() => {
    setActive(props)
  }, [props])
  //Handlers
  const handleSwitching = (tab) => {
    setActive(tab)
  }

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
              active === 'SpotPrice'
                ? 'RadioButtonCreateNewInner createNewDisplay'
                : 'RadioButtonCreateNewInner'
            }
          ></div>
        </div>
        <span>SpotPrice</span>
      </Link>
      <Link
        to="/custom"
        className="SelectionCreateNew"
        onClick={() => handleSwitching('Custom')}
      >
        <div className="RadioButtonCreateNew">
          <div
            id="Custom"
            className={
              active === 'Custom'
                ? 'RadioButtonCreateNewInner createNewDisplay'
                : 'RadioButtonCreateNewInner'
            }
          ></div>
        </div>
        <span>Custom</span>
      </Link>
      
      
      
      
      
    </div>
  )
}

export default RadioSelectCreateNew
