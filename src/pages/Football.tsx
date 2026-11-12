import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, SlidersHorizontal, Trophy } from "lucide-react"
import SearchBar from "../components/SearchBar"
import SelectPill from "../components/SelectPill"
import LeagueGroup from "../components/LeagueGroup"
import {
  competitions,
  markets,
  isLiveMatch,
  sortMatches,
  toLiveMatch,
} from "../data/footballMatches"
import { LeagueListSkeleton } from "../components/Skeletons"
import { useSimulatedLoading } from "../hooks/useSimulatedLoading"
import type { MarketId } from "../data/footballMatches"
import "../styles/Live.css"
import "../styles/Football.css"

const UPCOMING_WINDOW_DAYS = 3 // "Live & Upcoming" = live now + kicking off within 3 days
const PREVIEW_COUNT = 3 // rows shown before "Show all"

type Tab = "live-upcoming" | "all"

const sportOptions = [
  { value: "football", label: "Soccer" },
  { value: "basketball", label: "Basketball" },
  { value: "tennis", label: "Tennis" },
  { value: "esports", label: "Esports" },
  { value: "volleyball", label: "Volleyball" },
]

const competitionOptions = [
  { value: "all", label: "All competitions" },
  ...competitions.map((c) => ({ value: c.id, label: c.name })),
]

const liveTotal = competitions.reduce(
  (sum, c) => sum + c.matches.filter(isLiveMatch).length,
  0,
)

const Football = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>("live-upcoming")
  const [market, setMarket] = useState<MarketId>("match-result")
  const [competition, setCompetition] = useState("all")
  const [query, setQuery] = useState("")
  const loading = useSimulatedLoading()

  const visibleLeagues = useMemo(() => {
    const q = query.trim().toLowerCase()
    const marketLabel = markets.find((m) => m.value === market)?.label ?? ""

    return competitions
      .filter((c) => competition === "all" || c.id === competition)
      .map((c) => {
        const leagueHit = q !== "" && c.name.toLowerCase().includes(q)

        const matches = sortMatches(c.matches)
          .filter(
            (m) =>
              tab === "all" ||
              isLiveMatch(m) ||
              (m.kickoff !== undefined && m.kickoff.day <= UPCOMING_WINDOW_DAYS),
          )
          .map((m) => toLiveMatch(m, market))
          .filter(
            (m) =>
              q === "" ||
              leagueHit ||
              m.homeTeam.toLowerCase().includes(q) ||
              m.awayTeam.toLowerCase().includes(q),
          )

        return {
          id: c.id,
          name: c.name,
          flag: c.flag,
          favourite: c.favourite,
          marketName: marketLabel,
          matches,
        }
      })
      .filter((league) => league.matches.length > 0)
  }, [tab, market, competition, query])

  return (
    <div className="live-page">
      {/* HEADER */}
      <div className="fb-header">
        <div className="fb-header-left">
          <button className="live-back" onClick={() => navigate("/")} aria-label="Back">
            <ChevronLeft size={18} />
          </button>

          <SelectPill
            label="Sport"
            value="football"
            options={sportOptions}
            onChange={(value) => navigate(`/sports/${value}`)}
          />

          <span className="fb-meta">
            {competitions.length} competitions · {liveTotal} live
          </span>
        </div>

        <div className="fb-market">
          <span className="fb-market-label">
            <SlidersHorizontal size={14} />
            Market
          </span>
          <SelectPill
            label="Market"
            value={market}
            options={markets}
            onChange={(value) => setMarket(value)}
          />
        </div>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      {/* TABS + COMPETITION FILTER */}
      <div className="fb-filters">
        <div className="fb-tabs">
          <button
            className={`fb-tab ${tab === "live-upcoming" ? "active" : ""}`}
            onClick={() => setTab("live-upcoming")}
            aria-pressed={tab === "live-upcoming"}
          >
            Live &amp; Upcoming
            <em>{liveTotal}</em>
          </button>

          <button
            className={`fb-tab ${tab === "all" ? "active" : ""}`}
            onClick={() => setTab("all")}
            aria-pressed={tab === "all"}
          >
            All Soccer
          </button>
        </div>

        <SelectPill
          label="Competition"
          value={competition}
          options={competitionOptions}
          onChange={(value) => setCompetition(value)}
          icon={<Trophy size={14} />}
        />
      </div>

           {/* LEAGUES */}
           {loading ? (
        <LeagueListSkeleton />
      ) : (
        <div className="live-leagues">
          {visibleLeagues.length > 0 ? (
            visibleLeagues.map((league) => (
              <LeagueGroup
                key={league.id}
                league={league}
                previewCount={PREVIEW_COUNT}
                liveDot={false}
              />
            ))
          ) : (
            <p className="live-empty">No matches found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Football