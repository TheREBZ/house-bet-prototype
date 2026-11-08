
import { useState } from "react"
import type { Match } from "../data/matches"
import "../styles/MatchCard.css"

type MatchCardProps = {
  match: Match
}

const MatchCard = ({ match }: MatchCardProps) => {
  const [selectedOdd, setSelectedOdd] = useState<string | null>(null)

  const odds = [
    { label: "1", value: match.homeOdds },
    { label: "X", value: match.drawOdds },
    { label: "2", value: match.awayOdds },
  ]

  return (
    <article className="match-card">
      <div className="match-card-header">
        <span className="match-league">{match.league}</span>
        <span className="match-time">{match.time}</span>
      </div>

      <div className="match-card-body">
        <div className="match-teams">
          <div className="match-team">
            <img src={match.homeLogo} alt={`${match.homeTeam} badge`} />
            <span>{match.homeTeam}</span>
          </div>

          <div className="match-team">
            <img src={match.awayLogo} alt={`${match.awayTeam} badge`} />
            <span>{match.awayTeam}</span>
          </div>
        </div>

        <div className="match-odds">
          {odds.map((odd) => (
            <button
              key={odd.label}
              className={`odd-button ${
                selectedOdd === odd.label ? "selected" : ""
              }`}
              onClick={() => setSelectedOdd(odd.label)}
              aria-pressed={selectedOdd === odd.label}
            >
              <span>{odd.label}</span>
              <strong>{odd.value}</strong>
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

export default MatchCard
