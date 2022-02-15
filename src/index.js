import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ReactGA from 'react-ga'

//UA-219651406 for tellor org on GA
ReactGA.initialize('GA: G-4LP9Q0C5NR', [
  /*options*/
])

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
