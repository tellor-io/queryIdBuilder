import React, { useState, useEffect, useRef } from 'react'
import '../styles/SelectFeed.css'
import { legacyDataHelper } from '../helpers'
import Clipboard from '../assets/copy.svg'
import copy from 'copy-to-clipboard'
import ReactTooltip from 'react-tooltip'

function SelectFeed() {
  //Component State
  const [jsonString, setJsonString] = useState(null)
  const [queryData, setQueryData] = useState(null)
  const [queryId, setQueryId] = useState(null)

  //useEffects
  useEffect(() => {
    const objectToUse = legacyDataHelper('eth/usd')
    setJsonString(objectToUse[0])
    setQueryData(objectToUse[1])
    setQueryId(objectToUse[2])
    return () => {
      setJsonString(null)
      setQueryData(null)
      setQueryId(null)
    }
  }, [])

  //Helpers
  const handleGetIdFromLegacy = (feed) => {
    const objectToUse = legacyDataHelper(feed)
    const target = document.getElementById(feed)
    const classes = document.querySelectorAll('.RadioButtonInner')
    classes.forEach((el) => el.classList.remove('display'))
    target.classList.add('display')
    setJsonString(objectToUse[0])
    setQueryData(objectToUse[1])
    setQueryId(objectToUse[2])
  }
  const copyToClipboard = (text) => {
    if (typeof text === 'object') {
      copy(text.join(''))
    } else {
      copy(text)
    }
  }

  ////////////////
  // FIGURE OUT TOOLTIP
  ///////////////

  return (
    <div className="SelectFeedContainer">
      <div className="RadioSelect">
        <div
          className="Selection"
          onClick={() => handleGetIdFromLegacy('eth/usd')}
        >
          <div className="RadioButton">
            <div id="eth/usd" className="RadioButtonInner display"></div>
          </div>
          <span>ETH/USD</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromLegacy('btc/usd')}
        >
          <div className="RadioButton">
            <div id="btc/usd" className="RadioButtonInner"></div>
          </div>
          <span>BTC/USD</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromLegacy('ampl/usd')}
        >
          <div className="RadioButton">
            <div id="ampl/usd" className="RadioButtonInner"></div>
          </div>
          <span>AMPL/USD</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromLegacy('uspce')}
        >
          <div className="RadioButton">
            <div id="uspce" className="RadioButtonInner"></div>
          </div>
          <span>USPCE</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromLegacy('trb/usd')}
        >
          <div className="RadioButton">
            <div id="trb/usd" className="RadioButtonInner"></div>
          </div>
          <span>TRB/USD</span>
        </div>
        <div
          className="Selection"
          onClick={() => handleGetIdFromLegacy('eth/jpy')}
        >
          <div className="RadioButton">
            <div id="eth/jpy" className="RadioButtonInner"></div>
          </div>
          <span>ETH/JPY</span>
        </div>
      </div>
      <div className="SelectFeedResults">
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
    </div>
  )
}

export default SelectFeed
