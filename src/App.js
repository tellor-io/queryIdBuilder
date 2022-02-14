import React, { useState, useEffect } from 'react'
import './App.css'
import { ethers } from 'ethers'
import { legacyDataHelper } from './helpers'
import TellorLogo from './assets/tellor_white.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SelectFeed from './components/SelectFeed'
import CustomFeed from './components/CustomFeed'
import SpotPrice from './components/SpotPrice'

const initialFormState = {
  currentFeed: 'none',
  asset: '',
  currency: '',
}

function App() {
  //Component State
  const [showString, setShowString] = useState(false)
  const [form, setForm] = useState(initialFormState)
  const [jsonString, setJsonString] = useState(null)
  const [queryData, setQueryData] = useState(null)
  const [queryId, setQueryId] = useState(null)
  const [active, setActive] = useState(true)
  const [inactive, setInactive] = useState(true)

  useEffect(() => {})

  //Helper Functions
  const showJSONString = () => {
    setShowString(!showString)
    setForm(initialFormState)
  }
  const activeHelper = (tab) => {
    if (tab === 'SelectFeed') {
      setActive(true)
      setInactive(true)
    } else if (tab === 'CreateFeed') {
      setActive(false)
      setInactive(false)
    }
  }

  //Form Functions
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleGetIdFromNew = () => {
    const jsonStringToUse = JSON.stringify(
      `{ type: "SpotPrice", asset: "${form.asset}", currency: "${form.currency}" }`
    )
    const newBytesArray = `[SpotPrice, ${form.asset
      .toString()
      .toUpperCase()}, ${form.currency.toString().toUpperCase()}]`
    const json_bytes = ethers.utils.toUtf8Bytes(newBytesArray)
    // console.log(json_bytes);
    // const decoded = String.fromCharCode.apply(null, json_bytes);
    // console.log(decoded);
    const json_keccak_queryId = ethers.utils.keccak256(json_bytes)
    setJsonString(jsonStringToUse)
    setQueryData(json_bytes)
    setQueryId(json_keccak_queryId)
    setForm(initialFormState)
    setShowString(false)
  }

  const handleGetIdFromLegacy = () => {
    const objectToUse = legacyDataHelper(form.currentFeed)
    setJsonString(objectToUse[0])
    setQueryData(objectToUse[1])
    setQueryId(objectToUse[2])
  }

  return (
    <div className="App">
      <nav className="Nav">
        <img src={TellorLogo} alt="TellorLogo" />
      </nav>
      <div className="BodyContainer">
        <h1 className="BodyHeader">Get a Query ID</h1>
        <p className="BodyDescription">
          A Query specifies how to pose a question to the Tellor oracle,
          instructions for reporters on how to respond (including the format of
          the response), and any special dispute considerations.{' '}
          <a
            className="DescriptionLink"
            href="https://github.com/tellor-io/dataSpecs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Review the data specs repo.
          </a>
        </p>
        <Router>
          <div className="HeroNavLinks">
            <Link
              to="/"
              className={active ? 'ActiveLink' : 'InactiveLink'}
              onClick={() => activeHelper('SelectFeed')}
            >
              Select Feed
            </Link>
            <Link
              to="/spotprice"
              className={inactive ? 'InactiveLink' : 'ActiveLink'}
              onClick={() => activeHelper('CreateFeed')}
            >
              Create New Feed
            </Link>
          </div>
          <div className="HeroSection">
            <Routes>
              <Route exact path="/" element={<SelectFeed />} />
              <Route path="/spotprice" element={<SpotPrice />} />
              <Route path="/create" element={<CustomFeed />} />
            </Routes>
          </div>
        </Router>

        {/* <div className="Form">
          <label htmlFor="currentFeed">Current Feeds</label>
          <select
            disabled={showString}
            onChange={handleChange}
            value={form.currentFeed}
            name="currentFeed"
            id="currentFeed"
          >
            <option value="none">--- Select A Feed ---</option>
            <option value="eth/usd">ETH/USD</option>
            <option value="btc/usd">BTC/USD</option>
            <option value="ampl/usd">AMPL/USD</option>
            <option value="uspce">USPCE</option>
            <option value="trb/usd">TRB/USD</option>
            <option value="eth/jpy">ETH/JPY</option>
          </select>
          <label htmlFor="currentFeeds">
            Not seeing the price feed you want? Click to create one!
          </label>
          <button onClick={showJSONString}>
            {showString ? 'Close' : 'Create New Feed'}
          </button>
          <h3
            style={{ display: showString ? 'block' : 'none' }}
            className="newFeedString"
          >
            &#123;"type": "SpotPrice", "asset":{' '}
            <input
              onChange={handleChange}
              value={form.asset}
              name="asset"
              id="asset"
              type="text"
              className="newFeed asset"
            />
            , "currency":{' '}
            <input
              onChange={handleChange}
              value={form.currency}
              name="currency"
              id="currency"
              type="text"
              className="newFeed currency"
            />
            &#125;
          </h3>
          <hr />
          <button
            disabled={
              (form.asset && form.currency) || form.currentFeed !== 'none'
                ? false
                : true
            }
            onClick={
              form.currentFeed === 'none'
                ? handleGetIdFromNew
                : handleGetIdFromLegacy
            }
          >
            Get ID
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default App
