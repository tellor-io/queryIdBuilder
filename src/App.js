import React, { useState, useEffect } from 'react'
import './App.css'
import TellorLogo from './assets/tellor_white.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SelectFeed from './components/SelectFeed'
import CustomFeed from './components/CustomFeed'
import SpotPrice from './components/SpotPrice'

function App() {
  //Component State
  const [active, setActive] = useState(true)
  const [inactive, setInactive] = useState(true)

  useEffect(() => {
    if (
      window.location.href.includes('/create') ||
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
      </div>
    </div>
  )
}

export default App
