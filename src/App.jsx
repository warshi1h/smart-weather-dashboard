import { useEffect, useState } from 'react'
import Header from './components/Header'
import WeatherForm from './components/WeatherForm'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import SavedEntries from './components/SavedEntries'
import { ThemeProvider } from './context/ThemeContext'
import weatherData from './data/weatherData'
import './App.css'

const UPDATE_INTERVAL_MS = 5000

function formatTimestamp(date) {
  return date.toLocaleTimeString()
}

function AppContent() {
  // The weather currently shown in the WeatherCard, and where it came from.
  const [currentWeather, setCurrentWeather] = useState(null)
  const [source, setSource] = useState(null) // 'manual' | 'dataset'
  const [lastUpdated, setLastUpdated] = useState(null)

  // History of weather the user has manually submitted through the form.
  const [manualEntries, setManualEntries] = useState([])

  // Automatic update: every 5 seconds, pick a random city from the local
  // dataset and display it. This is the useEffect + setInterval +
  // cleanup requirement.
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * weatherData.length)
      const randomCity = weatherData[randomIndex]

      setCurrentWeather(randomCity)
      setSource('dataset')
      setLastUpdated(formatTimestamp(new Date()))
    }, UPDATE_INTERVAL_MS)

    // Cleanup: without this, a new interval would be created every time
    // AppContent re-renders (e.g. after a form submission), stacking up
    // multiple timers that all fire at once and leak memory.
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array: set the interval up once, on mount.

  function handleFormSubmit(newWeather) {
    const entryWithId = { ...newWeather, id: Date.now() }

    setCurrentWeather(newWeather)
    setSource('manual')
    setLastUpdated(formatTimestamp(new Date()))
    setManualEntries((prev) => [entryWithId, ...prev])
  }

  function handleSelectFromSearch(weather) {
    setCurrentWeather(weather)
    setSource('dataset')
    setLastUpdated(formatTimestamp(new Date()))
  }

  function handleSelectSavedEntry(entry) {
    setCurrentWeather(entry)
    setSource('manual')
    setLastUpdated(formatTimestamp(new Date()))
  }

  function handleDeleteSavedEntry(id) {
    setManualEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  // The theme reacts to whatever temperature is currently on screen.
  // Fall back to a neutral 25°C (mild theme) before anything has loaded.
  const activeTemperature = currentWeather ? currentWeather.temperature : 25

  return (
    <ThemeProvider temperature={activeTemperature}>
      <div className="page">
        <Header />

        <main className="layout">
          <WeatherForm onSubmit={handleFormSubmit} />
          <SearchBar onSelectCity={handleSelectFromSearch} />

          <WeatherCard weather={currentWeather} lastUpdated={lastUpdated} source={source} />

          <SavedEntries
            entries={manualEntries}
            onSelect={handleSelectSavedEntry}
            onDelete={handleDeleteSavedEntry}
          />
        </main>

        <footer className="app-footer">
          <p>Weather refreshes automatically every 5 seconds from the local dataset.</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}

function App() {
  return <AppContent />
}

export default App
