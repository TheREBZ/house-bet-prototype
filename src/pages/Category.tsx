import { useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, Radio } from "lucide-react"
import SearchBar from "../components/SearchBar"
import LeagueGroup from "../components/LeagueGroup"
import { categories, isCategoryId } from "../data/categoryMatches"
import { liveLeagues } from "../data/liveMatches"
import type { MatchDay } from "../data/liveMatches"
import "../styles/Live.css"
import "../styles/Category.css"

type DayFilter = "All" | MatchDay

const dayFilters: DayFilter[] = ["All", "Today", "Tomorrow", "Weekend"]

const navTabs = [
  { label: "All Sports", to: "/" },
  { label: "Live", to: "/live" },
  { label: "Football", to: "/sports/football" },
  { label: "Basketball", to: "/sports/basketball" },
  { label: "Tennis", to: "/sports/tennis" },
  { label: "Esports", to: "/sports/esports" },
  { label: "Volleyball", to: "/sports/volleyball" },
]

const liveCount = liveLeagues.reduce((sum, l) => sum + l.matches.length, 0)

type CategoryContentProps = {
  category: string | undefined
}

const CategoryContent = ({ category }: CategoryContentProps) => {
  const navigate = useNavigate()
  const [day, setDay] = useState<DayFilter>("All")
  const [query, setQuery] = useState("")

  const config = isCategoryId(category) ? categories[category] : undefined

  const visibleLeagues = useMemo(() => {
    const q = query.trim().toLowerCase()

    return (config?.leagues ?? [])
      .map((league) => {
        const leagueHit = q !== "" && league.name.toLowerCase().includes(q)
        const matches = league.matches.filter(
          (m) =>
            (day === "All" || m.day === day) &&
            (q === "" ||
              leagueHit ||
              m.homeTeam.toLowerCase().includes(q) ||
              m.awayTeam.toLowerCase().includes(q)),
        )
        return { ...league, matches }
      })
      .filter((league) => league.matches.length > 0)
  }, [config, day, query])

  if (!config) {
    return (
      <div className="live-page">
        <p className="live-empty">That category doesn't exist.</p>
      </div>
    )
  }

  const total = visibleLeagues.reduce((sum, l) => sum + l.matches.length, 0)

  return (
    <div className="live-page">
      <div className="live-header">
        <button className="live-back" onClick={() => navigate("/")} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h1 className="live-title">{config.title}</h1>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      <nav className="live-tabs" aria-label="Sports">
        {navTabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className={`live-tab ${tab.to === `/sports/${config.id}` ? "active" : ""}`}
          >
            {tab.label === "Live" && <Radio size={14} />}
            <span>{tab.label}</span>
            {tab.label === "Live" && <em>{liveCount}</em>}
          </Link>
        ))}
      </nav>

      <div className="day-filter">
        <div className="day-chips">
          {dayFilters.map((d) => (
            <button
              key={d}
              className={`day-chip ${day === d ? "active" : ""}`}
              onClick={() => setDay(d)}
              aria-pressed={day === d}
            >
              {d}
            </button>
          ))}
        </div>
        <span className="category-total">
          {total} {total === 1 ? "match" : "matches"}
        </span>
      </div>

      <div className="live-leagues">
        {visibleLeagues.length > 0 ? (
          visibleLeagues.map((league) => (
            <LeagueGroup key={league.id} league={league} />
          ))
        ) : (
          <p className="live-empty">No matches found.</p>
        )}
      </div>
    </div>
  )
}

// The key resets the filters whenever you switch to a different category
const Category = () => {
  const { category } = useParams()
  return <CategoryContent key={category} category={category} />
}

export default Category