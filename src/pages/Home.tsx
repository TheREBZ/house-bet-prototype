import MatchCard from "../components/MatchCard"
import { featuredMatches, upcomingMatches, favouriteItems, yourMatches, } from "../data/matches"
import SearchBar from "../components/SearchBar"
import "../styles/Home.css"

const sports = [
  "All Sports",
  "Football",
  "Basketball",
  "Tennis",
  "Esports",
  "Volleyball",
]

const Home = () => {
  return (
    <div className="home-page">
      <SearchBar />

      <nav className="sports-nav">
        {sports.map((sport) => (
          <button
            key={sport}
            className={`sport-tab ${sport === "All Sports" ? "active" : ""}`}
          >
            {sport}
          </button>
        ))}
      </nav>

      <div className="home-content">
        <section className="home-main">
          <section className="home-section">
            <div className="section-heading">
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
            </div>
          </section>

          <section className="home-section">
            <div className="section-heading">
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
            </div>
          </section>

          <section className="home-section">
            <div className="section-heading">
              <div className="featured-matches">
                {featuredMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          </section>
        </section>

        <aside className="home-aside">
          <section className="home-section">
            <div className="section-heading">
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
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default Home
