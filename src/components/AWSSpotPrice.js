import React from 'react'
import '../styles/AWSSpotPrice.css'
import RadioButtonCreateNew from './reusableComponents/RadioSelectCreateNew'

const AWSSpotPrice = () => {
  return (
    <div className="CreateNewAWSSpotPriceContainer">
      <RadioButtonCreateNew props="AWSSpotPrice" />
      <h1>AWSSpotPrice</h1>
    </div>
  )
}

export default AWSSpotPrice
