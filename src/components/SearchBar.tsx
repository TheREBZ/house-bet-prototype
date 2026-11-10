import { Search } from "lucide-react"
import "../styles/SearchBar.css"

type SearchBarProps = {
  value?: string
  onChange?: (value: string) => void
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="home-search">
      <Search size={20} className="search-icon" />

      <input
        type="search"
        placeholder="Search teams, players or leagues"
        aria-label="Search teams, players or leagues"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}

export default SearchBar