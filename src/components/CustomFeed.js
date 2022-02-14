import React, { useState } from 'react'
import '../styles/CustomFeed.css'
import RadioSelectCreateNew from './reusableComponents/RadioSelectCreateNew'
import Button from './reusableComponents/Button'

const initialFormState = {
  type: '',
}

function CustomFeed() {
  //Component State
  const [formValues, setFormValues] = useState(initialFormState)
  const [dynamicFormValues, setDynamicFormValues] = useState([])

  //Helpers
  const handleChange = (event) => {
    console.log(event)
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }
  const handleDynamicChange = (index, event) => {
    let newdynamicFormValues = [...dynamicFormValues]
    newdynamicFormValues[index][event.target.name] = event.target.value
    setDynamicFormValues(newdynamicFormValues)
  }
  const handleAddFields = () => {
    setDynamicFormValues([...dynamicFormValues, { dataType: '', argValue: '' }])
  }
  const handleRemoveFields = (index) => {
    let newdynamicFormValues = [...dynamicFormValues]
    newdynamicFormValues.splice(index, 1)
    setDynamicFormValues(newdynamicFormValues)
  }

  console.log(dynamicFormValues)

  return (
    <div className="CustomFeedContainer">
      <RadioSelectCreateNew props="Custom" />
      <div className="CustomHero">
        <p className="CustomJSON">
          &#123;"type":
          <input
            onChange={(e) => handleChange(e)}
            value={formValues.type}
            name="type"
            id="type"
            type="text"
            className="CustomInput"
            placeholder="CamelCaseYourTypeName"
          />
          &#125;
        </p>
        {dynamicFormValues.map((element, i) => (
          <div key={i}>
            <select name="dataType" onChange={(e) => handleDynamicChange(i, e)}>
              <option value="none">Select Data Type</option>
              <option value="address">address</option>
              <option value="bytes">bytes</option>
              <option value="bytes32">bytes32</option>
              <option value="uint256">uint256</option>
            </select>
            <input
              type="text"
              name="argValue"
              value={element.name}
              onChange={(e) => handleDynamicChange(i, e)}
              placeholder="Argument Value"
            />
          </div>
        ))}
        <Button props={formValues} onClick={handleAddFields}>
          Add Argument
        </Button>
      </div>
    </div>
  )
}

export default CustomFeed
