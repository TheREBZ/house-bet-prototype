import type { LiveMatch, Odd } from "./liveMatches"


type Team = {
  name: string
  short: string
  logo?: string
}

const espn = (id: number) =>
  `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png`

const team = (name: string, short: string, logo?: number | string): Team => ({
  name,
  short,
  logo: typeof logo === "number" ? espn(logo) : logo,
})

const teams = {
  // Premier League
  arsenal: team("Arsenal", "Arsenal", 359),
  brighton: team("Brighton & Hove Albion", "Brighton", 331),
  astonVilla: team("Aston Villa", "Aston Villa", 362),
  fulham: team("Fulham", "Fulham", 370),
  newcastle: team("Newcastle United", "Newcastle", 361),
  everton: team("Everton", "Everton", 368),
  liverpool: team("Liverpool", "Liverpool", 364),
  manCity: team("Manchester City", "Man City", 382),
  chelsea: team("Chelsea", "Chelsea", 363),
  tottenham: team("Tottenham Hotspur", "Tottenham", "/logo/spurs.png"),
  manUtd: team("Manchester United", "Man United", 360),
  westHam: team("West Ham United", "West Ham", 371),
  bournemouth: team("Bournemouth", "Bournemouth", 349),
  brentford: team("Brentford", "Brentford", 337),
  crystalPalace: team("Crystal Palace", "Palace", 384),
  wolves: team("Wolverhampton Wanderers", "Wolves", 380),
  forest: team("Nottingham Forest", "Forest", 393),

  // Spain + Europe
  realMadrid: team("Real Madrid", "Real Madrid", 86),
  barcelona: team("Barcelona", "Barcelona", 83),
  atletico: team("Atlético Madrid", "Atlético", 1068),
  sevilla: team("Sevilla", "Sevilla", 243),
  villarreal: team("Villarreal", "Villarreal", 102),
  realSociedad: team("Real Sociedad", "Sociedad", 89),
  athletic: team("Athletic Club", "Athletic", 93),
  valencia: team("Valencia", "Valencia", 94),
  betis: team("Real Betis", "Betis", 244),
  psg: team("Paris Saint-Germain", "PSG", 160),

  // Italy
  inter: team("Inter", "Inter", 110),
  juventus: team("Juventus", "Juventus", 111),
  roma: team("Roma", "Roma", 104),
  napoli: team("Napoli", "Napoli", 114),
  lazio: team("Lazio", "Lazio", 112),
  atalanta: team("Atalanta", "Atalanta", 105),
  milan: team("AC Milan", "AC Milan", 103),

  // Germany
  bayern: team("Bayern Munich", "Bayern", 132),
  dortmund: team("Borussia Dortmund", "Dortmund", 124),
  leverkusen: team("Bayer Leverkusen", "Leverkusen", 131),
  stuttgart: team("VfB Stuttgart", "Stuttgart", 134),
  frankfurt: team("Eintracht Frankfurt", "Frankfurt", 125),
} satisfies Record<string, Team>

type TeamKey = keyof typeof teams


export type MarketId = "match-result" | "double-chance" | "over-under" | "btts"

export const markets: { value: MarketId; label: string }[] = [
  { value: "match-result", label: "Match result" },
  { value: "double-chance", label: "Double chance" },
  { value: "over-under", label: "Over/Under 2.5 goals" },
  { value: "btts", label: "Both teams to score" },
]

export type FootballMatch = {
  id: number
  home: TeamKey
  away: TeamKey
  odds: [number, number, number] 
  goals: number 
  more: number 
  live?: { clock: string; score: [number, number] }
  kickoff?: { day: number; time: string } 
  suspended?: boolean
}

export type FootballCompetition = {
  id: string
  name: string
  flag: string
  favourite?: boolean
  matches: FootballMatch[]
}


const live = (
  clock: string,
  home: number,
  away: number,
): FootballMatch["live"] => ({ clock, score: [home, away] })

const ko = (day: number, time: string): FootballMatch["kickoff"] => ({
  day,
  time,
})

const flag = (code: string) => `https://flagcdn.com/w40/${code}.png`


export const competitions: FootballCompetition[] = [
  {
    id: "premier-league",
    name: "Premier League",
    flag: "/logo/epl.svg",
    favourite: true,
    matches: [
      { id: 1, home: "arsenal", away: "brighton", odds: [1.3, 4.6, 11], goals: 0.5, more: 115, live: live("52'", 1, 0) },
      { id: 2, home: "astonVilla", away: "fulham", odds: [2.25, 2.9, 3.6], goals: 0.35, more: 7, live: live("HT", 0, 0) },
      { id: 3, home: "newcastle", away: "everton", odds: [1.7, 3.8, 4.5], goals: 0.6, more: 6, live: live("58'", 2, 1), suspended: true },
      { id: 4, home: "liverpool", away: "manCity", odds: [2.45, 3.4, 2.65], goals: 0.7, more: 98, kickoff: ko(1, "17:30") },
      { id: 5, home: "chelsea", away: "tottenham", odds: [2.1, 3.5, 3.3], goals: 0.75, more: 91, kickoff: ko(1, "20:00") },
      { id: 6, home: "manUtd", away: "westHam", odds: [1.85, 3.6, 4.2], goals: 0.6, more: 76, kickoff: ko(2, "15:00") },
      { id: 7, home: "bournemouth", away: "brentford", odds: [2.6, 3.5, 2.55], goals: 0.65, more: 64, kickoff: ko(2, "15:00") },
      { id: 8, home: "crystalPalace", away: "wolves", odds: [1.95, 3.3, 4.1], goals: 0.5, more: 60, kickoff: ko(2, "17:30") },
      { id: 9, home: "forest", away: "everton", odds: [2.05, 3.3, 3.8], goals: 0.4, more: 58, kickoff: ko(3, "15:00") },
      { id: 10, home: "astonVilla", away: "manUtd", odds: [2.15, 3.5, 3.2], goals: 0.6, more: 72, kickoff: ko(3, "17:30") },
      // later fixtures
      { id: 11, home: "manCity", away: "arsenal", odds: [2.2, 3.6, 3.0], goals: 0.65, more: 120, kickoff: ko(6, "17:30") },
      { id: 12, home: "tottenham", away: "liverpool", odds: [3.1, 3.6, 2.15], goals: 0.75, more: 105, kickoff: ko(7, "16:00") },
    ],
  },
  {
    id: "champions-league",
    name: "Champions League",
    flag: "/logo/ucl.svg",
    matches: [
      { id: 20, home: "arsenal", away: "inter", odds: [1.95, 3.5, 4.0], goals: 0.55, more: 8, kickoff: ko(1, "20:00") },
      { id: 21, home: "realMadrid", away: "bayern", odds: [2.2, 3.7, 2.9], goals: 0.7, more: 9, kickoff: ko(1, "20:00") },
      { id: 22, home: "barcelona", away: "psg", odds: [2.05, 3.8, 3.3], goals: 0.75, more: 8, kickoff: ko(2, "20:00") },
      { id: 23, home: "atletico", away: "dortmund", odds: [1.9, 3.7, 4.0], goals: 0.5, more: 10, kickoff: ko(2, "20:00") },
      { id: 24, home: "bayern", away: "barcelona", odds: [2.5, 3.6, 2.6], goals: 0.8, more: 12, kickoff: ko(8, "20:00") },
    ],
  },
  {
    id: "laliga",
    name: "LaLiga",
    flag: flag("es"),
    matches: [
      { id: 30, home: "atletico", away: "sevilla", odds: [1.6, 3.8, 5.5], goals: 0.45, more: 8, live: live("37'", 1, 0), suspended: true },
      { id: 31, home: "villarreal", away: "realSociedad", odds: [2.15, 3.3, 3.4], goals: 0.5, more: 40, kickoff: ko(2, "18:30") },
      { id: 32, home: "athletic", away: "valencia", odds: [1.8, 3.4, 4.6], goals: 0.45, more: 38, kickoff: ko(2, "21:00") },
      { id: 33, home: "betis", away: "barcelona", odds: [4.2, 3.9, 1.75], goals: 0.7, more: 55, kickoff: ko(3, "20:00") },
      { id: 34, home: "realMadrid", away: "atletico", odds: [1.95, 3.5, 3.8], goals: 0.55, more: 90, kickoff: ko(7, "20:00") },
    ],
  },
  {
    id: "serie-a",
    name: "Serie A",
    flag: flag("it"),
    matches: [
      { id: 40, home: "juventus", away: "roma", odds: [2.4, 3.1, 3.2], goals: 0.4, more: 6, live: live("49'", 1, 1) },
      { id: 41, home: "napoli", away: "lazio", odds: [1.85, 3.5, 4.3], goals: 0.5, more: 44, kickoff: ko(2, "18:00") },
      { id: 42, home: "atalanta", away: "milan", odds: [2.3, 3.4, 3.05], goals: 0.65, more: 50, kickoff: ko(3, "20:45") },
      { id: 43, home: "inter", away: "juventus", odds: [2.0, 3.3, 3.8], goals: 0.5, more: 80, kickoff: ko(6, "20:45") },
    ],
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    flag: flag("de"),
    matches: [
      { id: 50, home: "leverkusen", away: "dortmund", odds: [1.55, 4.1, 5.5], goals: 0.8, more: 24, live: live("63'", 2, 1) },
      { id: 51, home: "bayern", away: "stuttgart", odds: [1.35, 5.2, 8.0], goals: 0.75, more: 52, kickoff: ko(2, "15:30") },
      { id: 52, home: "frankfurt", away: "leverkusen", odds: [3.1, 3.6, 2.15], goals: 0.7, more: 47, kickoff: ko(3, "17:30") },
      { id: 53, home: "dortmund", away: "bayern", odds: [3.4, 3.8, 1.95], goals: 0.8, more: 100, kickoff: ko(7, "18:30") },
    ],
  },
]


export const isLiveMatch = (m: FootballMatch) => m.live !== undefined

const kickoffKey = (m: FootballMatch) =>
  m.kickoff ? m.kickoff.day * 10000 + Number(m.kickoff.time.replace(":", "")) : 0

export const sortMatches = (matches: FootballMatch[]) =>
  [...matches].sort((a, b) => {
    const liveDiff = Number(isLiveMatch(b)) - Number(isLiveMatch(a))
    if (liveDiff !== 0) return liveDiff
    return kickoffKey(a) - kickoffKey(b)
  })

const dateLabel = (daysFromToday: number) => {
  const d = new Date()
  d.setDate(d.getDate() + daysFromToday)
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

const MARGIN = 0.94
const price = (probability: number) =>
  Math.max(1.01, MARGIN / probability).toFixed(2)

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

const buildOdds = (m: FootballMatch, market: MarketId): Odd[] => {
  const [h, d, a] = m.odds

  switch (market) {
    case "match-result":
      return [
        { label: teams[m.home].short, value: h.toFixed(2) },
        { label: "Draw", value: d.toFixed(2) },
        { label: teams[m.away].short, value: a.toFixed(2) },
      ]

    case "double-chance": {
      const total = 1 / h + 1 / d + 1 / a
      const pHome = 1 / h / total
      const pDraw = 1 / d / total
      const pAway = 1 / a / total
      return [
        { label: "1X", value: price(pHome + pDraw) },
        { label: "12", value: price(pHome + pAway) },
        { label: "X2", value: price(pDraw + pAway) },
      ]
    }

    case "over-under": {
      const over = clamp(0.36 + 0.34 * m.goals, 0.25, 0.8)
      return [
        { label: "Over 2.5", value: price(over) },
        { label: "Under 2.5", value: price(1 - over) },
      ]
    }

    case "btts": {
      const yes = clamp(0.4 + 0.3 * m.goals, 0.25, 0.8)
      return [
        { label: "Yes", value: price(yes) },
        { label: "No", value: price(1 - yes) },
      ]
    }
  }
}

export const toLiveMatch = (m: FootballMatch, market: MarketId): LiveMatch => {
  const home = teams[m.home]
  const away = teams[m.away]

  return {
    id: m.id,
    homeTeam: home.name,
    awayTeam: away.name,
    homeLogo: home.logo,
    awayLogo: away.logo,
    homeScore: m.live?.score[0],
    awayScore: m.live?.score[1],
    clock: m.live ? m.live.clock : (m.kickoff?.time ?? ""),
    status: m.live ? "live" : "upcoming",
    day: m.kickoff ? dateLabel(m.kickoff.day) : undefined,
    odds: m.suspended ? null : buildOdds(m, market),
    moreMarkets: m.more,
  }
}
export const getFootballMatchById = (id: number) => {
  for (const competition of competitions) {
    const match = competition.matches.find((m) => m.id === id)

    if (match) {
      return {
        competition,
        match,
        homeTeam: teams[match.home],
        awayTeam: teams[match.away],
      }
    }
  }

  return undefined
}

export const findFootballMatchByTeams = (homeName: string, awayName: string) => {
  for (const competition of competitions) {
    const match = competition.matches.find(
      (m) => teams[m.home].name === homeName && teams[m.away].name === awayName,
    )
    if (match) return match
  }
  return undefined
}