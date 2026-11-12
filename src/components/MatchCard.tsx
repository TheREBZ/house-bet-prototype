import type { Match } from "../data/matches"
import { makeSelectionId, useBetSlip } from "../context/BetSlipContext"
import "../styles/MatchCard.css"

type MatchCardProps = {
  match: Match
}

const MatchCard = ({ match }: MatchCardProps) => {
  const { selections, addSelection } = useBetSlip()

  const matchName = `${match.homeTeam} vs ${match.awayTeam}`
  const market = "Match result"

  const odds = [
    { label: "1", selection: match.homeTeam, value: match.homeOdds },
    { label: "X", selection: "Draw", value: match.drawOdds },
    { label: "2", selection: match.awayTeam, value: match.awayOdds },
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
          {odds.map((odd) => {
            const id = makeSelectionId(matchName, market, odd.selection)
            const selected = selections.some((item) => item.id === id)

            return (
              <button
                key={odd.label}
                className={`odd-button ${selected ? "selected" : ""}`}
                onClick={() =>
                  addSelection({
                    id,
                    matchId: match.id,
                    matchName,
                    market,
                    selection: odd.selection,
                    odds: Number(odd.value),
                    stake: "",
                  })
                }
                aria-pressed={selected}
              >
                <span>{odd.label}</span>
                <strong>{odd.value}</strong>
              </button>
            )
          })}
        </div>
      </div>
    </article>
  )
}

export default MatchCard