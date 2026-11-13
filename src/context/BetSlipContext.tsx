import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import { getSportForMatch, seedBets } from "../data/betHistory"
import type { PlacedBet } from "../data/betHistory"

export type BetSelection = {
  id: string
  matchId: number
  matchName: string
  market: string
  selection: string
  odds: number
  stake: string
}

export const makeSelectionId = (
  matchName: string,
  market: string,
  selection: string,
) => `${matchName}|${market}|${selection}`

type BetSlipContextType = {
  selections: BetSelection[]
  addSelection: (selection: BetSelection) => void
  removeSelection: (id: string) => void
  updateStake: (id: string, stake: string) => void
  clearSelections: () => void
  placedBets: PlacedBet[] 
  placeBets: (selections: BetSelection[]) => void 
  isOpen: boolean
  setBetSlipOpen: (open: boolean) => void
  toggleBetSlip: () => void
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined)

type BetSlipProviderProps = {
  children: ReactNode
}

export const BetSlipProvider = ({ children }: BetSlipProviderProps) => {
  // Open by default on desktop, collapsed on mobile 
  const [isOpen, setIsOpen] = useState(
    () => window.matchMedia("(min-width: 769px)").matches,
  )
  const [selections, setSelections] = useState<BetSelection[]>([])
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>(seedBets) // NEW

  const setBetSlipOpen = (open: boolean) => {
    setIsOpen(open)
  }

  const toggleBetSlip = () => {
    setIsOpen((current) => !current)
  }

  const addSelection = (selection: BetSelection) => {
    setSelections((current) => {
      const alreadySelected = current.some((item) => item.id === selection.id)

      if (alreadySelected) {
        return current.filter((item) => item.id !== selection.id)
      }

      return [...current, selection]
    })
  }

  const removeSelection = (id: string) => {
    setSelections((current) => current.filter((item) => item.id !== id))
  }

  const updateStake = (id: string, stake: string) => {
    setSelections((current) =>
      current.map((item) => (item.id === id ? { ...item, stake } : item)),
    )
  }

  const clearSelections = () => {
    setSelections([])
  }

  const placeBets = (toPlace: BetSelection[]) => {
    const now = Date.now()

    const newBets: PlacedBet[] = toPlace.map((item, index) => ({
      id: `${now}-${index}`,
      placedAt: now,
      matchName: item.matchName,
      market: item.market,
      selection: item.selection,
      odds: item.odds,
      stake: Number(item.stake),
      status: "open",
      sport: getSportForMatch(item.matchName),
    }))

    setPlacedBets((current) => [...newBets, ...current])
  }

  return (
    <BetSlipContext.Provider
      value={{
        selections,
        addSelection,
        removeSelection,
        updateStake,
        clearSelections,
        placedBets,
        placeBets,
        isOpen,
        setBetSlipOpen,
        toggleBetSlip,
      }}
    >
      {children}
    </BetSlipContext.Provider>
  )
}

export const useBetSlip = () => {
  const context = useContext(BetSlipContext)

  if (!context) {
    throw new Error("useBetSlip must be used inside a BetSlipProvider")
  }

  return context
}