
import { useState } from "react"
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
  X,
} from "lucide-react"

import { Link, useLocation } from "react-router-dom"
import "../styles/SideBar.css"

type SidebarProps = {
  expanded: boolean
}

const Sidebar = ({ expanded }: SidebarProps) => {
  const { pathname } = useLocation()
  const [notice, setNotice] = useState("")

  const itemClass = (path: string) =>
    `sidebar-item ${pathname === path ? "active" : ""}`

  const unavailable = (name: string) => {
    setNotice(`${name} isn't available in this demo.`)
  }

  return (
    <aside className={`sidebar ${expanded ? "expanded" : ""}`}>

      <div className="sidebar-group sidebar-top-group">

        <Link to="/my-bets" className={itemClass("/my-bets")} title="My Bets">
          <Ticket size={19} />
          {expanded && <span>My Bets</span>}
        </Link>

        <Link
          to="/sports/basketball"
          className={itemClass("/sports/basketball")}
          title="Basketball"
        >
          <CircleDot size={19} />
          {expanded && <span>Basketball</span>}
        </Link>

      </div>

      <div className="sidebar-group">

        <Link to="/live" className={itemClass("/live")} title="Live">
          <Video size={19} />
          {expanded && <span>Live</span>}
        </Link>

        <button
          className="sidebar-item sidebar-unavailable"
          title="Calendar"
          onClick={() => unavailable("Calendar")}
        >
          <CalendarDays size={19} />
        </button>

        <Link to="/" className={itemClass("/")} title="All Sports">
          <Volleyball size={19} />
          {expanded && <span>All Sports</span>}
        </Link>

        <Link
          to="/sports/football"
          className={itemClass("/sports/football")}
          title="Football"
        >
          <Trophy size={19} />
          {expanded && <span>Football</span>}
        </Link>

        <Link
          to="/sports/tennis"
          className={itemClass("/sports/tennis")}
          title="Tennis"
        >
          <CircleDot size={19} />
          {expanded && <span>Tennis</span>}
        </Link>

        <Link
          to="/sports/esports"
          className={itemClass("/sports/esports")}
          title="Esports"
        >
          <Gamepad2 size={19} />
          {expanded && <span>Esports</span>}
        </Link>

        <Link
          to="/sports/volleyball"
          className={itemClass("/sports/volleyball")}
          title="Volleyball"
        >
          <Volleyball size={19} />
          {expanded && <span>Volleyball</span>}
        </Link>

        <button
          className="sidebar-item sidebar-unavailable"
          title="Radio"
          onClick={() => unavailable("Radio")}
        >
          <Radio size={19} />
        </button>

      </div>

      <div className="sidebar-group">

        <button
          className="sidebar-item sidebar-unavailable"
          title="Promotions"
          onClick={() => unavailable("Promotions")}
        >
          <Megaphone size={19} />
        </button>

        <button
          className="sidebar-item sidebar-unavailable"
          title="Rewards"
          onClick={() => unavailable("Rewards")}
        >
          <Gift size={19} />
        </button>

        <button
          className="sidebar-item sidebar-unavailable"
          title="Statistics"
          onClick={() => unavailable("Statistics")}
        >
          <ChartNoAxesCombined size={19} />
        </button>

        <button
          className="sidebar-item sidebar-unavailable"
          title="Community"
          onClick={() => unavailable("Community")}
        >
          <Globe size={19} />
        </button>

        <button
          className="sidebar-item sidebar-unavailable"
          title="My Account"
          onClick={() => unavailable("My Account")}
        >
          <UserRound size={19} />
        </button>

        <button
          className="sidebar-item sidebar-unavailable"
          title="Competitions"
          onClick={() => unavailable("Competitions")}
        >
          <Flag size={19} />
        </button>

      </div>

      {notice && (
        <div className="sidebar-notice">
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss message">
            <X size={14} />
          </button>
        </div>
      )}

    </aside>
  )
}

export default Sidebar
