import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import SearchBar from "../components/SearchBar"
import LiveSportTabs from "../components/LiveSportTabs"
import type { SportFilter } from "../components/LiveSportTabs"
import LeagueGroup from "../components/LeagueGroup"
import { liveLeagues } from "../data/liveMatches"

import { LeagueListSkeleton } from "../components/Skeletons"
import { useSimulatedLoading } from "../hooks/useSimulatedLoading"
import "../styles/Live.css"

const Live = () => {
  const navigate = useNavigate()
  const [sport, setSport] = useState<SportFilter>("all")
  const [query, setQuery] = useState("")
  const loading = useSimulatedLoading()

  // Tab counts come from the data, so they never drift out of sync
  const counts = useMemo(() => {
    const result: Record<SportFilter, number> = {
      all: 0,
      soccer: 0,
      tennis: 0,
      basketball: 0,
      baseball: 0,
      "american-football": 0,
      esports: 0,
    }
    for (const league of liveLeagues) {
      result[league.sport] += league.matches.length
      result.all += league.matches.length
    }
    return result
  }, [])

  // Filter by sport tab first, then by the search text (teams or league)
  const visibleLeagues = useMemo(() => {
    const q = query.trim().toLowerCase()

    return liveLeagues
      .filter((league) => sport === "all" || league.sport === sport)
      .map((league) => {
        if (!q || league.name.toLowerCase().includes(q)) return league
        const matches = league.matches.filter(
          (m) =>
            m.homeTeam.toLowerCase().includes(q) ||
            m.awayTeam.toLowerCase().includes(q),
        )
        return { ...league, matches }
      })
      .filter((league) => league.matches.length > 0)
  }, [sport, query])

  return (
    <div className="live-page">
      <div className="live-header">
        <button className="live-back" onClick={() => navigate("/")} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h1 className="live-title">Live now</h1>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      <LiveSportTabs active={sport} counts={counts} onChange={setSport} />

      {loading ? (
        <LeagueListSkeleton />
      ) : (
        <div className="live-leagues">
          {visibleLeagues.length > 0 ? (
            visibleLeagues.map((league) => (
              <LeagueGroup key={league.id} league={league} />
            ))
          ) : (
            <p className="live-empty">No live matches found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Live