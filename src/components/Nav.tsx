import { PanelLeft, Crown, Search, PanelRight } from "lucide-react"
import "../styles/Nav.css"

const Nav = () => {
  return (
    <nav className="nav-container">
        <div className="nav-logo">
            <div className="panel-left">
                <PanelLeft size={20} className="panel-icon" />
            </div>
            <a href="/" className="logo">
                <img src="/logo/housebets-wave-logo.svg" alt="Housebets" style={{width: "190px", height: "auto"}} />
            </a>
        </div>
        <div className="notifs">
            <div className="leaderboard">
                <img src="/logo/housebet-trophy.webp" style={{width: "50px"}} alt="Leaderboard" />
                <div className="leaderboard-content">
                    <p className="weekly">Weekly Prize</p>
                    <p className="leaderboard-prize">$85,000.<span>00</span></p>
                </div>
            </div>
            <div className="leaderboard-icon">
                <Crown size={30} />
            </div>
        </div>
        <div className="cta">
            <div className="search">
                <Search size={20} />
            </div>
            <div className="panel-right">
                <PanelRight size={20} />
            </div>
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