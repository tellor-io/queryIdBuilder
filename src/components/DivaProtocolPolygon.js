import React from 'react'
import '../styles/DivaProtocolPolygon.css'
import RadioButtonCreateNew from './reusableComponents/RadioSelectCreateNew'

const DivaProtocolPolygon = () => {
  return (
    <div className="CreateNewDivaProtocolPolygonContainer">
      <RadioButtonCreateNew props="DivaProtocolPolygon" />
      <h1>DivaProtocolPolygon</h1>
    </div>
  )
}

export default DivaProtocolPolygon
