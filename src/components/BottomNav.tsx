import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Menu,
  Trophy,
  Dice5,
  MessageCircle,
  UserRound,
  X,
  Globe,
  Video,
  Goal,
  CircleDot,
  Activity,
  Gamepad2,
  Volleyball,
  Ticket,
} from "lucide-react"
import { useBetSlip } from "../context/BetSlipContext"
import "./BottomNav.css"

type PlaceholderName = "Casino" | "Chat" | "Account"
type SheetName = "Menu" | "Sports" | PlaceholderName

const navItems: { label: SheetName; icon: typeof Menu }[] = [
  { label: "Menu", icon: Menu },
  { label: "Sports", icon: Trophy },
  { label: "Casino", icon: Dice5 },
  { label: "Chat", icon: MessageCircle },
  { label: "Account", icon: UserRound },
]

const pages = [
  { label: "All sports", to: "/", icon: Globe },
  { label: "Live", to: "/live", icon: Video },
  { label: "Football", to: "/sports/football", icon: Goal },
  { label: "Basketball", to: "/sports/basketball", icon: CircleDot },
  { label: "Tennis", to: "/sports/tennis", icon: Activity },
  { label: "Esports", to: "/sports/esports", icon: Gamepad2 },
  { label: "Volleyball", to: "/sports/volleyball", icon: Volleyball },
  { label: "My bets", to: "/my-bets", icon: Ticket },
  { label: "Match page", to: "/match/1", icon: Trophy },
]

const sportPages = pages.filter(
  (page) => page.to !== "/my-bets" && page.to !== "/match/1",
)

const placeholderIcons: Record<PlaceholderName, typeof Menu> = {
  Casino: Dice5,
  Chat: MessageCircle,
  Account: UserRound,
}

const BottomNav = () => {
  const { pathname } = useLocation()
  const { setBetSlipOpen } = useBetSlip()
  const [sheet, setSheet] = useState<SheetName | null>(null)

  useEffect(() => {
    if (!sheet) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(null)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [sheet])

  const closeSheet = () => setSheet(null)

  const toggleSheet = (label: SheetName) => {
    if (sheet === label) {
      setSheet(null)
      return
    }

    setBetSlipOpen(false) 
    setSheet(label)
  }

  const isActivePage = (to: string) =>
    to === "/match/1" ? pathname.startsWith("/match/") : pathname === to

  const renderSheet = () => {
    if (!sheet) return null

    const header = (
      <div className="nav-sheet-header">
        <h2>{sheet}</h2>
        <button
          className="nav-sheet-close"
          onClick={closeSheet}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    )

    if (sheet === "Menu" || sheet === "Sports") {
      const list = sheet === "Menu" ? pages : sportPages

      return (
        <>
          {header}

          <div className="nav-sheet-grid">
            {list.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`nav-sheet-link ${isActivePage(to) ? "active" : ""}`}
                onClick={closeSheet}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <p className="nav-sheet-note">
            <span>
              {sheet === "Menu"
                ? "Demo navigation: this menu only shows the pages I built for this entry, for easy checks and navigation."
                : "Only the sports pages built for this entry are listed here."}
            </span>
          </p>
        </>
      )
    }

    const Icon = placeholderIcons[sheet]

    return (
      <>
        {header}

        <div className="nav-sheet-placeholder">
          <span className="nav-sheet-placeholder-icon">
            <Icon size={26} />
          </span>
          <h3>Not part of the demo</h3>
          <p>
            This page was not created in the demo. I only prioritised the
            important pages and screens.
          </p>

          <button className="nav-sheet-primary" onClick={closeSheet}>
            Got it
          </button>
          <button
            className="nav-sheet-secondary"
            onClick={() => setSheet("Menu")}
          >
            See available pages
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      {sheet && (
        <>
          <div
            className="nav-sheet-backdrop"
            onClick={closeSheet}
            aria-hidden="true"
          />
          <div
            className="nav-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={sheet}
          >
            {renderSheet()}
          </div>
        </>
      )}

      <nav className="bottom-nav">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className={`bottom-nav-item ${
              (sheet ?? "Sports") === label ? "active" : ""
            }`}
            onClick={() => toggleSheet(label)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}

export default BottomNav