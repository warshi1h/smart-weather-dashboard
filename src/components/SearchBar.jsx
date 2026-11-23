import { useState } from 'react'
import weatherData from '../data/weatherData'

/**
 * SearchBar looks up a city inside the local, offline weatherData array.
 * The input is a controlled component; the search result is derived
 * state kept with useState so we can show a clear "not found" message.
 */
function SearchBar({ onSelectCity }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null) // 'found' object | 'not-found' | null
  const [hasSearched, setHasSearched] = useState(false)

  function handleChange(event) {
    setQuery(event.target.value)
    setHasSearched(false)
    setResult(null)
  }

  function handleSearch(event) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    const match = weatherData.find(
      (entry) => entry.city.toLowerCase() === trimmed.toLowerCase()
    )

    setResult(match || null)
    setHasSearched(true)
  }

  return (
    <section className="card">
      <h2 className="card__title">Search cities</h2>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search from the offline dataset, e.g. Tokyo"
          aria-label="Search cities"
        />
        <button type="submit" className="btn btn--secondary">
          Search
        </button>
      </form>

      {hasSearched && result && (
        <div className="search-result">
          <p>
            <strong>{result.city}</strong>: {result.temperature}°C, {result.condition}, humidity{' '}
            {result.humidity}%, wind {result.windSpeed} km/h
          </p>
          <button type="button" className="btn btn--ghost" onClick={() => onSelectCity(result)}>
            Show on dashboard
          </button>
        </div>
      )}

      {hasSearched && !result && <p className="search-result search-result--empty">City not found.</p>}
    </section>
  )
}

export default SearchBar
