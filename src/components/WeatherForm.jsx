import { useState } from 'react'

const CONDITIONS = ['Sunny', 'Cloudy', 'Rainy', 'Stormy']

const EMPTY_FORM = {
  city: '',
  temperature: '',
  condition: '',
  humidity: '',
  windSpeed: '',
}

// Pure validation function: takes the raw form values and returns an
// object of field -> error message. An empty object means "valid".
function validate(form) {
  const errors = {}

  const trimmedCity = form.city.trim()
  if (!trimmedCity) {
    errors.city = 'City name is required.'
  }

  if (form.temperature.trim() === '') {
    errors.temperature = 'Temperature is required.'
  } else if (Number.isNaN(Number(form.temperature))) {
    errors.temperature = 'Temperature must be a valid number.'
  }

  if (!form.condition) {
    errors.condition = 'Please select a condition.'
  } else if (!CONDITIONS.includes(form.condition)) {
    errors.condition = 'Condition must be Sunny, Cloudy, Rainy, or Stormy.'
  }

  if (form.humidity.trim() === '') {
    errors.humidity = 'Humidity is required.'
  } else {
    const humidityValue = Number(form.humidity)
    if (Number.isNaN(humidityValue) || humidityValue < 0 || humidityValue > 100) {
      errors.humidity = 'Humidity must be a number between 0 and 100.'
    }
  }

  if (form.windSpeed.trim() === '') {
    errors.windSpeed = 'Wind speed is required.'
  } else {
    const windValue = Number(form.windSpeed)
    if (Number.isNaN(windValue) || windValue < 0) {
      errors.windSpeed = 'Wind speed must be a non-negative number.'
    }
  }

  return errors
}

/**
 * WeatherForm — every field is a controlled component: its value comes
 * from state and every change goes through onChange.
 */
function WeatherForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return // Prevent submission when validation fails.
    }

    const newWeather = {
      city: form.city.trim(),
      temperature: Number(form.temperature),
      condition: form.condition,
      humidity: Number(form.humidity),
      windSpeed: Number(form.windSpeed),
    }

    onSubmit(newWeather)
    setForm(EMPTY_FORM) // Reset the form after a successful submission.
    setErrors({})
  }

  return (
    <section className="card">
      <h2 className="card__title">Add weather manually</h2>
      <form className="weather-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="city">City Name</label>
          <input
            id="city"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Guntur"
          />
          {errors.city && <p className="field__error">{errors.city}</p>}
        </div>

        <div className="field">
          <label htmlFor="temperature">Temperature (°C)</label>
          <input
            id="temperature"
            name="temperature"
            type="text"
            inputMode="decimal"
            value={form.temperature}
            onChange={handleChange}
            placeholder="e.g. 32"
          />
          {errors.temperature && <p className="field__error">{errors.temperature}</p>}
        </div>

        <div className="field">
          <label htmlFor="condition">Condition</label>
          <select id="condition" name="condition" value={form.condition} onChange={handleChange}>
            <option value="">Select a condition</option>
            {CONDITIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.condition && <p className="field__error">{errors.condition}</p>}
        </div>

        <div className="field">
          <label htmlFor="humidity">Humidity (%)</label>
          <input
            id="humidity"
            name="humidity"
            type="text"
            inputMode="decimal"
            value={form.humidity}
            onChange={handleChange}
            placeholder="e.g. 60"
          />
          {errors.humidity && <p className="field__error">{errors.humidity}</p>}
        </div>

        <div className="field">
          <label htmlFor="windSpeed">Wind Speed (km/h)</label>
          <input
            id="windSpeed"
            name="windSpeed"
            type="text"
            inputMode="decimal"
            value={form.windSpeed}
            onChange={handleChange}
            placeholder="e.g. 14"
          />
          {errors.windSpeed && <p className="field__error">{errors.windSpeed}</p>}
        </div>

        <button type="submit" className="btn btn--primary">
          Add Weather
        </button>
      </form>
    </section>
  )
}

export default WeatherForm
