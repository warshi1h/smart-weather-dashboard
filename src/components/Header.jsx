import { useTheme } from '../context/ThemeContext'

function Header() {
  const { theme } = useTheme()

  return (
    <header className="app-header">
      <div>
        <h1>🌤 Smart Weather Dashboard</h1>
        <p className="subtitle">Weather data is simulated locally — nothing is fetched from the internet.</p>
      </div>
      <span className="theme-pill">
        {theme.icon} {theme.label} theme
      </span>
    </header>
  )
}

export default Header
