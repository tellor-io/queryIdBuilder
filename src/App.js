import React, { useState, useEffect } from 'react'
import './App.css'
import TellorLogo from './assets/tellor_white.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SelectFeed from './components/SelectFeed'
import CustomFeed from './components/CustomFeed'
import SpotPrice from './components/SpotPrice'
import AWSSpotPrice from './components/AWSSpotPrice'
import DivaProtocolPolygon from './components/DivaProtocolPolygon'
import LeagueDAO from './components/LeagueDAO'
import LegacyRequest from './components/LegacyRequest'

function App() {
  //Component State
  const [active, setActive] = useState(true)
  const [inactive, setInactive] = useState(true)

  //useEffect for routing
  useEffect(() => {
    if (
      window.location.href.includes('/awsspotprice') ||
      window.location.href.includes('/custom') ||
      window.location.href.includes('/divaprotocolpolygon') ||
      window.location.href.includes('/leaguedao') ||
      window.location.href.includes('/legacyrequest') ||
      window.location.href.includes('/spotprice')
    ) {
      setActive(false)
      setInactive(false)
    }
  }, [])

  const activeHelper = (tab) => {
    if (tab === 'SelectFeed') {
      setActive(true)
      setInactive(true)
    } else if (tab === 'CreateFeed') {
      setActive(false)
      setInactive(false)
    }
  }

  return (
    <div className="App">
      <nav className="Nav">
        <a href="https://tellor.io/">
          <img src={TellorLogo} alt="TellorLogo" />
        </a>
      </nav>
      <div className="BodyContainer">
        <h1 className="BodyHeader">Get a Query ID</h1>
        <p className="BodyDescription">
          A query ID is the unique identifier for data that's requested from, 
          reported to, and retrieved from Tellor oracles. Use the tools below to generate a query ID for your data. For 
          a more detailed explanation of queries, see {' '}
          <a
            className="DescriptionLink"
            href="https://github.com/tellor-io/dataSpecs"
            target="_blank"
            rel="noopener noreferrer"
          >
            this repository
          </a>
          .
        </p>
        <Router>
          <div className="HeroNavLinks">
            <Link
              to="/awsspotprice"
              className={inactive ? 'InactiveLink' : 'ActiveLink'}
              onClick={() => activeHelper('CreateFeed')}
            >
              Create New
            </Link>
          </div>
          <div className="HeroSection">
            <Routes>
              <Route exact path="/" element={<SelectFeed />} />
               <Route path="/spotprice" element={<SpotPrice />} />
              <Route path="/custom" element={<CustomFeed />} />
              <Route
                path="/divaprotocolpolygon"
                element={<DivaProtocolPolygon />}
              />
              
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  )
}

export default App
