import React, { useState, useEffect } from 'react'
import '../styles/SelectFeed.css'
import { legacyDataHelper } from '../helpers'
import Clipboard from '../assets/copy.svg'
import copy from 'copy-to-clipboard'
import { CustomTooltip } from './reusableComponents/CustomTooltip'

function SelectFeed() {
  //Component State
  const [jsonString, setJsonString] = useState(null)
  const [queryData, setQueryData] = useState(null)
  const [queryId, setQueryId] = useState(null)
  const [tooltipOpen0, setTooltipOpen0] = useState(false)
  const [tooltipOpen1, setTooltipOpen1] = useState(false)
  const [tooltipOpen2, setTooltipOpen2] = useState(false)

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
  //Clipboard Functions
  //Can both be consolidated at
  //higher level later.
  const copyToClipboard = (text) => {
    if (typeof text === 'object') {
      copy(text.join(''))
    } else {
      copy(text)
    }
  }
  const clipboardConsolidator = (content, num) => {
    switch (num) {
      case '0':
        setTooltipOpen0(true)
        copyToClipboard(content)
        setTimeout(() => {
          setTooltipOpen0(false)
        }, 2000)
        break
      case '1':
        setTooltipOpen1(true)
        copyToClipboard(content)
        setTimeout(() => {
          setTooltipOpen1(false)
        }, 2000)
        break
      case '2':
        setTooltipOpen2(true)
        copyToClipboard(content)
        setTimeout(() => {
          setTooltipOpen2(false)
        }, 2000)
        break
      default:
        return
    }
  }

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
          <CustomTooltip
            open={tooltipOpen0}
            title="Copied!"
            placement="right"
            arrow
          >
            <img
              src={Clipboard}
              alt="copyToClipboardIcon"
              className="CopyToClipboardIcon"
              onClick={() => clipboardConsolidator(JSON.parse(jsonString), '0')}
            />
          </CustomTooltip>
        </div>
        <p className="ResultContent">
          {jsonString ? JSON.parse(jsonString) : ''}
        </p>
        <div className="ResultTitle">
          <p>Query Data (Bytes):</p>
          <CustomTooltip
            id="1"
            open={tooltipOpen1}
            title="Copied!"
            placement="right"
            arrow
          >
            <img
              src={Clipboard}
              alt="copyToClipboardIcon"
              className="CopyToClipboardIcon"
              onClick={() => clipboardConsolidator(queryData, '1')}
            />
          </CustomTooltip>
        </div>
        <p className="ResultContent">{queryData ? queryData : ''}</p>
        <div className="ResultTitle">
          <p>Query ID (Hash):</p>
          <CustomTooltip
            open={tooltipOpen2}
            title="Copied!"
            placement="right"
            arrow
          >
            <img
              src={Clipboard}
              alt="copyToClipboardIcon"
              className="CopyToClipboardIcon"
              onClick={() => clipboardConsolidator(queryId, '2')}
            />
          </CustomTooltip>
        </div>
        <p className="ResultContent">{queryId ? queryId : ''}</p>
      </div>
    </div>
  )
}

export default SelectFeed
