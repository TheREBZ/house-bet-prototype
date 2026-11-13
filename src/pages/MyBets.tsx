import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ChevronDown,
  ChevronLeft,
  SlidersHorizontal,
  Ticket,
} from "lucide-react"
import SelectPill from "../components/SelectPill"
import { MyBetsSkeleton } from "../components/Skeletons"
import { useBetSlip } from "../context/BetSlipContext"
import { useSimulatedLoading } from "../hooks/useSimulatedLoading"
import {
  getLiveInfo,
  getMatchPath,
  getReturns,
  sportFilters,
} from "../data/betHistory"
import type { PlacedBet } from "../data/betHistory"
import "../styles/Live.css"
import "../styles/MyBets.css"

type Tab = "open" | "settled"
type DateRange = "all" | "today" | "7d" | "30d" | "custom"

const dateRanges: { id: DateRange; label: string }[] = [
  { id: "all", label: "All time" },
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "custom", label: "Custom" },
]

const sportOptions = [
  { value: "all", label: "All sports" },
  ...sportFilters.map((sport) => ({ value: sport, label: sport })),
]

const resultLabel: Record<PlacedBet["status"], string> = {
  open: "Open",
  won: "Won",
  lost: "Lost",
  void: "Void",
}

const DAY = 24 * 60 * 60 * 1000

const inRange = (
  timestamp: number,
  range: DateRange,
  from: string,
  to: string,
) => {
  switch (range) {
    case "all":
      return true
    case "today": {
      const start = new Date()
      start.setHours(0, 0, 0, 0)
      return timestamp >= start.getTime()
    }
    case "7d":
      return timestamp >= Date.now() - 7 * DAY
    case "30d":
      return timestamp >= Date.now() - 30 * DAY
    case "custom": {
      const start = from ? new Date(`${from}T00:00:00`).getTime() : -Infinity
      const end = to ? new Date(`${to}T23:59:59`).getTime() : Infinity
      return timestamp >= start && timestamp <= end
    }
  }
}

const money = (amount: number) => `$${amount.toFixed(2)}`

const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

const formatTime = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })


type BetRowProps = {
  bet: PlacedBet
  expanded: boolean
  onToggle: () => void
}

const BetRow = ({ bet, expanded, onToggle }: BetRowProps) => {
  const live = bet.status === "open" ? getLiveInfo(bet.matchName) : undefined
  const matchPath = getMatchPath(bet.matchName)
  const returns = getReturns(bet)
  const profit = bet.status === "open" ? undefined : returns - bet.stake

  return (
    <article className={`mb-bet ${expanded ? "expanded" : ""}`}>
      <div className="mb-row">
        <div className="mb-cell mb-placed">
          <strong>{formatDate(bet.placedAt)}</strong>
          <small>{formatTime(bet.placedAt)}</small>
        </div>

        <div className="mb-cell mb-bet-info">
          <strong>{bet.selection}</strong>
          <span className="mb-event">
            {bet.matchName.replace(" vs ", " v ")}
            {live && (
              <>
                <i className="mb-live-dot" />
                <em className="mb-live-clock">{live.clock}</em>
                <b className="mb-score-chip">{live.score}</b>
              </>
            )}
          </span>
        </div>

        <div className="mb-cell mb-odds" data-label="Odds">
          {bet.odds.toFixed(2)}
        </div>

        <div className="mb-cell mb-stake" data-label="Stake">
          {money(bet.stake)}
        </div>

        <div
          className={`mb-cell mb-returns ${bet.status}`}
          data-label={bet.status === "open" ? "Potential returns" : "Returns"}
        >
          {money(returns)}
        </div>

        <div className="mb-cell mb-result">
          <span className={`mb-badge ${bet.status}`}>
            {resultLabel[bet.status]}
          </span>
        </div>

        <button
          className="mb-toggle"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={expanded ? "Hide bet details" : "Show bet details"}
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {expanded && (
        <div className="mb-details">
          <div>
            <span>Market</span>
            <strong>{bet.market}</strong>
          </div>
          <div>
            <span>Event</span>
            <strong>{bet.matchName}</strong>
          </div>
          <div>
            <span>Sport</span>
            <strong>{bet.sport}</strong>
          </div>
          <div>
            <span>Placed</span>
            <strong>
              {formatDate(bet.placedAt)} · {formatTime(bet.placedAt)}
            </strong>
          </div>
          <div>
            <span>Bet ID</span>
            <strong>#{bet.id.slice(-8)}</strong>
          </div>
          {profit !== undefined && (
            <div>
              <span>Profit / loss</span>
              <strong className={profit >= 0 ? "positive" : "negative"}>
                {profit >= 0 ? "+" : "−"}
                {money(Math.abs(profit))}
              </strong>
            </div>
          )}
          {matchPath && (
            <Link to={matchPath} className="mb-view-match">
              View match
            </Link>
          )}
        </div>
      )}
    </article>
  )
}

// the page
const MyBets = () => {
  const navigate = useNavigate()
  const { placedBets } = useBetSlip()
  const loading = useSimulatedLoading()

  const [tab, setTab] = useState<Tab>("open")
  const [range, setRange] = useState<DateRange>("all")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [sport, setSport] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const openCount = placedBets.filter((bet) => bet.status === "open").length
  const settledCount = placedBets.length - openCount

  const visibleBets = useMemo(
    () =>
      placedBets
        .filter((bet) => (tab === "open") === (bet.status === "open"))
        .filter((bet) => sport === "all" || bet.sport === sport)
        .filter((bet) => inRange(bet.placedAt, range, from, to))
        .sort((a, b) => b.placedAt - a.placedAt),
    [placedBets, tab, sport, range, from, to],
  )

  if (loading) return <MyBetsSkeleton />

  const filtersActive = range !== "all" || sport !== "all"

  const switchTab = (next: Tab) => {
    setTab(next)
    setExpandedId(null)
  }

  return (
    <div className="live-page">
      {/* HEADER */}
      <div className="live-header">
        <button className="live-back" onClick={() => navigate("/")} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h1 className="live-title">My bets</h1>
        <span className="mb-meta">
          {openCount} open · {settledCount} settled
        </span>
      </div>

      {/* OPEN / SETTLED */}
      <div className="mb-tabs" role="tablist">
        <button
          className={`mb-tab ${tab === "open" ? "active" : ""}`}
          onClick={() => switchTab("open")}
          aria-pressed={tab === "open"}
        >
          Open ({openCount})
        </button>
        <button
          className={`mb-tab ${tab === "settled" ? "active" : ""}`}
          onClick={() => switchTab("settled")}
          aria-pressed={tab === "settled"}
        >
          Settled ({settledCount})
        </button>
      </div>

      {/* FILTERS */}
      <div className="mb-filters">
        <div className="mb-chips">
          {dateRanges.map((item) => (
            <button
              key={item.id}
              className={`mb-chip ${range === item.id ? "active" : ""}`}
              onClick={() => setRange(item.id)}
              aria-pressed={range === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>

        <SelectPill
          label="Sport"
          value={sport}
          options={sportOptions}
          onChange={setSport}
          icon={<SlidersHorizontal size={14} />}
        />
      </div>

      {range === "custom" && (
        <div className="mb-custom-range">
          <label>
            From
            <input
              type="date"
              value={from}
              max={to || undefined}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <label>
            To
            <input
              type="date"
              value={to}
              min={from || undefined}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
        </div>
      )}

      {/* LIST */}
      {visibleBets.length === 0 ? (
        <div className="mb-empty">
          <Ticket size={34} />
          <h3>{tab === "open" ? "No open bets" : "No settled bets"}</h3>
          <p>
            {filtersActive
              ? "Nothing matches these filters. Try a different date range or sport."
              : "Place a bet and it will show up here."}
          </p>
          <Link to="/" className="mb-browse">
            Browse matches
          </Link>
        </div>
      ) : (
        <div className="mb-table">
          <div className="mb-row mb-head" aria-hidden="true">
            <span>Placed</span>
            <span>Bet</span>
            <span>Odds</span>
            <span>Stake</span>
            <span>Returns</span>
            <span>Result</span>
            <span />
          </div>

          {visibleBets.map((bet) => (
            <BetRow
              key={bet.id}
              bet={bet}
              expanded={expandedId === bet.id}
              onToggle={() =>
                setExpandedId((current) => (current === bet.id ? null : bet.id))
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBets