import React, { useEffect, useState } from 'react'
import '../styles/CustomFeed.css'
import '../styles/Button.css'
import RadioSelectCreateNew from './reusableComponents/RadioSelectCreateNew'
import Delete from '../assets/exit.svg'

const initialFormState = {
  type: '',
}

function CustomFeed() {
  //Component State
  const [formValues, setFormValues] = useState(initialFormState)
  const [args, setArgs] = useState([])
  const [dynamicFormValues, setDynamicFormValues] = useState([])
  const [formFilledOut, setFormFilledOut] = useState(false)

  //Helpers
  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }
  const handleDynamicChange = (index, event) => {
    let newDynamicFormValues = [...dynamicFormValues]
    newDynamicFormValues[index][event.target.name] = event.target.value
    setDynamicFormValues(newDynamicFormValues)
    setArgs(newDynamicFormValues)
  }
  const handleAddFields = () => {
    setDynamicFormValues([...dynamicFormValues, { dataType: '', argValue: '' }])
  }
  const handleRemoveFields = (index) => {
    let newDynamicFormValues = [...dynamicFormValues]
    newDynamicFormValues.splice(index, 1)
    setDynamicFormValues(newDynamicFormValues)
    setArgs(newDynamicFormValues)
  }
  //For Button Disabling
  useEffect(() => {
    let array = []
    dynamicFormValues &&
      dynamicFormValues.map((obj) => {
        if (obj.dataType && obj.argValue) {
          array.push(1)
        } else {
          array.push(0)
        }
      })
    array.includes(0) ? setFormFilledOut(false) : setFormFilledOut(true)
  }, [dynamicFormValues])

  return (
    <div className="CustomFeedContainer">
      <RadioSelectCreateNew props="Custom" />
      <div className="CustomHero">
        <div className="OpenObject">
          <span>&#123;</span>
          <div className="CustomInputContainer">
            <p>"type":</p>
            <input
              onChange={(e) => handleChange(e)}
              value={formValues.type}
              name="type"
              id="type"
              type="text"
              className="CustomInput"
              placeholder="CamelCaseYourTypeName"
            />
            <p>,</p>
          </div>
          {args &&
            args.map((arg, index) => {
              let indexer = `arg${index + 1}`
              return (
                <div className="ArgumentContainer" key={index}>
                  <p>{`"${indexer}":`}</p>
                  <span>{`"${arg.argValue}",`}</span>
                </div>
              )
            })}
          <span>&#125;</span>
        </div>
        {dynamicFormValues.map((element, i) => (
          <div className="DynamicFormContainer" key={i}>
            <select
              className="DynamicFormDropdown"
              name="dataType"
              value={element.dataType}
              onChange={(e) => handleDynamicChange(i, e)}
            >
              <option value="" disabled>
                Select Data Type
              </option>
              <option value="address">address</option>
              <option value="bool">bool</option>
              <option value="bytes">bytes</option>
              <option value="bytes32">bytes32</option>
              <option value="int256">int256</option>
              <option value="string">string</option>
              <option value="uint256">uint256</option>
            </select>
            <input
              type="text"
              name="argValue"
              className="DynamicFormInput"
              value={element.argValue}
              onChange={(e) => handleDynamicChange(i, e)}
              placeholder="Argument Value"
            />
            <div
              className="DeleteIconContainer"
              onClick={() => handleRemoveFields(i)}
            >
              <img src={Delete} alt="DeleteIcon" />
            </div>
          </div>
        ))}
        <button
          id="ButtonSpecial"
          disabled={formValues.type ? false : true}
          className={formValues.type ? 'Button' : 'ButtonDisabled'}
          onClick={handleAddFields}
        >
          Add Argument
        </button>
        {dynamicFormValues.length > 0 ? (
          <button
            disabled={formFilledOut}
            className={formFilledOut ? 'Button' : 'ButtonDisabled'}
            onClick={handleAddFields}
          >
            Generate ID
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default CustomFeed
