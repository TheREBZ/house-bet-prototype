
import { PanelLeft, Crown, Search, PanelRight } from "lucide-react"
import { useBetSlip } from "../context/BetSlipContext"
import ThemeToggle from "./ThemeToggle"
import "../styles/Nav.css"

type NavProps = {
  sidebarExpanded: boolean
  onToggleSidebar: () => void
}

const Nav = ({ sidebarExpanded, onToggleSidebar }: NavProps) => {
  const { toggleBetSlip, isOpen } = useBetSlip()

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <button
          className={`panel-left ${sidebarExpanded ? "active" : ""}`}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          aria-expanded={sidebarExpanded}
        >
          <PanelLeft size={20} className="panel-icon" />
        </button>

        <a href="/" className="logo">
          <img
            src="/logo/housebets-wave-logo.svg"
            alt="Housebets"
            style={{ width: "190px", height: "auto" }}
          />
        </a>
      </div>

      <div className="notifs">
        <div className="leaderboard">
          <img
            src="/logo/housebet-trophy.webp"
            style={{ width: "50px" }}
            alt="Leaderboard"
          />
          <div className="leaderboard-content">
            <p className="weekly">Weekly Prize</p>
            <p className="leaderboard-prize">
              $85,000.<span>00</span>
            </p>
          </div>
        </div>

        <div className="leaderboard-icon">
          <Crown size={30} />
        </div>
      </div>

      <div className="cta">
        <ThemeToggle />

        <div className="search">
          <Search size={20} />
        </div>

        <button
          className={`panel-right ${isOpen ? "active" : ""}`}
          onClick={toggleBetSlip}
          aria-label="Toggle bet slip"
          aria-pressed={isOpen}
        >
          <PanelRight size={20} />
        </button>

        <a href="">
          <button className="btn login">Log In</button>
        </a>

        <a href="">
          <button className="btn register">Register</button>
        </a>
      </div>
    </nav>
  )
}

export default Nav
