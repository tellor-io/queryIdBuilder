import {useState} from 'react';


const BASE_DECODE_API_URL = "https://querydataapi.herokuapp.com/decode/"

const fetchDecodedQueryDataJSON = async (queryDataHexStr) => {
    const url = `${BASE_DECODE_API_URL}query_data/?query_data_str=${queryDataHexStr}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
    const json = await response.json();
    return JSON.stringify(json, null, 2);
}

const fetchDecodedSubmitValueBytesJSON = async (submitValueBytesHexStr) => {
    const url = `${BASE_DECODE_API_URL}decodeSubmitValue/${submitValueBytesHexStr}`;
    const response = await fetch(url);
    const json = await response.json();
    return JSON.stringify(json, null, 2);
}

const DataDecoder = () => {
    const [queryDataHexStr, setQueryDataHexStr] = useState("");
    const [submitValueBytesHexStr, setSubmitValueBytesHexStr] = useState("");
    const [decodedQueryDataJSON, setDecodedQueryDataJSON] = useState("");
    const [decodedSubmitValueBytesJSON, setDecodedSubmitValueBytesJSON] = useState("");

    const handleQueryDataHexStrChange = (event) => {
        setQueryDataHexStr(event.target.value);
    }
    
    const handleSubmitValueBytesHexStrChange = (event) => {
        setSubmitValueBytesHexStr(event.target.value);
    }

    const decodeQueryData = (event) => {
        event.preventDefault();
        console.log("queryDataHexStr: ", queryDataHexStr);
        let json = fetchDecodedQueryDataJSON(queryDataHexStr).then((json) => {
            console.log("decodedQueryDataJSON: ", json);
        });
        setDecodedQueryDataJSON(json);
    }
    
    const decodeSubmitValueBytes = (event) => {
        event.preventDefault();
        console.log("submitValueBytesHexStr: ", submitValueBytesHexStr);
        let json = fetchDecodedSubmitValueBytesJSON(submitValueBytesHexStr).then((json) => {
            console.log("decodedSubmitValueBytesJSON: ", json);
        });
        setDecodedSubmitValueBytesJSON(json);
    }

    return (
        <div className="HeroSection">
            <h2>Decode query data bytes</h2>
            <input 
                type="text"
                placeholder="0x..."
                id="queryDataHexStr" 
                onChange={handleQueryDataHexStrChange}
            />
            <button onClick={decodeQueryData}>Decode</button>
            <br></br>
            <pre>
                {decodedQueryDataJSON}
            </pre>
            <h2>Decode submitted value bytes</h2>
            <input 
                type="text"
                placeholder="0x..."
                id="SubmitValueBytesHexStr" 
                onChange={handleSubmitValueBytesHexStrChange}
            />
            <button onClick={decodeSubmitValueBytes}>Decode</button>
            <br></br>
            <pre>
                {decodedSubmitValueBytesJSON}
            </pre>
        </div>
    )
}

export default DataDecoder