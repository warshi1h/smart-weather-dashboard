const CONDITION_ICONS = {
  Sunny: '☀️',
  Cloudy: '☁️',
  Rainy: '🌧️',
  Stormy: '⛈️',
}

/**
 * WeatherCard is a "dumb" presentational component. It holds no state of
 * its own — everything it shows comes from props passed down by App,
 * which is what demonstrates parent -> child communication via props.
 */
function WeatherCard({ weather, lastUpdated, source }) {
  if (!weather) {
    return (
      <section className="card weather-card weather-card--empty">
        <p>No weather data available</p>
      </section>
    )
  }

  const { city, temperature, condition, humidity, windSpeed } = weather

  return (
    <section className="card weather-card">
      <div className="weather-card__top">
        <div>
          <h2 className="weather-card__city">{city}</h2>
          <p className="weather-card__source">
            {source === 'manual' ? 'From your submission' : 'From local dataset'}
          </p>
        </div>
        <span className="weather-card__icon" aria-hidden="true">
          {CONDITION_ICONS[condition] || '🌡️'}
        </span>
      </div>

      <p className="weather-card__temp">{temperature}°C</p>
      <p className="weather-card__condition">{condition}</p>

      <div className="weather-card__stats">
        <div className="stat">
          <span className="stat__label">Humidity</span>
          <span className="stat__value">{humidity}%</span>
        </div>
        <div className="stat">
          <span className="stat__label">Wind Speed</span>
          <span className="stat__value">{windSpeed} km/h</span>
        </div>
      </div>

      <p className="weather-card__timestamp">Last updated: {lastUpdated || '—'}</p>
    </section>
  )
}

export default WeatherCard
