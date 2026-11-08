import { Search } from "lucide-react"
import "../styles/SearchBar.css"

const SearchBar = () => {
  return (
    <div className="home-search">
      <Search size={20} className="search-icon" />

      <input
        type="search"
        placeholder="Search teams, players or leagues"
        aria-label="Search teams, players or leagues"
      />
    </div>
  )
}

export default SearchBar