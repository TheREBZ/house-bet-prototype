import { useNavigate } from "react-router-dom"
import { ChevronRight, Lock } from "lucide-react"
import type { LiveMatch } from "../data/liveMatches"
import { findFootballMatchByTeams } from "../data/footballMatches"
import { makeSelectionId, useBetSlip } from "../context/BetSlipContext"
import TeamBadge from "./TeamBadge"

type LiveMatchRowProps = {
  match: LiveMatch
  marketName: string // e.g. "Match result", shown in the bet slip
}

const LiveMatchRow = ({ match, marketName }: LiveMatchRowProps) => {
  const navigate = useNavigate()
  const { selections, addSelection } = useBetSlip()

  // Matches are live unless they say otherwise
  const isLive = (match.status ?? "live") === "live"
  const matchName = `${match.homeTeam} vs ${match.awayTeam}`

  // Only football matches have a detail page for now
  const details = findFootballMatchByTeams(match.homeTeam, match.awayTeam)
  const openMatch = () => {
    if (details) navigate(`/match/${details.id}`)
  }

  const pickOdd = (selection: string, value: string) =>
    addSelection({
      id: makeSelectionId(matchName, marketName, selection),
      matchId: match.id,
      matchName,
      market: marketName,
      selection,
      odds: Number(value),
      stake: "",
    })

  return (
    <div
      className="live-row live-grid"
      style={{ cursor: details ? "pointer" : "default" }}
      onClick={openMatch}
      role={details ? "link" : undefined}
      tabIndex={details ? 0 : undefined}
      onKeyDown={(e) => {
        if (details && e.key === "Enter" && e.target === e.currentTarget) openMatch()
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
          {match.odds.map((odd) => {
            const selected = selections.some(
              (item) => item.id === makeSelectionId(matchName, marketName, odd.label),
            )

            return (
              <button
                key={odd.label}
                className={`live-odd ${selected ? "selected" : ""}`}
                onClick={(e) => {
                  e.stopPropagation()
                  pickOdd(odd.label, odd.value)
                }}
                aria-pressed={selected}
              >
                <span>{odd.label}</span>
                <strong>{odd.value}</strong>
              </button>
            )
          })}
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