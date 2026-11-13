export type SportId =
  | "soccer"
  | "tennis"
  | "basketball"
  | "baseball"
  | "american-football"
  | "esports"

export type Odd = {
  label: string
  value: string
}
export type MatchDay = "Today" | "Tomorrow" | "Weekend"
export type LiveMatch = {
    id: number
    homeTeam: string
    awayTeam: string
    homeLogo?: string
    awayLogo?: string
    homeScore?: number 
    awayScore?: number
    clock: string 
    status?: "live" | "upcoming" 
    day?: string 
    odds: Odd[] | null 
    moreMarkets: number
}

export type LiveLeague = {
  id: string
  sport: SportId
  name: string
  flag?: string
  marketName: string
  favourite?: boolean
  matches: LiveMatch[]
}

const espn = (id: number) =>
  `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png`

const flag = (code: string) => `https://flagcdn.com/w40/${code}.png`

export const liveLeagues: LiveLeague[] = [
  {
    id: "premier-league",
    sport: "soccer",
    name: "Premier League",
    flag: flag("gb-eng"),
    marketName: "Match result",
    favourite: true,
    matches: [
      {
        id: 1,
        homeTeam: "Arsenal",
        awayTeam: "Brighton & Hove Albion",
        homeLogo: espn(359),
        awayLogo: espn(331),
        homeScore: 1,
        awayScore: 0,
        clock: "52'",
        odds: [
          { label: "Arsenal", value: "1.30" },
          { label: "Draw", value: "4.60" },
          { label: "Brighton", value: "11.00" },
        ],
        moreMarkets: 115,
      },
      {
        id: 2,
        homeTeam: "Aston Villa",
        awayTeam: "Fulham",
        homeLogo: espn(362),
        awayLogo: espn(370),
        homeScore: 0,
        awayScore: 0,
        clock: "HT",
        odds: [
          { label: "Aston Villa", value: "2.25" },
          { label: "Draw", value: "2.90" },
          { label: "Fulham", value: "3.60" },
        ],
        moreMarkets: 7,
      },
      {
        id: 3,
        homeTeam: "Newcastle United",
        awayTeam: "Everton",
        homeLogo: espn(361),
        awayLogo: espn(368),
        homeScore: 2,
        awayScore: 1,
        clock: "58'",
        odds: null,
        moreMarkets: 6,
      },
    ],
  },
  {
    id: "laliga",
    sport: "soccer",
    name: "LaLiga",
    flag: flag("es"),
    marketName: "Match result",
    matches: [
      {
        id: 4,
        homeTeam: "Atlético Madrid",
        awayTeam: "Sevilla",
        homeLogo: espn(1068),
        awayLogo: espn(243),
        homeScore: 1,
        awayScore: 0,
        clock: "37'",
        odds: null,
        moreMarkets: 8,
      },
    ],
  },
  {
    id: "serie-a",
    sport: "soccer",
    name: "Serie A",
    flag: flag("it"),
    marketName: "Match result",
    matches: [
      {
        id: 5,
        homeTeam: "Juventus",
        awayTeam: "Roma",
        homeLogo: espn(111),
        awayLogo: espn(104),
        homeScore: 1,
        awayScore: 1,
        clock: "49'",
        odds: [
          { label: "Juventus", value: "2.40" },
          { label: "Draw", value: "3.10" },
          { label: "Roma", value: "3.20" },
        ],
        moreMarkets: 6,
      },
    ],
  },
  {
    id: "bundesliga",
    sport: "soccer",
    name: "Bundesliga",
    flag: flag("de"),
    marketName: "Match result",
    matches: [
      {
        id: 6,
        homeTeam: "Bayer Leverkusen",
        awayTeam: "Borussia Dortmund",
        homeLogo: espn(131),
        awayLogo: espn(124),
        homeScore: 2,
        awayScore: 1,
        clock: "63'",
        odds: [
          { label: "Leverkusen", value: "1.55" },
          { label: "Draw", value: "4.10" },
          { label: "Dortmund", value: "5.50" },
        ],
        moreMarkets: 24,
      },
    ],
  },
  {
    id: "atp-paris",
    sport: "tennis",
    name: "ATP Paris Masters",
    flag: flag("fr"),
    marketName: "Match winner",
    matches: [
      {
        id: 7,
        homeTeam: "J. Sinner",
        awayTeam: "C. Alcaraz",
        homeScore: 4,
        awayScore: 3,
        clock: "Set 2",
        odds: [
          { label: "Sinner", value: "1.85" },
          { label: "Alcaraz", value: "1.95" },
        ],
        moreMarkets: 32,
      },
      {
        id: 8,
        homeTeam: "A. Zverev",
        awayTeam: "D. Medvedev",
        homeScore: 2,
        awayScore: 5,
        clock: "Set 1",
        odds: [
          { label: "Zverev", value: "3.20" },
          { label: "Medvedev", value: "1.32" },
        ],
        moreMarkets: 18,
      },
      {
        id: 9,
        homeTeam: "N. Djokovic",
        awayTeam: "T. Fritz",
        homeScore: 6,
        awayScore: 4,
        clock: "Set 3",
        odds: null,
        moreMarkets: 21,
      },
    ],
  },
  {
    id: "nba",
    sport: "basketball",
    name: "NBA",
    flag: flag("us"),
    marketName: "Winner",
    matches: [
      {
        id: 10,
        homeTeam: "Los Angeles Lakers",
        awayTeam: "Boston Celtics",
        homeLogo: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
        awayLogo: "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
        homeScore: 78,
        awayScore: 81,
        clock: "Q3 08:12",
        odds: [
          { label: "Lakers", value: "2.15" },
          { label: "Celtics", value: "1.70" },
        ],
        moreMarkets: 64,
      },
    ],
  },
  {
    id: "mlb",
    sport: "baseball",
    name: "MLB",
    flag: flag("us"),
    marketName: "Winner",
    matches: [
      {
        id: 11,
        homeTeam: "New York Yankees",
        awayTeam: "Los Angeles Dodgers",
        homeLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
        awayLogo: "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
        homeScore: 3,
        awayScore: 2,
        clock: "Top 6",
        odds: [
          { label: "Yankees", value: "1.90" },
          { label: "Dodgers", value: "1.90" },
        ],
        moreMarkets: 40,
      },
    ],
  },
  {
    id: "nfl",
    sport: "american-football",
    name: "NFL",
    flag: flag("us"),
    marketName: "Winner",
    matches: [
      {
        id: 12,
        homeTeam: "Kansas City Chiefs",
        awayTeam: "Buffalo Bills",
        homeLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png",
        awayLogo: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png",
        homeScore: 17,
        awayScore: 14,
        clock: "Q2 04:30",
        odds: [
          { label: "Chiefs", value: "1.75" },
          { label: "Bills", value: "2.10" },
        ],
        moreMarkets: 52,
      },
    ],
  },
  {
    id: "lec",
    sport: "esports",
    name: "League of Legends · LEC",
    marketName: "Match winner",
    matches: [
      {
        id: 13,
        homeTeam: "G2 Esports",
        awayTeam: "Fnatic",
        homeScore: 1,
        awayScore: 0,
        clock: "Map 2",
        odds: [
          { label: "G2", value: "1.60" },
          { label: "Fnatic", value: "2.30" },
        ],
        moreMarkets: 12,
      },
    ],
  },
]