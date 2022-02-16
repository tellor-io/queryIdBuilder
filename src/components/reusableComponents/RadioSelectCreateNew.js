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
        to="/awsspotprice"
        className="SelectionCreateNew"
        onClick={() => handleSwitching('AWSSpotPrice')}
      >
        <div className="RadioButtonCreateNew">
          <div
            id="AWSSpotPrice"
            className={
              active === 'AWSSpotPrice'
                ? 'RadioButtonCreateNewInner createNewDisplay'
                : 'RadioButtonCreateNewInner'
            }
          ></div>
        </div>
        <span>AWSSpotPrice</span>
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
      <Link
        to="/divaprotocolpolygon"
        className="SelectionCreateNew"
        onClick={() => handleSwitching('DivaProtocolPolygon')}
      >
        <div className="RadioButtonCreateNew">
          <div
            id="DivaProtocolPolygon"
            className={
              active === 'DivaProtocolPolygon'
                ? 'RadioButtonCreateNewInner createNewDisplay'
                : 'RadioButtonCreateNewInner'
            }
          ></div>
        </div>
        <span>DivaProtocolPolygon</span>
      </Link>
      <Link
        to="/leaguedao"
        className="SelectionCreateNew"
        onClick={() => handleSwitching('LeagueDAO')}
      >
        <div className="RadioButtonCreateNew">
          <div
            id="LeagueDAO"
            className={
              active === 'LeagueDAO'
                ? 'RadioButtonCreateNewInner createNewDisplay'
                : 'RadioButtonCreateNewInner'
            }
          ></div>
        </div>
        <span>LeagueDAO</span>
      </Link>
      <Link
        to="/legacyrequest"
        className="SelectionCreateNew"
        onClick={() => handleSwitching('LegacyRequest')}
      >
        <div className="RadioButtonCreateNew">
          <div
            id="LegacyRequest"
            className={
              active === 'LegacyRequest'
                ? 'RadioButtonCreateNewInner createNewDisplay'
                : 'RadioButtonCreateNewInner'
            }
          ></div>
        </div>
        <span>LegacyRequest</span>
      </Link>
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
    </div>
  )
}

export default RadioSelectCreateNew
