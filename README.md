# Smart Weather Dashboard

A fully offline React weather dashboard built with Vite. All weather data is
a local, static array — no network requests are made anywhere in the app.

## Features
- Controlled weather form with per-field state
- Client-side input validation with inline error messages
- Dynamic weather card driven entirely by props from the parent
- Automatic random-city weather updates every 5 seconds (`setInterval` inside
  `useEffect`, with proper cleanup)
- "Last updated" timestamp
- `ThemeContext` (Context API) that recomputes the app's colour theme
  whenever the displayed temperature changes
- Search box over the local dataset (case-insensitive, with a
  "City not found" message)
- Delete action for manually submitted weather entries

## React Concepts Demonstrated
- `useState` — form fields, validation errors, current weather, search
  query/result, saved entries, theme state
- `useEffect` — the 5-second auto-update interval (with cleanup) and the
  theme recalculation whenever temperature changes
- `useContext` / Context API — `ThemeContext` + `ThemeProvider`, consumed
  through a `useTheme()` hook
- Props — `App` passes weather data down to `WeatherCard`, `SavedEntries`,
  etc.
- Controlled components — every form input has `value` + `onChange`
- Conditional rendering — "No weather data available", validation errors,
  search results, saved-entries list
- Component-based architecture — `Header`, `WeatherForm`, `SearchBar`,
  `WeatherCard`, `SavedEntries`, `ThemeContext`

## Project Structure
```
src/
  components/
    Header.jsx
    WeatherForm.jsx
    WeatherCard.jsx
    SearchBar.jsx
    SavedEntries.jsx
  context/
    ThemeContext.jsx
  data/
    weatherData.js
  App.jsx
  App.css
  main.jsx
  index.css
index.html
vite.config.js
package.json
```

## How to Run

```
npm install
npm run dev
```

## Build

```
npm run build
```

## Note on offline data
`src/data/weatherData.js` contains a fixed list of cities (Delhi, Mumbai,
Hyderabad, Bengaluru, Chennai, Kolkata, Pune, Jaipur, London, New York,
Tokyo) with realistic temperature/condition/humidity/wind values. This is
the only data source the app uses — for the auto-updating card, the search
box, and the theme calculation.
