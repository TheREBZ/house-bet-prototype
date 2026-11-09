
import { useState } from "react"
import {
  Menu,
  Trophy,
  Dice5,
  MessageCircle,
  UserRound,
} from "lucide-react"
import "./BottomNav.css"

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("Sports")

  const navItems = [
    { label: "Menu", icon: Menu },
    { label: "Sports", icon: Trophy },
    { label: "Casino", icon: Dice5 },
    { label: "Chat", icon: MessageCircle },
    { label: "Account", icon: UserRound },
  ]

  return (
    <nav className="bottom-nav">
      {navItems.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className={`bottom-nav-item ${
            activeTab === label ? "active" : ""
          }`}
          onClick={() => setActiveTab(label)}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
