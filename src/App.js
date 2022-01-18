import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { legacyDataHelper } from "./helpers";

const initialFormState = {
  currentFeed: "none",
  asset: "",
  currency: "",
};

function App() {
  //Component State
  const [showString, setShowString] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [jsonString, setJsonString] = useState(null);
  const [queryData, setQueryData] = useState(null);
  const [queryId, setQueryId] = useState(null);

  //Helper Functions
  const showJSONString = () => {
    setShowString(!showString);
    setForm(initialFormState);
  };

  //Form Functions
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleGetIdFromNew = () => {
    const jsonStringToUse = JSON.stringify(
      `{ type: "SpotPrice", asset: "${form.asset}", currency: "${form.currency}" }`
    );
    const newBytesArray = `[SpotPrice, ${form.asset
      .toString()
      .toLowerCase()}, ${form.currency.toString().toLowerCase()}]`;
    const json_bytes = ethers.utils.toUtf8Bytes(newBytesArray);
    // console.log(json_bytes);
    // const decoded = String.fromCharCode.apply(null, json_bytes);
    // console.log(decoded);
    const json_keccak_queryId = ethers.utils.keccak256(json_bytes);
    setJsonString(jsonStringToUse);
    setQueryData(json_bytes);
    setQueryId(json_keccak_queryId);
    setForm(initialFormState);
    setShowString(false);
  };

  const handleGetIdFromLegacy = () => {
    const objectToUse = legacyDataHelper(form.currentFeed);
    console.log(objectToUse);
    setJsonString(objectToUse[0]);
    setQueryData(objectToUse[1]);
    setQueryId(objectToUse[2]);
  };

  return (
    <div className="App">
      <h1>Get A Query ID</h1>
      <h3>
        Link to{" "}
        <a href="https://github.com/tellor-io/dataSpecs">Data Specs Repo</a>
      </h3>
      <div className="Form">
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
          {showString ? "Close" : "Create New Feed"}
        </button>
        <h3
          style={{ display: showString ? "block" : "none" }}
          className="newFeedString"
        >
          &#123;"type": "SpotPrice", "asset":{" "}
          <input
            onChange={handleChange}
            value={form.asset}
            name="asset"
            id="asset"
            type="text"
            className="newFeed asset"
          />
          , "currency":{" "}
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
          onClick={
            form.currentFeed === "none"
              ? handleGetIdFromNew
              : handleGetIdFromLegacy
          }
        >
          Get ID
        </button>
      </div>
      <div className="resultsContainer">
        <h2>Results</h2>
        <div className="results">
          <p className="resultsJson">
            Query Descriptor: <br />
            {jsonString ? JSON.parse(jsonString) : ""}
          </p>
          <p className="resultsBytes">
            Query Data (Bytes): <br /> {queryData ? queryData : ""}
          </p>
          <p className="resultsHash">
            Query ID (Hash): <br /> {queryId ? queryId : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
