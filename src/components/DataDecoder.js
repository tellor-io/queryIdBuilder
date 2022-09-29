import {useState} from 'react';
import RadioButtonCreateNew from './reusableComponents/RadioSelectCreateNew'
import '../styles/Button.css'
import '../styles/DataDecoder.css'


const BASE_DECODE_API_URL = "https://querydataapi.herokuapp.com/decode/"
// const BASE_DECODE_API_URL = "http://localhost:8000/decode/"


const DataDecoder = () => {
    const [queryDataHexStr, setQueryDataHexStr] = useState("");
    const [submitValueBytesHexStr, setSubmitValueBytesHexStr] = useState("");
    const [solTypeStr, setSolTypeStr] = useState("");
    const [decodedQueryDataJSON, setDecodedQueryDataJSON] = useState("");
    const [decodedSubmitValueBytesJSON, setDecodedSubmitValueBytesJSON] = useState("");

    const handleQueryDataHexStrChange = (event) => {
        setQueryDataHexStr(event.target.value);
    }
    
    const handleSubmitValueBytesHexStrChange = (event) => {
        setSubmitValueBytesHexStr(event.target.value);
    }

    const handleSolTypeStrChange = (event) => {
        setSolTypeStr(event.target.value);
    }

    const fetchDecodedQueryDataJSON = async (queryDataHexStr) => {
        const url = `${BASE_DECODE_API_URL}query_data/?query_data_str=${queryDataHexStr}`
        console.log(url);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const json = await response.json();
            setDecodedQueryDataJSON(JSON.stringify(json, null, 2));
        } catch (error) {
            console.error(error);
        } finally {
            console.log("decoding query data done!");
        }
    }

    const fetchDecodedSubmitValueBytesJSON = async (submitValueBytesHexStr, solTypeStr) => {
        const url = `${BASE_DECODE_API_URL}submit_value_bytes/`;
        console.log(url);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    byte_str: submitValueBytesHexStr,
                    sol_type: solTypeStr,
                })
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const json = await response.json();
            setDecodedSubmitValueBytesJSON(JSON.stringify(json, null, 2));
        } catch (error) {
            console.error(error);
        } finally {
            console.log("decode submit val bytes func called!");
        }
    }

    const decodeQueryData = (event) => {
        event.preventDefault();
        fetchDecodedQueryDataJSON(queryDataHexStr);
    }
    
    const decodeSubmitValueBytes = (event) => {
        event.preventDefault();
        fetchDecodedSubmitValueBytesJSON(submitValueBytesHexStr, solTypeStr);
    }

    return (
        <div className="HeroSection">
        <div className="DataDecoderContainer">
            <RadioButtonCreateNew props="DataDecoder" />
            <div className="DataDecoderHero">
            <div className="DataDecoderHeroContainer">
            </div>
            <h4>Decode query data bytes</h4>
            <input 
                type="text"
                placeholder="0x..."
                id="queryDataHexStr" 
                onChange={handleQueryDataHexStrChange}
            />
            <br></br>
            <button onClick={decodeQueryData}>Decode</button>
            <br></br>
            <pre>
                {decodedQueryDataJSON}
            </pre>
            <br></br>
            <br></br>
            <h4>Decode submitted value </h4>
            <h5></h5>

            <input 
                type="text"
                placeholder="0x..."
                id="SubmitValueBytesHexStr" 
                onChange={handleSubmitValueBytesHexStrChange}
            />
            <br></br>
            <h5></h5>

            <input
                type="text"
                placeholder="type  (string, uint256, address etc.)"
                id="SolTypeStr"
                onChange={handleSolTypeStrChange}
                size="30"
            />
            <br></br>
            <button 
            onClick={decodeSubmitValueBytes}>Decode
            </button>
            <br></br>
            <pre>
                {decodedSubmitValueBytesJSON}
            </pre>
        </div>
        </div>
    </div>
    )
}

export default DataDecoder