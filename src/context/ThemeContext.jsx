import { createContext, useContext, useEffect, useState } from 'react'

// 1. Create the context.
const ThemeContext = createContext(null)

// Colour tokens for each temperature band. Keeping them in one place makes
// it obvious how a temperature maps to a theme.
const THEMES = {
  cool: {
    name: 'cool',
    label: 'Cool',
    icon: '❄️',
    bg: '#eef4fb',
    surface: '#ffffff',
    accent: '#2f6fed',
    accentSoft: '#dce9fd',
    border: '#c7dbf5',
    text: '#1c2733',
  },
  mild: {
    name: 'mild',
    label: 'Mild',
    icon: '🌿',
    bg: '#eef8f1',
    surface: '#ffffff',
    accent: '#2f9e58',
    accentSoft: '#dcf2e2',
    border: '#c8e8d1',
    text: '#1c2b21',
  },
  warm: {
    name: 'warm',
    label: 'Warm',
    icon: '🔆',
    bg: '#fff5e9',
    surface: '#ffffff',
    accent: '#e07b1a',
    accentSoft: '#fbe6c9',
    border: '#f4d7ab',
    text: '#332210',
  },
  hot: {
    name: 'hot',
    label: 'Hot',
    icon: '🔥',
    bg: '#fdeceb',
    surface: '#ffffff',
    accent: '#d8392b',
    accentSoft: '#f9d7d3',
    border: '#f2c1bc',
    text: '#331410',
  },
}

// Pure helper: temperature (°C) -> theme key.
// Below 20   -> cool
// 20 to 30   -> mild
// 31 to 40   -> warm
// Above 40   -> hot
function getThemeKeyForTemperature(temperature) {
  if (temperature < 20) return 'cool'
  if (temperature <= 30) return 'mild'
  if (temperature <= 40) return 'warm'
  return 'hot'
}

/**
 * ThemeProvider watches the temperature of the currently displayed city
 * (passed in as a prop from App) and keeps a theme object in state.
 * Every component in the tree can read that theme through useContext
 * instead of receiving it as a prop chain.
 */
export function ThemeProvider({ temperature, children }) {
  const [themeKey, setThemeKey] = useState(() => getThemeKeyForTemperature(temperature))

  // Whenever the displayed temperature changes, recompute which theme
  // should be active. This is the useEffect that ties useContext state
  // to the rest of the app's data.
  useEffect(() => {
    const nextThemeKey = getThemeKeyForTemperature(temperature)
    setThemeKey(nextThemeKey)
  }, [temperature])

  const value = {
    theme: THEMES[themeKey],
    themeKey,
  }

  return (
    <ThemeContext.Provider value={value}>
      {/* CSS variables are set once here and consumed everywhere via CSS,
          so the theme visibly affects the whole page, not one element. */}
      <div
        className="theme-root"
        style={{
          '--color-bg': value.theme.bg,
          '--color-surface': value.theme.surface,
          '--color-accent': value.theme.accent,
          '--color-accent-soft': value.theme.accentSoft,
          '--color-border': value.theme.border,
          '--color-text': value.theme.text,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

// Convenience hook so components just call useTheme() instead of
// importing useContext + ThemeContext everywhere.
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used inside a ThemeProvider')
  }
  return ctx
}

export default ThemeContext
