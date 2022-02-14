import React, { useState } from 'react'
import '../styles/SpotPrice.css'
import Button from './reusableComponents/Button'
import RadioButtonCreateNew from './reusableComponents/RadioSelectCreateNew'

const initialFormState = {
  asset: '',
  currency: '',
}

const SpotPrice = () => {
  //Component State
  const [form, setForm] = useState(initialFormState)

  //Helpers
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="CreateNewSpotPriceContainer">
      <RadioButtonCreateNew props="SpotPrice" />
      <div className="SpotPriceHero">
        <p className="SpotPriceJSON">
          &#123;"type": "SpotPrice", "asset":{' '}
          <input
            onChange={handleChange}
            value={form.asset}
            name="asset"
            id="asset"
            type="text"
            className="SpotPriceInput"
          />
          , "currency":{' '}
          <input
            onChange={handleChange}
            value={form.currency}
            name="currency"
            id="currency"
            type="text"
            className="SpotPriceInput"
          />
          &#125;
        </p>
        <Button props={form}>Generate ID</Button>
      </div>
    </div>
  )
}

export default SpotPrice
