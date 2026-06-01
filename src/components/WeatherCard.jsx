import React from 'react'
import WeatherStat from './WeatherStat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faWind, 
  faDroplet, 
  faEye, 
  faCloud, 
  faTemperatureHigh, 
  faMapPin, 
  faSun, 
  faCloudRain, 
  faCloudBolt, 
  faSnowflake, 
  faSmog 
} from '@fortawesome/free-solid-svg-icons'

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

const WeatherCard = ({ weather, unit, handleUnitChange }) => {
  const weatherTypes = weather.weather[0].main
  const selectedIcons = weatherIcons[weatherTypes]

  // Dynamic calculations for individual city times
  const getLocalTime = (timezoneOffset) => {
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utc + 1000 * timezoneOffset);
    return localTime.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="weather-card">
      <div className="weather-details">
        <div className="weather-left">
          <div className="location-container">
            <div className="city-title">
              <FontAwesomeIcon icon={faMapPin} className="pin-icon" />
              <h1>{weather.name}</h1>
              <span className="country-code">{weather.sys.country}</span>
            </div>
            <p className="local-time">{getLocalTime(weather.timezone)}</p>
          </div>

          <div className="condition-badge">
            <p>
              <FontAwesomeIcon icon={selectedIcons} />
              {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
            </p>
          </div>
        </div>

        <div className="weather-right">
          {/* Clear, static reading */}
          <div className="temp-container">
            <h1>
              {Math.round(weather.main.temp)}
              <span className="temp-scale">{unit === "metric" ? "°C" : "°F"}</span>
            </h1>
          </div>
          
          <span className="feels-like">
            Feels like {Math.round(weather.main.feels_like)} {unit === "metric" ? "°C" : "°F"}
          </span>

          <button className="unit-conversion-btn" onClick={handleUnitChange}>
            Switch to {unit === "metric" ? "°F" : "°C"}
          </button>
        </div>
      </div>

      <div className="weather-stats">
        <WeatherStat label="Humidity" value={`${weather.main.humidity} %`} icon={faDroplet} />
        <WeatherStat label="Wind" value={`${weather.wind.speed} m/s`} icon={faWind} />
        <WeatherStat label="Pressure" value={`${weather.main.pressure} hPa`} icon={faTemperatureHigh} />
        <WeatherStat label="Visibility" value={`${Math.round(weather.visibility / 1000)} km`} icon={faEye} />
        <WeatherStat label="Cloudiness" value={`${weather.clouds.all} %`} icon={faCloud} />
      </div>

      <div className="astronomy-stats">
        <div className="astro-item">
          <span className="astro-label">Sunrise</span>
          <span className="astro-value">
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="astro-item">
          <span className="astro-label">Sunset</span>
          <span className="astro-value">
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="astro-item">
          <span className="astro-label">High / Low</span>
          <span className="astro-value">
            {Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°
          </span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard