
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Star,
  Search,
} from "lucide-react"
import { getFootballMatchById } from "../data/footballMatches"
import TeamBadge from "../components/TeamBadge"
import { makeSelectionId, useBetSlip } from "../context/BetSlipContext"
import { MatchPageSkeleton } from "../components/Skeletons"
import { useSimulatedLoading } from "../hooks/useSimulatedLoading"
import "../styles/MatchPage.css"

type MarketOption = {
  label: string
  odds: string
}

type MarketSection = {
  title: string
  options: MarketOption[]
}

type MarketCategory = {
  id: string
  label: string
  count: number
  sections: MarketSection[]
}

const MatchPage = () => {
  const { id } = useParams()
  const matchData = getFootballMatchById(Number(id))

  const [activeCategory, setActiveCategory] = useState("popular")
  const [search, setSearch] = useState("")
  const { selections, addSelection } = useBetSlip()
  const [collapsedSections, setCollapsedSections] = useState<string[]>([])
  const [following, setFollowing] = useState(false)
  const [favourite, setFavourite] = useState(false)
  const loading = useSimulatedLoading(id)

  if (!matchData) {
    return (
      <div className="match-not-found">
        <h2>Match not found</h2>
        <p>We couldn't find the match you're looking for.</p>
        <Link to="/sports/football">Back to Football</Link>
      </div>
    )
  }
  if (loading) return <MatchPageSkeleton />

  const { competition, match, homeTeam, awayTeam } = matchData

  const isLive = Boolean(match.live)
  const homeScore = match.live?.score[0] ?? 0
  const awayScore = match.live?.score[1] ?? 0

  const categories: MarketCategory[] = [
    {
      id: "popular",
      label: "Popular",
      count: 10,
      sections: [
        {
          title: "Match result",
          options: [
            { label: homeTeam.short, odds: match.odds[0].toFixed(2) },
            { label: "Draw", odds: match.odds[1].toFixed(2) },
            { label: awayTeam.short, odds: match.odds[2].toFixed(2) },
          ],
        },
        {
          title: "Double chance",
          options: [
            { label: `${homeTeam.short} or Draw`, odds: "1.03" },
            { label: `${homeTeam.short} or ${awayTeam.short}`, odds: "1.18" },
            { label: `Draw or ${awayTeam.short}`, odds: "3.30" },
          ],
        },
        {
          title: "Total goals",
          options: [
            { label: "Over 2.5", odds: "2.73" },
            { label: "Under 2.5", odds: "1.44" },
          ],
        },
      ],
    },
    {
      id: "goalscorers",
      label: "Goalscorers",
      count: 9,
      sections: [
        {
          title: "Anytime goalscorer",
          options: [
            { label: "Bukayo Saka", odds: "2.40" },
            { label: "Kai Havertz", odds: "2.80" },
            { label: "João Pedro", odds: "3.20" },
            { label: "Danny Welbeck", odds: "3.60" },
          ],
        },
        {
          title: "First goalscorer",
          options: [
            { label: "Bukayo Saka", odds: "5.50" },
            { label: "Kai Havertz", odds: "6.00" },
            { label: "João Pedro", odds: "7.50" },
            { label: "No goalscorer", odds: "8.00" },
          ],
        },
        {
          title: "Last goalscorer",
          options: [
            { label: "Bukayo Saka", odds: "5.00" },
            { label: "Kai Havertz", odds: "5.80" },
            { label: "João Pedro", odds: "7.00" },
            { label: "No goalscorer", odds: "8.00" },
          ],
        },
      ],
    },
    {
      id: "goals",
      label: "Goals",
      count: 11,
      sections: [
        {
          title: "Total goals",
          options: [
            { label: "Over 1.5", odds: "1.35" },
            { label: "Over 2.5", odds: "2.73" },
            { label: "Over 3.5", odds: "4.20" },
            { label: "Under 2.5", odds: "1.44" },
          ],
        },
        {
          title: "Both teams to score",
          options: [
            { label: "Yes", odds: "2.10" },
            { label: "No", odds: "1.68" },
          ],
        },
        {
          title: "Team total goals",
          options: [
            { label: `${homeTeam.short} over 1.5`, odds: "1.85" },
            { label: `${awayTeam.short} over 0.5`, odds: "1.90" },
          ],
        },
      ],
    },
    {
      id: "players",
      label: "Players",
      count: 11,
      sections: [
        {
          title: "Player shots",
          options: [
            { label: "Bukayo Saka 2+ shots", odds: "1.75" },
            { label: "Kai Havertz 2+ shots", odds: "1.95" },
            { label: "João Pedro 2+ shots", odds: "2.10" },
          ],
        },
        {
          title: "Player shots on target",
          options: [
            { label: "Bukayo Saka 1+ on target", odds: "1.85" },
            { label: "Kai Havertz 1+ on target", odds: "2.20" },
            { label: "Danny Welbeck 1+ on target", odds: "2.50" },
          ],
        },
        {
          title: "Player assists",
          options: [
            { label: "Martin Ødegaard", odds: "3.50" },
            { label: "Bukayo Saka", odds: "4.00" },
          ],
        },
      ],
    },
    {
      id: "halves",
      label: "Halves",
      count: 8,
      sections: [
        {
          title: "Half-time result",
          options: [
            { label: homeTeam.short, odds: "2.10" },
            { label: "Draw", odds: "2.20" },
            { label: awayTeam.short, odds: "4.50" },
          ],
        },
        {
          title: "First-half goals",
          options: [
            { label: "Over 0.5", odds: "1.45" },
            { label: "Over 1.5", odds: "2.60" },
            { label: "Under 1.5", odds: "1.40" },
          ],
        },
        {
          title: "Second-half goals",
          options: [
            { label: "Over 0.5", odds: "1.35" },
            { label: "Over 1.5", odds: "2.30" },
          ],
        },
      ],
    },
    {
      id: "handicaps",
      label: "Handicaps",
      count: 5,
      sections: [
        {
          title: "Asian handicap",
          options: [
            { label: `${homeTeam.short} -0.5`, odds: "1.90" },
            { label: `${awayTeam.short} +0.5`, odds: "1.95" },
          ],
        },
        {
          title: "European handicap",
          options: [
            { label: `${homeTeam.short} -1`, odds: "2.40" },
            { label: "Draw -1", odds: "3.60" },
            { label: `${awayTeam.short} +1`, odds: "1.80" },
          ],
        },
      ],
    },
    {
      id: "corners",
      label: "Corners & cards",
      count: 14,
      sections: [
        {
          title: "Total corners",
          options: [
            { label: "Over 8.5", odds: "1.85" },
            { label: "Over 9.5", odds: "2.20" },
            { label: "Under 9.5", odds: "1.70" },
          ],
        },
        {
          title: "Total cards",
          options: [
            { label: "Over 2.5 cards", odds: "1.65" },
            { label: "Over 3.5 cards", odds: "2.15" },
            { label: "Under 3.5 cards", odds: "1.75" },
          ],
        },
      ],
    },
    {
      id: "minutes",
      label: "Minutes",
      count: 10,
      sections: [
        {
          title: "Goal time",
          options: [
            { label: "Goal before 30:00", odds: "2.40" },
            { label: "Goal between 30:00–60:00", odds: "2.10" },
            { label: "Goal after 60:00", odds: "1.90" },
          ],
        },
        {
          title: "Next goal",
          options: [
            { label: `${homeTeam.short} next goal`, odds: "2.10" },
            { label: `${awayTeam.short} next goal`, odds: "3.50" },
            { label: "No more goals", odds: "2.80" },
          ],
        },
      ],
    },
    {
      id: "specials",
      label: "Specials",
      count: 7,
      sections: [
        {
          title: "Winning margin",
          options: [
            { label: `${homeTeam.short} by 1`, odds: "3.50" },
            { label: `${homeTeam.short} by 2+`, odds: "4.20" },
            { label: `${awayTeam.short} by 1`, odds: "6.00" },
          ],
        },
        {
          title: "Clean sheet",
          options: [
            { label: `${homeTeam.short} clean sheet`, odds: "2.10" },
            { label: `${awayTeam.short} clean sheet`, odds: "5.00" },
          ],
        },
      ],
    },
    {
      id: "all",
      label: "All markets",
      count: 85,
      sections: [],
    },
  ]

  const allSections = categories
    .filter((category) => category.id !== "all")
    .flatMap((category) => category.sections)

  const selectedCategory =
    categories.find((category) => category.id === activeCategory) ?? categories[0]

    const sections =
    activeCategory === "all" ? allSections : selectedCategory.sections
  
  const query = search.trim().toLowerCase()
  
  const visibleSections = !query
    ? sections
    : sections
        .map((section) => ({
          ...section,
          options: section.options.filter((option) =>
            option.label.toLowerCase().includes(query),
          ),
        }))
        .filter(
          (section) =>
            section.title.toLowerCase().includes(query) ||
            section.options.length > 0,
        )

  const toggleOdd = (
    market: string,
    selection: string,
    odds: string
  ) => {
    addSelection({
      id: makeSelectionId(`${homeTeam.name} vs ${awayTeam.name}`, market, selection),
      matchId: match.id,
      matchName: `${homeTeam.name} vs ${awayTeam.name}`,
      market,
      selection,
      odds: Number(odds),
      stake: "",
    })
  }

  const toggleSection = (title: string) => {
    setCollapsedSections((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    )
  }

  return (
    <div className="match-page">
      <div className="match-breadcrumb">
        <Link to="/sports/football" className="match-back">
          <ChevronLeft size={20} />
        </Link>

        <div className="breadcrumb-select">
          <span>Soccer</span>
          <ChevronDown size={14} />
        </div>

        <div className="breadcrumb-select">
          <span>England</span>
          <ChevronDown size={14} />
        </div>

        <div className="breadcrumb-select">
          <span>{competition.name}</span>
          <ChevronDown size={14} />
        </div>

        <div className="breadcrumb-select breadcrumb-match">
          <span>
            {homeTeam.short} - {awayTeam.short}
          </span>
          <ChevronDown size={14} />
        </div>
      </div>

      <section className="match-hero">
        <button
          className={`match-favourite ${favourite ? "active" : ""}`}
          onClick={() => setFavourite((current) => !current)}
          aria-label="Add match to favourites"
        >
          <Star size={19} fill={favourite ? "currentColor" : "none"} />
        </button>

        <div className="match-team match-home">
          <TeamBadge src={homeTeam.logo} name={homeTeam.name} />
          <div className="match-team-info">
            <h2>{homeTeam.name}</h2>
            <button
              className={`match-follow ${following ? "following" : ""}`}
              onClick={() => setFollowing((current) => !current)}
            >
              <Star size={12} fill="currentColor" />
              {following ? "Following" : "Follow"}
            </button>
          </div>
        </div>

        <div className="match-scoreboard">
          <span className="match-competition">{competition.name}</span>

          {isLive ? (
            <>
              <div className="match-score">
                <strong>{homeScore}</strong>
                <span>–</span>
                <strong>{awayScore}</strong>
              </div>
              <div className="match-live-time">
                <span className="match-live-badge">● LIVE</span>
                <span>{match.live?.clock}</span>
              </div>
            </>
          ) : (
            <>
              <div className="match-upcoming-label">VS</div>
              <div className="match-kickoff">
                {match.kickoff?.time ?? "Upcoming"}
              </div>
            </>
          )}
        </div>

        <div className="match-team match-away">
          <div className="match-team-info">
            <h2>{awayTeam.name}</h2>
            <button
              className="match-follow"
              onClick={() => setFollowing((current) => !current)}
            >
              <Star size={12} />
              Follow
            </button>
          </div>
          <TeamBadge src={awayTeam.logo} name={awayTeam.name} />
        </div>
      </section>

      <div className="market-search">
        <Search size={18} />
        <input
          type="search"
          placeholder="Search markets or players"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="market-category-bar">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`market-category ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span>{category.label}</span>
            <span className="market-category-count">{category.count}</span>
          </button>
        ))}
      </div>

      <div className="market-sections">
        {visibleSections.length > 0 ? (
          visibleSections.map((section) => {
            const collapsed = collapsedSections.includes(section.title)

            return (
              <section className="market-section" key={section.title}>
                <button
                  className="market-section-heading"
                  onClick={() => toggleSection(section.title)}
                >
                  <span>{section.title}</span>
                  {collapsed ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronUp size={16} />
                  )}
                </button>

                {!collapsed && (
                  <div className="market-options">
                    {section.options.map((option) => {
                      const selectionId = makeSelectionId(
                        `${homeTeam.name} vs ${awayTeam.name}`,
                        section.title,
                        option.label,
                      )

                      const selected = selections.some(
                        (item) => item.id === selectionId
                      )

                      return (
                        <button
                          key={option.label}
                          className={`market-option ${
                            selected ? "selected" : ""
                          }`}
                          onClick={() =>
                            toggleOdd(section.title, option.label, option.odds)
                          }
                        >
                          <span>{option.label}</span>
                          <strong>{option.odds}</strong>
                        </button>
                      )
                    })}
                  </div>
                )}
              </section>
            )
          })
        ) : (
          <div className="market-empty">
            <p>No markets found.</p>
            <span>Try another search term.</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchPage
