import React from 'react'
import '../styles/LeagueDAO.css'
import RadioButtonCreateNew from './reusableComponents/RadioSelectCreateNew'

const LeagueDAO = () => {
  return (
    <div className="CreateNewLeagueDAOContainer">
      <RadioButtonCreateNew props="LeagueDAO" />
      <h1>LeagueDAO</h1>
    </div>
  )
}

export default LeagueDAO
