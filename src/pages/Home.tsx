import MatchCard from "../components/MatchCard"
import {
  featuredMatches,
  upcomingMatches,
  favouriteItems,
  yourMatches,
} from "../data/matches"
import SearchBar from "../components/SearchBar"
import "../styles/Home.css"
import { Radio } from "lucide-react"
import { useNavigate } from "react-router-dom"

const sports = [
  "All Sports",
  "Live",
  "Football",
  "Basketball",
  "Tennis",
  "Esports",
  "Volleyball",
]

// NEW: where each tab goes ("All Sports" is this page, so it has no entry)
const sportRoutes: Record<string, string> = {
  Live: "/live",
  Football: "/sports/football",
  Basketball: "/sports/basketball",
  Tennis: "/sports/tennis",
  Esports: "/sports/esports",
  Volleyball: "/sports/volleyball",
}

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <SearchBar />

      <nav className="sports-nav">
        {sports.map((sport) => (
          <button
            key={sport}
            onClick={() => {
              const path = sportRoutes[sport] // CHANGED
              if (path) navigate(path)
            }}
            className={`sport-tab ${sport === "All Sports" ? "active" : ""} ${
              sport === "Live" ? "live-tab" : ""
            }`}
          >
            {sport === "Live" && <Radio size={15} />}
            {sport}
            {sport === "Live" && <span className="live-count">13</span>}
          </button>
        ))}
      </nav>

      <div className="home-content">
        {/* FAVOURITES */}
        <section className="home-section">
          <div className="section-heading">
            <h2>Favourites</h2>
            <button className="section-link">Edit</button>
          </div>

          <div className="favourite-list">
            {favouriteItems.map((item) => (
              <div className="favourite-item" key={item.id}>
                <div className="favourite-icon">
                  <img src={item.image} alt={`${item.name} logo`} />
                </div>

                <div className="favourite-info">
                  <strong>{item.name}</strong>
                  <small>{item.matches}</small>
                </div>

                <span className="favourite-type">{item.type}</span>
              </div>
            ))}
          </div>
        </section>

        {/* YOUR MATCHES */}
        <section className="home-section">
          <div className="section-heading">
            <h2>Your Matches</h2>
            <button className="section-link">View all</button>
          </div>

          <div className="your-matches-list">
            {yourMatches.map((match) => (
              <div className="your-match-item" key={match.id}>
                <div className="your-match-info">
                  <span>{match.competition}</span>
                  <small>{match.time}</small>
                </div>

                <div className="your-match-teams">
                  <div>
                    <img src={match.homeLogo} alt="" />
                    <span>{match.homeTeam}</span>
                  </div>

                  <div>
                    <img src={match.awayLogo} alt="" />
                    <span>{match.awayTeam}</span>
                  </div>
                </div>

                <div className="your-match-result">
                  {match.status === "FINISHED" ? (
                    <strong>{match.score}</strong>
                  ) : (
                    <span>Upcoming</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED MATCHES */}
        <section className="home-section">
          <div className="section-heading">
            <h2>Featured Matches</h2>
            <button className="section-link">View all</button>
          </div>

          <div className="featured-matches">
            {featuredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="home-section">
          <div className="section-heading">
            <h2>Upcoming Events</h2>
            <button className="section-link">View all</button>
          </div>

          <div className="upcoming-matches">
            {upcomingMatches.map((match) => (
              <div className="upcoming-match" key={match.id}>
                <div className="upcoming-match-info">
                  <span>{match.league}</span>
                  <small>{match.time}</small>
                </div>

                <div className="upcoming-team">
                  <img src={match.homeLogo} alt="" />
                  <span>{match.homeTeam}</span>
                </div>

                <div className="upcoming-team">
                  <img src={match.awayLogo} alt="" />
                  <span>{match.awayTeam}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home