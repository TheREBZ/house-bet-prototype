import { findFootballMatchByTeams } from "./footballMatches"
import { liveLeagues } from "./liveMatches"
import type { SportId } from "./liveMatches"
import { categories } from "./categoryMatches"

/* ---------- types ---------- */

export type BetStatus = "open" | "won" | "lost" | "void"

export type PlacedBet = {
  id: string
  placedAt: number // timestamp in ms
  matchName: string // "Arsenal vs Brighton & Hove Albion"
  market: string
  selection: string
  odds: number
  stake: number
  status: BetStatus
  sport: string
}

/* ---------- sports ---------- */

export const sportFilters = [
  "Football",
  "Basketball",
  "Tennis",
  "Baseball",
  "American football",
  "Esports",
  "Volleyball",
]

const sportLabels: Record<SportId, string> = {
  soccer: "Football",
  tennis: "Tennis",
  basketball: "Basketball",
  baseball: "Baseball",
  "american-football": "American football",
  esports: "Esports",
}

/* ---------- lookups by match name ---------- */

const splitMatchName = (matchName: string): [string, string] | undefined => {
  const parts = matchName.split(" vs ")
  if (parts.length !== 2) return undefined
  return [parts[0] ?? "", parts[1] ?? ""]
}

// Works out which sport a bet belongs to by finding the match in our data
export const getSportForMatch = (matchName: string): string => {
  const teams = splitMatchName(matchName)
  if (!teams) return "Football"
  const [home, away] = teams

  if (findFootballMatchByTeams(home, away)) return "Football"

  for (const league of liveLeagues) {
    if (league.matches.some((m) => m.homeTeam === home && m.awayTeam === away)) {
      return sportLabels[league.sport]
    }
  }

  for (const category of Object.values(categories)) {
    for (const league of category.leagues) {
      if (league.matches.some((m) => m.homeTeam === home && m.awayTeam === away)) {
        return category.title
      }
    }
  }

  return "Football"
}

// If the match is live right now, returns its clock and score
export const getLiveInfo = (matchName: string) => {
  const teams = splitMatchName(matchName)
  if (!teams) return undefined
  const [home, away] = teams

  for (const league of liveLeagues) {
    const match = league.matches.find(
      (m) =>
        m.homeTeam === home &&
        m.awayTeam === away &&
        (m.status ?? "live") === "live",
    )
    if (match) {
      return {
        clock: match.clock,
        score: `${match.homeScore ?? 0}–${match.awayScore ?? 0}`,
      }
    }
  }

  return undefined
}

// Link to the match page (only football matches have one)
export const getMatchPath = (matchName: string) => {
  const teams = splitMatchName(matchName)
  if (!teams) return undefined
  const match = findFootballMatchByTeams(teams[0], teams[1])
  return match ? `/match/${match.id}` : undefined
}

// Open = potential returns, won = payout, lost = nothing, void = stake back
export const getReturns = (bet: PlacedBet) => {
  switch (bet.status) {
    case "lost":
      return 0
    case "void":
      return bet.stake
    default:
      return bet.stake * bet.odds
  }
}

/* ---------- starter history ---------- */

const HOUR = 60 * 60 * 1000
const ago = (days: number, hours = 0) =>
  Date.now() - days * 24 * HOUR - hours * HOUR

export const seedBets: PlacedBet[] = [
  {
    id: "seed-1",
    placedAt: ago(0, 1),
    matchName: "Arsenal vs Brighton & Hove Albion",
    market: "Match result",
    selection: "Arsenal",
    odds: 1.8,
    stake: 20,
    status: "open",
    sport: "Football",
  },
  {
    id: "seed-2",
    placedAt: ago(2, 3),
    matchName: "Liverpool vs Manchester City",
    market: "Match result",
    selection: "Liverpool",
    odds: 2.45,
    stake: 25,
    status: "won",
    sport: "Football",
  },
  {
    id: "seed-3",
    placedAt: ago(3, 5),
    matchName: "Chelsea vs Tottenham Hotspur",
    market: "Over/Under 2.5 goals",
    selection: "Over 2.5",
    odds: 1.72,
    stake: 15,
    status: "won",
    sport: "Football",
  },
  {
    id: "seed-4",
    placedAt: ago(4, 2),
    matchName: "Los Angeles Lakers vs Boston Celtics",
    market: "Winner",
    selection: "Lakers",
    odds: 2.15,
    stake: 10,
    status: "lost",
    sport: "Basketball",
  },
  {
    id: "seed-5",
    placedAt: ago(6, 6),
    matchName: "J. Sinner vs C. Alcaraz",
    market: "Match winner",
    selection: "Sinner",
    odds: 1.85,
    stake: 30,
    status: "won",
    sport: "Tennis",
  },
  {
    id: "seed-6",
    placedAt: ago(9, 1),
    matchName: "Juventus vs Roma",
    market: "Match result",
    selection: "Draw",
    odds: 3.1,
    stake: 12,
    status: "lost",
    sport: "Football",
  },
  {
    id: "seed-7",
    placedAt: ago(12, 4),
    matchName: "New York Yankees vs Los Angeles Dodgers",
    market: "Winner",
    selection: "Yankees",
    odds: 1.9,
    stake: 20,
    status: "void",
    sport: "Baseball",
  },
  {
    id: "seed-8",
    placedAt: ago(20, 2),
    matchName: "Karmine Corp vs Team BDS",
    market: "Match winner",
    selection: "Karmine Corp",
    odds: 1.7,
    stake: 40,
    status: "lost",
    sport: "Esports",
  },
]