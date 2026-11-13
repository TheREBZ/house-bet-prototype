import type { LiveLeague, LiveMatch, MatchDay, Odd } from "./liveMatches"

export type CategoryId =
  | "football"
  | "basketball"
  | "tennis"
  | "esports"
  | "volleyball"

export type CategoryLeague = Omit<LiveLeague, "sport">

export type Category = {
  id: CategoryId
  title: string
  leagues: CategoryLeague[]
}


const flag = (code: string) => `https://flagcdn.com/w40/${code}.png`
const soccer = (id: number) =>
  `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png`
const nba = (abbr: string) =>
  `https://a.espncdn.com/i/teamlogos/nba/500/${abbr}.png`

const threeWay = (
  home: string,
  away: string,
  h: string,
  d: string,
  a: string,
): Odd[] => [
  { label: home, value: h },
  { label: "Draw", value: d },
  { label: away, value: a },
]

const twoWay = (home: string, away: string, h: string, a: string): Odd[] => [
  { label: home, value: h },
  { label: away, value: a },
]

type Seed = {
  id: number
  day: MatchDay
  time: string
  home: string
  away: string
  odds: Odd[]
  more: number
  homeLogo?: string
  awayLogo?: string
}

const upcoming = (s: Seed): LiveMatch => ({
  id: s.id,
  homeTeam: s.home,
  awayTeam: s.away,
  homeLogo: s.homeLogo,
  awayLogo: s.awayLogo,
  clock: s.time,
  day: s.day,
  status: "upcoming",
  odds: s.odds,
  moreMarkets: s.more,
})

/* ---------- data ---------- */

export const categories: Record<CategoryId, Category> = {
  football: {
    id: "football",
    title: "Football",
    leagues: [
      {
        id: "premier-league",
        name: "Premier League",
        flag: "/logo/epl.svg",
        marketName: "Match result",
        favourite: true,
        matches: [
          upcoming({
            id: 1, day: "Today", time: "17:30",
            home: "Arsenal", away: "Chelsea",
            homeLogo: soccer(359), awayLogo: soccer(363),
            odds: threeWay("Arsenal", "Chelsea", "1.85", "3.60", "4.20"),
            more: 112,
          }),
          upcoming({
            id: 2, day: "Today", time: "20:00",
            home: "Liverpool", away: "Man City",
            homeLogo: soccer(364), awayLogo: soccer(382),
            odds: threeWay("Liverpool", "Man City", "2.45", "3.40", "2.65"),
            more: 98,
          }),
          upcoming({
            id: 3, day: "Tomorrow", time: "16:00",
            home: "Man United", away: "Tottenham",
            homeLogo: soccer(360), awayLogo: "/logo/spurs.png",
            odds: threeWay("Man United", "Tottenham", "2.10", "3.50", "3.10"),
            more: 87,
          }),
          upcoming({
            id: 4, day: "Weekend", time: "15:00",
            home: "Newcastle", away: "Aston Villa",
            homeLogo: soccer(361), awayLogo: soccer(362),
            odds: threeWay("Newcastle", "Aston Villa", "2.00", "3.40", "3.50"),
            more: 74,
          }),
        ],
      },
      {
        id: "champions-league",
        name: "Champions League",
        flag: "/logo/ucl.svg",
        marketName: "Match result",
        matches: [
          upcoming({
            id: 5, day: "Today", time: "20:00",
            home: "Bayern Munich", away: "PSG",
            homeLogo: soccer(132), awayLogo: soccer(160),
            odds: threeWay("Bayern", "PSG", "2.30", "3.60", "2.90"),
            more: 130,
          }),
          upcoming({
            id: 6, day: "Today", time: "20:00",
            home: "Inter Milan", away: "Barcelona",
            homeLogo: soccer(108), awayLogo: soccer(83),
            odds: threeWay("Inter", "Barcelona", "3.10", "3.40", "2.25"),
            more: 126,
          }),
          upcoming({
            id: 7, day: "Tomorrow", time: "20:00",
            home: "Atlético Madrid", away: "Borussia Dortmund",
            homeLogo: soccer(1068), awayLogo: soccer(124),
            odds: threeWay("Atlético", "Dortmund", "1.90", "3.70", "4.00"),
            more: 101,
          }),
        ],
      },
      {
        id: "laliga",
        name: "LaLiga",
        flag: flag("es"),
        marketName: "Match result",
        matches: [
          upcoming({
            id: 8, day: "Tomorrow", time: "20:00",
            home: "Barcelona", away: "Real Madrid",
            homeLogo: soccer(83), awayLogo: soccer(86),
            odds: threeWay("Barcelona", "Real Madrid", "2.20", "3.60", "3.00"),
            more: 140,
          }),
          upcoming({
            id: 9, day: "Weekend", time: "18:00",
            home: "Atlético Madrid", away: "Sevilla",
            homeLogo: soccer(1068), awayLogo: soccer(243),
            odds: threeWay("Atlético", "Sevilla", "1.75", "3.70", "5.00"),
            more: 64,
          }),
        ],
      },
      {
        id: "serie-a",
        name: "Serie A",
        flag: flag("it"),
        marketName: "Match result",
        matches: [
          upcoming({
            id: 10, day: "Weekend", time: "18:00",
            home: "AC Milan", away: "Inter Milan",
            homeLogo: soccer(103), awayLogo: soccer(108),
            odds: threeWay("AC Milan", "Inter", "2.70", "3.20", "2.65"),
            more: 92,
          }),
          upcoming({
            id: 11, day: "Weekend", time: "20:45",
            home: "Juventus", away: "Roma",
            homeLogo: soccer(111), awayLogo: soccer(104),
            odds: threeWay("Juventus", "Roma", "2.05", "3.20", "3.80"),
            more: 70,
          }),
        ],
      },
    ],
  },

  basketball: {
    id: "basketball",
    title: "Basketball",
    leagues: [
      {
        id: "nba",
        name: "NBA",
        flag: flag("us"),
        marketName: "Winner",
        favourite: true,
        matches: [
          upcoming({
            id: 20, day: "Today", time: "19:30",
            home: "Los Angeles Lakers", away: "Golden State Warriors",
            homeLogo: nba("lal"), awayLogo: nba("gs"),
            odds: twoWay("Lakers", "Warriors", "2.05", "1.78"),
            more: 68,
          }),
          upcoming({
            id: 21, day: "Today", time: "22:00",
            home: "Denver Nuggets", away: "Phoenix Suns",
            homeLogo: nba("den"), awayLogo: nba("phx"),
            odds: twoWay("Nuggets", "Suns", "1.55", "2.45"),
            more: 61,
          }),
          upcoming({
            id: 22, day: "Tomorrow", time: "19:00",
            home: "Boston Celtics", away: "New York Knicks",
            homeLogo: nba("bos"), awayLogo: nba("ny"),
            odds: twoWay("Celtics", "Knicks", "1.60", "2.30"),
            more: 66,
          }),
          upcoming({
            id: 23, day: "Weekend", time: "20:30",
            home: "Milwaukee Bucks", away: "Miami Heat",
            homeLogo: nba("mil"), awayLogo: nba("mia"),
            odds: twoWay("Bucks", "Heat", "1.72", "2.10"),
            more: 59,
          }),
        ],
      },
      {
        id: "euroleague",
        name: "EuroLeague",
        flag: flag("eu"),
        marketName: "Winner",
        matches: [
          upcoming({
            id: 24, day: "Today", time: "18:00",
            home: "Fenerbahçe", away: "Anadolu Efes",
            odds: twoWay("Fenerbahçe", "Efes", "1.65", "2.25"),
            more: 34,
          }),
          upcoming({
            id: 25, day: "Tomorrow", time: "20:30",
            home: "Real Madrid", away: "Barcelona",
            odds: twoWay("Real Madrid", "Barcelona", "1.80", "2.00"),
            more: 38,
          }),
          upcoming({
            id: 26, day: "Weekend", time: "19:00",
            home: "Olympiacos", away: "Panathinaikos",
            odds: twoWay("Olympiacos", "Panathinaikos", "2.10", "1.72"),
            more: 31,
          }),
        ],
      },
    ],
  },

  tennis: {
    id: "tennis",
    title: "Tennis",
    leagues: [
      {
        id: "atp-paris",
        name: "ATP Paris Masters",
        flag: flag("fr"),
        marketName: "Match winner",
        favourite: true,
        matches: [
          upcoming({
            id: 30, day: "Today", time: "14:00",
            home: "H. Rune", away: "C. Ruud",
            odds: twoWay("Rune", "Ruud", "1.95", "1.85"),
            more: 28,
          }),
          upcoming({
            id: 31, day: "Today", time: "16:30",
            home: "A. de Minaur", away: "J. Draper",
            odds: twoWay("de Minaur", "Draper", "1.80", "2.00"),
            more: 26,
          }),
          upcoming({
            id: 32, day: "Tomorrow", time: "13:00",
            home: "S. Tsitsipas", away: "A. Rublev",
            odds: twoWay("Tsitsipas", "Rublev", "2.20", "1.65"),
            more: 27,
          }),
          upcoming({
            id: 33, day: "Weekend", time: "15:00",
            home: "J. Sinner", away: "C. Alcaraz",
            odds: twoWay("Sinner", "Alcaraz", "1.85", "1.95"),
            more: 40,
          }),
        ],
      },
      {
        id: "wta-finals",
        name: "WTA Finals",
        marketName: "Match winner",
        matches: [
          upcoming({
            id: 34, day: "Today", time: "18:00",
            home: "I. Swiatek", away: "A. Sabalenka",
            odds: twoWay("Swiatek", "Sabalenka", "2.05", "1.75"),
            more: 30,
          }),
          upcoming({
            id: 35, day: "Tomorrow", time: "15:00",
            home: "C. Gauff", away: "E. Rybakina",
            odds: twoWay("Gauff", "Rybakina", "1.70", "2.15"),
            more: 29,
          }),
          upcoming({
            id: 36, day: "Weekend", time: "14:00",
            home: "J. Pegula", away: "M. Keys",
            odds: twoWay("Pegula", "Keys", "1.90", "1.90"),
            more: 24,
          }),
        ],
      },
    ],
  },

  esports: {
    id: "esports",
    title: "Esports",
    leagues: [
      {
        id: "cs2-iem",
        name: "Counter-Strike 2 · IEM",
        marketName: "Match winner",
        favourite: true,
        matches: [
          upcoming({
            id: 40, day: "Today", time: "19:00",
            home: "NAVI", away: "FaZe Clan",
            odds: twoWay("NAVI", "FaZe", "1.85", "1.95"),
            more: 16,
          }),
          upcoming({
            id: 41, day: "Tomorrow", time: "16:00",
            home: "Team Vitality", away: "Team Spirit",
            odds: twoWay("Vitality", "Spirit", "1.60", "2.30"),
            more: 14,
          }),
          upcoming({
            id: 42, day: "Weekend", time: "17:00",
            home: "G2 Esports", away: "MOUZ",
            odds: twoWay("G2", "MOUZ", "2.00", "1.80"),
            more: 15,
          }),
        ],
      },
      {
        id: "lec",
        name: "League of Legends · LEC",
        marketName: "Match winner",
        matches: [
          upcoming({
            id: 43, day: "Today", time: "17:00",
            home: "Karmine Corp", away: "Team BDS",
            odds: twoWay("Karmine Corp", "BDS", "1.70", "2.15"),
            more: 12,
          }),
          upcoming({
            id: 44, day: "Tomorrow", time: "18:00",
            home: "G2 Esports", away: "Team Vitality",
            odds: twoWay("G2", "Vitality", "1.55", "2.45"),
            more: 12,
          }),
        ],
      },
      {
        id: "vct",
        name: "Valorant · VCT",
        marketName: "Match winner",
        matches: [
          upcoming({
            id: 45, day: "Today", time: "20:00",
            home: "Sentinels", away: "Fnatic",
            odds: twoWay("Sentinels", "Fnatic", "1.90", "1.90"),
            more: 10,
          }),
          upcoming({
            id: 46, day: "Weekend", time: "18:00",
            home: "Team Heretics", away: "Paper Rex",
            odds: twoWay("Heretics", "Paper Rex", "2.25", "1.62"),
            more: 10,
          }),
        ],
      },
    ],
  },

  volleyball: {
    id: "volleyball",
    title: "Volleyball",
    leagues: [
      {
        id: "superlega",
        name: "SuperLega",
        flag: flag("it"),
        marketName: "Match winner",
        favourite: true,
        matches: [
          upcoming({
            id: 50, day: "Today", time: "18:30",
            home: "Perugia", away: "Trento",
            odds: twoWay("Perugia", "Trento", "1.65", "2.20"),
            more: 18,
          }),
          upcoming({
            id: 51, day: "Tomorrow", time: "20:30",
            home: "Civitanova", away: "Modena",
            odds: twoWay("Civitanova", "Modena", "1.90", "1.90"),
            more: 17,
          }),
          upcoming({
            id: 52, day: "Weekend", time: "17:00",
            home: "Piacenza", away: "Verona",
            odds: twoWay("Piacenza", "Verona", "2.30", "1.60"),
            more: 16,
          }),
        ],
      },
      {
        id: "superliga-brazil",
        name: "Superliga",
        flag: flag("br"),
        marketName: "Match winner",
        matches: [
          upcoming({
            id: 53, day: "Tomorrow", time: "21:00",
            home: "Sada Cruzeiro", away: "Minas",
            odds: twoWay("Sada Cruzeiro", "Minas", "1.55", "2.45"),
            more: 15,
          }),
          upcoming({
            id: 54, day: "Weekend", time: "19:30",
            home: "Praia Clube", away: "Sesc RJ",
            odds: twoWay("Praia Clube", "Sesc RJ", "2.00", "1.80"),
            more: 15,
          }),
        ],
      },
      {
        id: "sultanlar",
        name: "Sultanlar Ligi",
        flag: flag("tr"),
        marketName: "Match winner",
        matches: [
          upcoming({
            id: 55, day: "Today", time: "17:00",
            home: "VakıfBank", away: "Fenerbahçe",
            odds: twoWay("VakıfBank", "Fenerbahçe", "1.60", "2.35"),
            more: 14,
          }),
          upcoming({
            id: 56, day: "Tomorrow", time: "17:30",
            home: "Eczacıbaşı", away: "Galatasaray",
            odds: twoWay("Eczacıbaşı", "Galatasaray", "1.45", "2.75"),
            more: 14,
          }),
        ],
      },
    ],
  },
}

export const isCategoryId = (value: string | undefined): value is CategoryId =>
  value !== undefined && Object.prototype.hasOwnProperty.call(categories, value)