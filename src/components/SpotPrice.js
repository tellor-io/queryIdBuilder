import React, { useState } from 'react'
import '../styles/SpotPrice.css'
import Button from './reusableComponents/Button'
import RadioButtonCreateNew from './reusableComponents/RadioSelectCreateNew'
import Clipboard from '../assets/copy.svg'
import { ethers } from 'ethers'
import copy from 'copy-to-clipboard'

const initialFormState = {
  asset: '',
  currency: '',
}

const SpotPrice = () => {
  //Component State
  const [form, setForm] = useState(initialFormState)
  const [jsonString, setJsonString] = useState()
  const [queryData, setQueryData] = useState()
  const [queryId, setQueryId] = useState()
  const [showResults, setShowResults] = useState(false)
  //Globals
  const abiCoder = new ethers.utils.AbiCoder()

  //Helpers
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const handleGetSpotPriceId = () => {
    const jsonStringToUse = JSON.stringify(
      `{ type: "SpotPrice", asset: "${form.asset
        .toString()
        .toLowerCase()}", currency: "${form.currency
        .toString()
        .toLowerCase()}" }`
    )
    const queryDataArgs = abiCoder.encode(
      ['string', 'string'],
      [
        form.asset.toString().toLowerCase(),
        form.currency.toString().toLowerCase(),
      ]
    )
    const queryData = abiCoder.encode(
      ['string', 'bytes'],
      ['SpotPrice', queryDataArgs]
    )
    const queryId = ethers.utils.keccak256(queryData)
    setJsonString(jsonStringToUse)
    setQueryData(queryData)
    setQueryId(queryId)
    setForm(initialFormState)
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
    <div className="CreateNewSpotPriceContainer">
      <RadioButtonCreateNew props="SpotPrice" />
      <div className="SpotPriceHeroContainer">
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
          <Button props={form} onClick={handleGetSpotPriceId}>
            Generate ID
          </Button>
        </div>
        {showResults ? (
          <div className="SpotPriceResults">
            <div className="ResultTitle">
              <p>Query Descriptor:</p>
              <img
                src={Clipboard}
                alt="copyToClipboardIcon"
                className="CopyToClipboardIcon"
                onClick={() =>
                  copyToClipboard(jsonString ? JSON.parse(jsonString) : 'n/a')
                }
              />
            </div>
            <p className="ResultContent">
              {jsonString ? JSON.parse(jsonString) : ''}
            </p>
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

export default SpotPrice
