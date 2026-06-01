import React from 'react'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import ForecastRow from './components/ForecastRow'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'
import EmptyState from './components/EmptyState'

const App = () => {
  const [query, setQuery] = React.useState("")
  const [weather, setWeather] = React.useState(null)
  const [forecast, setForecast] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [unit, setUnit] = React.useState("metric")

  async function handleSearch() {
    if(query.trim() === ""){
      return
    }

    setLoading(true)
    setError(null)
    setWeather(null)
    setForecast([])

    try {
      const cityName = query.trim()
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`

      const currentResponse = await fetch(currentUrl)
      if(!currentResponse.ok){
        if(currentResponse.status === 404){
          throw new Error("City not found. Check the spelling and try again.");
        }
        if(currentResponse.status === 401){
          throw new Error("Invalid API key");
        }
        throw new Error(`Error: ${currentResponse.statusText}`);
      }

      const currentData = await currentResponse.json()

      // Current Coordinate
      const lat = currentData.coord.lat
      const lon = currentData.coord.lon

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
      const forecastResponse = await fetch(forecastUrl)
      if(!forecastResponse.ok){
        if(forecastResponse.status === 404){
          throw new Error("City not found. Check the spelling and try again.");
        }
        if(forecastResponse.status === 401){
          throw new Error("Invalid API key");
        }
        throw new Error(`Error: ${forecastResponse.statusText}`);
      }

      const forecastData = await forecastResponse.json()

      const filteredForecast = forecastData.list.filter((item) => {
        return item.dt_txt.includes("12:00:00")
      }).slice(0, 5)

      setWeather(currentData)
      setForecast(filteredForecast)
    } catch (error) {
      setError(`Error: ${error.message}`);
    }finally{
      setLoading(false)
    }
  }

  function handleQueryChange(value){
    setQuery(value)
  }

  function handleUnitChange() {
    setUnit((prevUnit) =>
      prevUnit === "metric"
        ? "imperial"
        : "metric"
    )
  }

  React.useEffect(() => {
    if (weather) {
      handleSearch()
    }
  }, [unit])
  
  return (
    <div className='app'>
      <div className="container">
        <header className="hero">
          <h1>WeatherScope</h1>
          <p>
            Real-time weather conditions and 5-day forecast
            for any city worldwide.
          </p>
          <SearchBar query={query} onSearch={handleSearch} onQueryChange = {handleQueryChange} />
        </header>
      </div>
      
      <main>
        {loading ? <LoadingState />
                :error ? <ErrorState message={error} />
                : weather
                ? <>
                  <WeatherCard weather={weather} unit = {unit} handleUnitChange={handleUnitChange} /> 
                  <ForecastRow forecast={forecast} />
                </> 
                : <EmptyState />
        }
        </main>
    </div>
  )
}

export default App