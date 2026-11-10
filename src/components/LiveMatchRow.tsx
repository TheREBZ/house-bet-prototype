
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight, Lock } from "lucide-react"
import type { LiveMatch } from "../data/liveMatches"
import TeamBadge from "./TeamBadge"

type LiveMatchRowProps = {
  match: LiveMatch
}

const LiveMatchRow = ({ match }: LiveMatchRowProps) => {
  const [selectedOdd, setSelectedOdd] = useState<string | null>(null)
  const navigate = useNavigate()

  // Matches are live unless they say otherwise
  const isLive = (match.status ?? "live") === "live"

  const toggleOdd = (label: string) =>
    setSelectedOdd((current) => (current === label ? null : label))

  const openMatch = () => navigate(`/match/${match.id}`)

  return (
    <div
      className="live-row live-grid"
      onClick={openMatch}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") openMatch()
      }}
    >
      <div className="live-status">
        {isLive ? (
          <>
            <span className="live-badge">LIVE</span>
            <span className="live-clock">{match.clock}</span>
          </>
        ) : (
          <>
            <span className="live-time">{match.clock}</span>
            {match.day && <span className="live-clock">{match.day}</span>}
          </>
        )}
      </div>

      <div className="live-teams">
        <div className="live-team">
          <TeamBadge src={match.homeLogo} name={match.homeTeam} />
          <span>{match.homeTeam}</span>
        </div>

        <div className="live-team">
          <TeamBadge src={match.awayLogo} name={match.awayTeam} />
          <span>{match.awayTeam}</span>
        </div>
      </div>

      {isLive ? (
        <div className="live-score" aria-label="Current score">
          <span>{match.homeScore}</span>
          <span>{match.awayScore}</span>
        </div>
      ) : (
        <div />
      )}

      {match.odds ? (
        <div
          className="live-odds"
          style={{
            gridTemplateColumns: `repeat(${match.odds.length}, minmax(0, 1fr))`,
          }}
        >
          {match.odds.map((odd) => (
            <button
              key={odd.label}
              className={`live-odd ${selectedOdd === odd.label ? "selected" : ""}`}
              onClick={(e) => {
                e.stopPropagation()
                toggleOdd(odd.label)
              }}
              aria-pressed={selectedOdd === odd.label}
            >
              <span>{odd.label}</span>
              <strong>{odd.value}</strong>
            </button>
          ))}
        </div>
      ) : (
        <div className="live-suspended">
          <Lock size={14} />
          <span>Suspended</span>
        </div>
      )}

      <button
        className="live-more"
        aria-label={`${match.moreMarkets} more markets`}
        onClick={(e) => e.stopPropagation()}
      >
        +{match.moreMarkets}
        <ChevronRight size={14} />
      </button>
    </div>
  )
}

export default LiveMatchRow
