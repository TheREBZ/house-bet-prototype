
export type Match = {
id: number
league: string
time: string
homeTeam: string
awayTeam: string
homeLogo: string
awayLogo: string
homeOdds: string
drawOdds: string
awayOdds: string
status?: "LIVE" | "UPCOMING"
}

export const featuredMatches: Match[] = [
{
    id: 1,
    league: "Premier League",
    time: "Today · 17:30",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
    awayLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/363.png",
    homeOdds: "1.85",
    drawOdds: "3.60",
    awayOdds: "4.20",
    status: "UPCOMING",
},
{
    id: 2,
    league: "Premier League",
    time: "Today · 20:00",
    homeTeam: "Liverpool",
    awayTeam: "Man City",
    homeLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
    awayLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
    homeOdds: "2.45",
    drawOdds: "3.40",
    awayOdds: "2.65",
    status: "UPCOMING",
},
{
    id: 3,
    league: "Premier League",
    time: "Tomorrow · 16:00",
    homeTeam: "Man United",
    awayTeam: "Tottenham",
    homeLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
    awayLogo: "/logo/spurs.png",
    homeOdds: "2.10",
    drawOdds: "3.50",
    awayOdds: "3.10",
    status: "UPCOMING",
},
]

export const upcomingMatches = [
{
    id: 4,
    league: "La Liga",
    time: "Tomorrow · 20:00",
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    homeLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
    awayLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
},
{
    id: 5,
    league: "Serie A",
    time: "Saturday · 18:00",
    homeTeam: "AC Milan",
    awayTeam: "Inter Milan",
    homeLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/103.png",
    awayLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/108.png",
},
]

export const favouriteItems = [
{
    id: 1,
    name: "Premier League",
    type: "League",
    matches: "8 matches today",
    image: "/logo/epl.svg",
},
{
    id: 2,
    name: "Champions League",
    type: "League",
    matches: "4 matches today",
    image: "/logo/ucl.svg",
},
{
    id: 3,
    name: "Arsenal",
    type: "Team",
    matches: "Next match: Today",
    image: "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
},
{
    id: 4,
    name: "Real Madrid",
    type: "Team",
    matches: "Next match: Tomorrow",
    image: "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
},
]

export const yourMatches = [
    {
      id: 1,
      competition: "Premier League",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      homeLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
      awayLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/363.png",
      time: "Today · 17:30",
      score: null,
      status: "UPCOMING",
    },
    {
      id: 2,
      competition: "La Liga",
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      homeLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
      awayLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
      time: "Tomorrow · 20:00",
      score: null,
      status: "UPCOMING",
    },
    {
      id: 3,
      competition: "Serie A",
      homeTeam: "AC Milan",
      awayTeam: "Inter Milan",
      homeLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/103.png",
      awayLogo: "https://a.espncdn.com/i/teamlogos/soccer/500/108.png",
      time: "Yesterday · 19:45",
      score: "2 - 1",
      status: "FINISHED",
    },
  ]