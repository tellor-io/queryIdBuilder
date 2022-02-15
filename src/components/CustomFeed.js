import React, { useEffect, useState } from 'react'
import '../styles/CustomFeed.css'
import '../styles/Button.css'
import Clipboard from '../assets/copy.svg'
import Delete from '../assets/exit.svg'
import RadioSelectCreateNew from './reusableComponents/RadioSelectCreateNew'
import { ethers } from 'ethers'
import copy from 'copy-to-clipboard'

const initialFormState = {
  type: '',
}

function CustomFeed() {
  //Component State
  const [formValues, setFormValues] = useState(initialFormState)
  const [args, setArgs] = useState([])
  const [dynamicFormValues, setDynamicFormValues] = useState([])
  const [formFilledOut, setFormFilledOut] = useState(false)
  const [jsonString, setJsonString] = useState()
  const [queryData, setQueryData] = useState()
  const [queryId, setQueryId] = useState()
  const [showResults, setShowResults] = useState(false)
  //Globals
  const abiCoder = new ethers.utils.AbiCoder()

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
  const handleGetCustomFeed = (type, form) => {
    //Getting JSON object
    let object = form.reduce((acc, curr, index) => {
      let indexer = `arg${index + 1}`.toString()
      acc[indexer] = curr.argValue.toString()
      return acc
    }, {})
    let merged = { ...type, ...object }
    const jsonStringToUse = JSON.stringify(merged)
    //Getting queryDataArgs
    let types = []
    let values = []
    form.forEach((arg) => {
      types.push(arg.dataType)
      values.push(arg.argValue)
    })
    const queryDataArgs = abiCoder.encode(types, values)
    //Getting queryData
    const queryData = abiCoder.encode(
      ['string', 'bytes'],
      [type.type.toString(), queryDataArgs]
    )
    //Setting QueryId
    const queryId = ethers.utils.keccak256(queryData)
    //Setting Result State
    setJsonString(jsonStringToUse.toString())
    setQueryData(queryData)
    setQueryId(queryId)
    //Resetting Form State
    // setFormValues(initialFormState)
    // setDynamicFormValues([])
    // setArgs([])
    setShowResults(true)
  }
  const copyToClipboard = (text) => {
    if (typeof text === 'object') {
      copy(text.join(''))
    } else {
      copy(text)
    }
  }

  return (
    <div className="CustomFeedContainer">
      <RadioSelectCreateNew props="Custom" />
      <div className="CustomFeedHeroContainer">
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
              disabled={!formFilledOut}
              className={formFilledOut ? 'Button' : 'ButtonDisabled'}
              onClick={() => handleGetCustomFeed(formValues, dynamicFormValues)}
            >
              Generate ID
            </button>
          ) : null}
        </div>
        {showResults ? (
          <div className="CustomFeedResults">
            <div className="ResultTitle">
              <p>Query Descriptor:</p>
              <img
                src={Clipboard}
                alt="copyToClipboardIcon"
                className="CopyToClipboardIcon"
                onClick={() => copyToClipboard(jsonString ? jsonString : 'n/a')}
              />
            </div>
            <p className="ResultContent">{jsonString ? jsonString : ''}</p>
            <div className="ResultTitle">
              <p>Query Data (Bytes):</p>
              <img
                src={Clipboard}
                alt="copyToClipboardIcon"
                className="CopyToClipboardIcon"
                onClick={() => copyToClipboard(queryData ? queryData : 'n/a')}
              />
            </div>
            <p className="ResultContent">{queryData ? queryData : ''}</p>
            <div className="ResultTitle">
              <p>Query ID (Hash):</p>
              <img
                src={Clipboard}
                alt="copyToClipboardIcon"
                className="CopyToClipboardIcon"
                onClick={() => copyToClipboard(queryId ? queryId : 'n/a')}
              />
            </div>
            <p className="ResultContent">{queryId ? queryId : ''}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CustomFeed
