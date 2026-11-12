import { useState } from "react"
import { ChevronRight, Star } from "lucide-react"
import type { LiveLeague } from "../data/liveMatches"
import LiveMatchRow from "./LiveMatchRow"

type LeagueGroupProps = {
  league: Omit<LiveLeague, "sport">
  previewCount?: number 
  liveDot?: boolean
}

const LeagueGroup = ({ league, previewCount, liveDot = true }: LeagueGroupProps) => {
  const [isFavourite, setIsFavourite] = useState(Boolean(league.favourite))
  const [expanded, setExpanded] = useState(false)
  const count = league.matches.length
  const hasLive = league.matches.some((m) => (m.status ?? "live") === "live")

  const collapsible = previewCount !== undefined && count > previewCount
  const shownMatches =
    collapsible && !expanded ? league.matches.slice(0, previewCount) : league.matches

  return (
    <section className="league-card">
      <header className="league-header live-grid">
        <div className="league-title">
          {league.flag && <img className="league-flag" src={league.flag} alt="" />}
          {liveDot && hasLive && <span className="league-live-dot" aria-hidden="true" />}
          <h2>{league.name}</h2>
          <small>
            {count} {count === 1 ? "match" : "matches"}
          </small>
          <button
            className={`league-star ${isFavourite ? "active" : ""}`}
            onClick={() => setIsFavourite((v) => !v)}
            aria-pressed={isFavourite}
            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          >
            <Star size={15} fill={isFavourite ? "currentColor" : "none"} />
          </button>
        </div>

        <span className="league-market">{league.marketName}</span>

        {previewCount === undefined || collapsible ? (
          <button
            className={`league-view-all ${expanded ? "open" : ""}`}
            onClick={() => collapsible && setExpanded((v) => !v)}
            aria-expanded={collapsible ? expanded : undefined}
          >
            {collapsible ? (expanded ? "Show less" : `Show all ${count}`) : "View all"}
            <ChevronRight size={14} />
          </button>
        ) : (
          <span />
        )}
      </header>

      {shownMatches.map((match) => (
        <LiveMatchRow key={match.id} match={match} marketName={league.marketName} />
      ))}
    </section>
  )
}

export default LeagueGroup