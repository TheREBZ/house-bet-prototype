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
  
  import "../styles/SideBar.css"
  
  const Sidebar = () => {
    return (
      <aside className="sidebar">
        <div className="sidebar-group sidebar-top-group">
          <button className="sidebar-item" title="Sports">
            <Ticket size={19} />
          </button>
  
          <button className="sidebar-item" title="Basketball">
            <CircleDot size={19} />
          </button>
        </div>
  
        <div className="sidebar-group">
          <button className="sidebar-item" title="Video">
            <Video size={19} />
          </button>
  
          <button className="sidebar-item" title="Calendar">
            <CalendarDays size={19} />
          </button>
  
          <button className="sidebar-item active" title="All Sports">
            <Volleyball size={19} />
          </button>
  
          <button className="sidebar-item" title="Football">
            <Trophy size={19} />
          </button>
  
          <button className="sidebar-item" title="Tennis">
            <CircleDot size={19} />
          </button>
  
          <button className="sidebar-item" title="Esports">
            <Gamepad2 size={19} />
          </button>
  
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