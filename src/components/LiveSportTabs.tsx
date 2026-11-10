import type { ComponentType } from "react"
import { Video, Goal, Activity, Volleyball, CircleDot, Shield, Gamepad2 } from "lucide-react"
import type { SportId } from "../data/liveMatches"

export type SportFilter = SportId | "all"

type Tab = {
  id: SportFilter
  label: string
  icon: ComponentType<{ size?: number }>
}

const tabs: Tab[] = [
  { id: "all", label: "All", icon: Video },
  { id: "soccer", label: "Soccer", icon: Goal },
  { id: "tennis", label: "Tennis", icon: Activity },
  { id: "basketball", label: "Basketball", icon: Volleyball },
  { id: "baseball", label: "Baseball", icon: CircleDot },
  { id: "american-football", label: "American Football", icon: Shield },
  { id: "esports", label: "Esports", icon: Gamepad2 },
]

type LiveSportTabsProps = {
  active: SportFilter
  counts: Record<SportFilter, number>
  onChange: (sport: SportFilter) => void
}

const LiveSportTabs = ({ active, counts, onChange }: LiveSportTabsProps) => (
  <nav className="live-tabs" aria-label="Filter live matches by sport">
    {tabs.map(({ id, label, icon: Icon }) => (
      <button
        key={id}
        className={`live-tab ${active === id ? "active" : ""}`}
        onClick={() => onChange(id)}
        aria-pressed={active === id}
      >
        <Icon size={14} />
        <span>{label}</span>
        <em>{counts[id]}</em>
      </button>
    ))}
  </nav>
)

export default LiveSportTabs