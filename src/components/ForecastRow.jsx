import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud } from '@fortawesome/free-regular-svg-icons'
import { faCloudSun } from '@fortawesome/free-solid-svg-icons/faCloudSun'
import { faCloudRain } from '@fortawesome/free-solid-svg-icons/faCloudRain'
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons/faWind'
import { faSnowflake } from '@fortawesome/free-regular-svg-icons'
import { faSmog } from '@fortawesome/free-solid-svg-icons/faSmog'

const weatherIcons = {
  Clear: faSun,
  Clouds: faCloud,
  Rain: faCloudRain,
  Drizzle: faCloudRain,
  Thunderstorm: faCloudBolt,
  Snow: faSnowflake,
  Mist: faSmog,
  Smoke: faSmog,
  Haze: faSmog,
  Fog: faSmog,
  Dust: faWind,
  Sand: faWind,
  Ash: faWind,
  Squall: faWind,
  Tornado: faWind,
}

const ForecastRow = ({forecast}) => {
  return (
    <div className='forecast'>
      {forecast.map((item) => {
        const date = new Date(item.dt_txt)
        const weatherTypes = item.weather[0].main
        const selectedIcons = weatherIcons[weatherTypes] || faCloudSun
        
        return <div className='forecast-card' key={item.dt}>
          <h2 className='forecast-day'>{date.toLocaleDateString('en-US', {
            weekday: 'short'
          })}</h2>
          
          <div className='forecast-icon'>
            <FontAwesomeIcon icon={selectedIcons} />
          </div>
          
          <p className='forecast-description'>{item.weather[0].description
                                              .split(" ")
                                              .map((word)=> {
                                                return word.charAt(0).toUpperCase() + word.slice(1)
                                              }).join(" ")
                                              }
          </p>
          
          <div className="forecast-temp">
            <span className="high-temp">{Math.round(item.main.temp_max)}°C</span>
            <span className="low-temp">{Math.round(item.main.temp_min)}°C</span>
          </div>
        </div>
      })}
    </div>
  )
}

export default ForecastRow