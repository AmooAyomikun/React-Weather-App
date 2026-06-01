import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const WeatherStat = ({label, value, icon}) => {

  return (
    <div className='stat-card'>
      <FontAwesomeIcon icon={icon} />
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  )
}

export default WeatherStat