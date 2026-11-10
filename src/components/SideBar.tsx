import {
  Ticket,
  CircleDot,
  Video,
  CalendarDays,
  Volleyball,
  Trophy,
  Gamepad2,
  Radio,
  Megaphone,
  Gift,
  UserRound,
  ChartNoAxesCombined,
  Globe,
  Flag,
} from "lucide-react"

import { Link, useLocation } from "react-router-dom"
import "../styles/SideBar.css"

const Sidebar = () => {
  const { pathname } = useLocation()

  // Every link highlights itself when you're on its route
  const itemClass = (path: string) =>
    `sidebar-item ${pathname === path ? "active" : ""}`

  return (
    <aside className="sidebar">
      <div className="sidebar-group sidebar-top-group">
        <button className="sidebar-item" title="Sports">
          <Ticket size={19} />
        </button>

        <Link to="/sports/basketball" className={itemClass("/sports/basketball")} title="Basketball">
          <CircleDot size={19} />
        </Link>
      </div>

      <div className="sidebar-group">
        <Link to="/live" className={itemClass("/live")} title="Live">
          <Video size={19} />
        </Link>

        <button className="sidebar-item" title="Calendar">
          <CalendarDays size={19} />
        </button>

        {/* Home / All Sports: the ball icon, a link to "/" from anywhere */}
        <Link to="/" className={itemClass("/")} title="All Sports">
          <Volleyball size={19} />
        </Link>

        <Link to="/sports/football" className={itemClass("/sports/football")} title="Football">
          <Trophy size={19} />
        </Link>

        <Link to="/sports/tennis" className={itemClass("/sports/tennis")} title="Tennis">
          <CircleDot size={19} />
        </Link>

        <Link to="/sports/esports" className={itemClass("/sports/esports")} title="Esports">
          <Gamepad2 size={19} />
        </Link>

        <button className="sidebar-item" title="Radio">
          <Radio size={19} />
        </button>
      </div>

      <div className="sidebar-group">
        <button className="sidebar-item" title="Promotions">
          <Megaphone size={19} />
        </button>

        <button className="sidebar-item" title="Rewards">
          <Gift size={19} />
        </button>

        <button className="sidebar-item" title="Statistics">
          <ChartNoAxesCombined size={19} />
        </button>

        <button className="sidebar-item" title="Community">
          <Globe size={19} />
        </button>

        <button className="sidebar-item" title="My Account">
          <UserRound size={19} />
        </button>

        <button className="sidebar-item" title="Competitions">
          <Flag size={19} />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar