import React from 'react'
import '../styles/LegacyRequest.css'
import RadioButtonCreateNew from './reusableComponents/RadioSelectCreateNew'

const LegacyRequest = () => {
  return (
    <div className="CreateNewLegacyRequestContainer">
      <RadioButtonCreateNew props="LegacyRequest" />
      <h1>LegacyRequest</h1>
    </div>
  )
}

export default LegacyRequest
