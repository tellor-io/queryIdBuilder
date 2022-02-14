import React, { useState } from 'react'
import '../styles/CustomFeed.css'
import RadioSelectCreateNew from './reusableComponents/RadioSelectCreateNew'
import Button from './reusableComponents/Button'

const initialFormState = {
  name: '',
}

function CustomFeed() {
  //Component State
  const [form, setForm] = useState(initialFormState)

  //Helpers
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="CustomFeedContainer">
      <RadioSelectCreateNew />
      <div className="CustomHero">
        <p className="CustomJSON">
          &#123;"type":
          <input
            onChange={handleChange}
            value={form.name}
            name="name"
            id="name"
            type="text"
            className="CustomInput"
          />
          &#125;
        </p>
        <Button props={form}>Add Agrument</Button>
      </div>
    </div>
  )
}

export default CustomFeed
