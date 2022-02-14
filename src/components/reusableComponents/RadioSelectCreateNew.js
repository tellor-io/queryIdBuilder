import React, { useState, useEffect } from 'react'
import '../../styles/RadioSelectCreateNew.css'
import { Link } from 'react-router-dom'

const RadioSelectCreateNew = ({ props }) => {
  //Component State
  const [active, setActive] = useState(true)
  const [inactive, setInactive] = useState(true)
  //Handlers
  useEffect(() => {
    if (props === 'SpotPrice') {
      setActive(true)
      setInactive(true)
    } else if (props === 'Custom') {
      setActive(false)
      setInactive(false)
    }
  }, [])

  const handleSwitching = (tab) => {
    if (tab === 'SpotPrice') {
      setActive(true)
      setInactive(true)
    } else if (tab === 'Custom') {
      setActive(false)
      setInactive(false)
    }
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