import { useState } from "react"
import { Link } from "react-router-dom"
import { X, MessageCircle, Ticket, ChevronUp } from "lucide-react"
import { useBetSlip } from "../context/BetSlipContext"
import { getReturns } from "../data/betHistory"
import "../styles/BetSlipPanel.css"

type BetTab = "slip" | "bets" | "chat"

const BetSlipPanel = () => {
  const {
    selections,
    removeSelection,
    updateStake,
    clearSelections,
    placedBets,
    placeBets,
    isOpen,
    setBetSlipOpen,
  } = useBetSlip()

  const [activeTab, setActiveTab] = useState<BetTab>("slip")

  const openBets = placedBets.filter((bet) => bet.status === "open")

  const totalStake = selections.reduce(
    (total, item) => total + (Number(item.stake) || 0),
    0,
  )

  const potentialReturns = selections.reduce(
    (total, item) => total + (Number(item.stake) || 0) * item.odds,
    0,
  )

  const combinedOdds = selections.reduce((total, item) => total * item.odds, 1)

  const selectionNames = selections.map((item) => item.selection).join(", ")

  const validSelections = selections.filter((item) => Number(item.stake) > 0)

  const placeBet = () => {
    if (validSelections.length === 0) return

    placeBets(validSelections)
    clearSelections()
    setActiveTab("bets")
  }

  const handleViewAll = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setBetSlipOpen(false)
    }
  }

  if (!isOpen) {
    return (
      <>
        <button className="mobile-slip-bar" onClick={() => setBetSlipOpen(true)}>
          <div className="mobile-slip-info">
            <div className="mobile-slip-heading">
              <Ticket size={17} />
              <span>{selections.length} Selections</span>
            </div>

            <span className="mobile-slip-selections">
              {selections.length > 0 ? selectionNames : "Your bet slip is empty"}
            </span>
          </div>

          <div className="mobile-slip-odds">
            <span>Odds</span>
            <strong>{selections.length > 0 ? combinedOdds.toFixed(2) : "—"}</strong>
            <ChevronUp size={18} />
          </div>
        </button>
      </>
    )
  }

  return (
    <>
      <div
        className="bet-slip-backdrop"
        onClick={() => setBetSlipOpen(false)}
        aria-hidden="true"
      />

      <aside className="bet-slip-panel">
        <div className="bet-slip-header">
          <div className="bet-slip-tabs">
            <button
              className={activeTab === "slip" ? "active" : ""}
              onClick={() => setActiveTab("slip")}
            >
              Bet slip
              <span>{selections.length}</span>
            </button>

            <button
              className={activeTab === "bets" ? "active" : ""}
              onClick={() => setActiveTab("bets")}
            >
              My bets
              <span>{openBets.length}</span>
            </button>

            <button
              className={activeTab === "chat" ? "active" : ""}
              onClick={() => setActiveTab("chat")}
            >
              Chat
            </button>
          </div>

          <button
            className="bet-slip-close"
            onClick={() => setBetSlipOpen(false)}
            aria-label="Close bet slip"
          >
            <X size={17} />
          </button>
        </div>

        {activeTab === "slip" && (
          <>
            <div className="bet-slip-content">
              {selections.length === 0 ? (
                <div className="bet-slip-empty">
                  <Ticket size={34} />
                  <h3>Your bet slip is empty</h3>
                  <p>Select odds from a match to add your first bet.</p>
                </div>
              ) : (
                <>
                  <div className="bet-slip-summary">
                    <strong>Singles</strong>
                    <span>{selections.length} selection(s)</span>

                    <button onClick={clearSelections}>Clear all</button>
                  </div>

                  <div className="bet-slip-selections">
                    {selections.map((item) => (
                      <div className="bet-selection" key={item.id}>
                        <div className="bet-selection-top">
                          <div>
                            <strong>{item.selection}</strong>
                            <span>
                              {item.market} · {item.matchName}
                            </span>
                          </div>

                          <div className="bet-selection-actions">
                            <strong>{item.odds.toFixed(2)}</strong>

                            <button
                              onClick={() => removeSelection(item.id)}
                              aria-label="Remove selection"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        </div>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Enter stake"
                          value={item.stake}
                          onChange={(e) => updateStake(item.id, e.target.value)}
                        />

                        <div className="bet-selection-returns">
                          <span>Returns</span>
                          <strong>
                            ${((Number(item.stake) || 0) * item.odds).toFixed(2)}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="bet-slip-footer">
              <div className="bet-slip-total">
                <span>Total stake</span>
                <strong>${totalStake.toFixed(2)}</strong>
              </div>

              <div className="bet-slip-total">
                <span>Potential returns</span>
                <strong>${potentialReturns.toFixed(2)}</strong>
              </div>

              <button
                className="place-bet-button"
                disabled={validSelections.length === 0}
                onClick={placeBet}
              >
                Place bet
              </button>

              <p className="bet-slip-disclaimer">
                Demo only · No real money involved
              </p>
            </div>
          </>
        )}

        {activeTab === "bets" && (
          <div className="bet-slip-content">
            {openBets.length === 0 ? (
              <div className="bet-slip-empty">
                <Ticket size={34} />
                <h3>No open bets</h3>
                <p>Your placed demo bets will appear here.</p>
              </div>
            ) : (
              <div className="placed-bets-list">
                {openBets.map((bet) => (
                  <div className="placed-bet-card" key={bet.id}>
                    <span className="placed-bet-status">Open</span>

                    <div>
                      <strong>{bet.selection}</strong>
                      <span>{bet.matchName}</span>
                      <span>
                        {bet.market} · {bet.odds.toFixed(2)}
                      </span>
                    </div>

                    <div className="placed-bet-totals">
                      <span>Stake: ${bet.stake.toFixed(2)}</span>
                      <strong>Returns: ${getReturns(bet).toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link to="/my-bets" className="placed-bets-link" onClick={handleViewAll}>
              View all bets
            </Link>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="bet-slip-empty">
            <MessageCircle size={34} />
            <h3>Live chat</h3>
            <p>Chat functionality is not available in this demo.</p>
          </div>
        )}
      </aside>
    </>
  )
}

export default BetSlipPanel