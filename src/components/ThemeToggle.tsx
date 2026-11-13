import { Moon, Sun } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import "../styles/ThemeToggle.css"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDay = theme === "light"
  const label = isDay ? "Switch to night theme" : "Switch to day theme"

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {isDay ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

export default ThemeToggle