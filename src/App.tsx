
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Nav from "./components/Nav"
import Sidebar from "./components/SideBar"
import BottomNav from "./components/BottomNav"
import BetSlipPanel from "./components/BetSlipPanel"

import Home from "./pages/Home"
import Live from "./pages/Live"
import Football from "./pages/Football"
import Category from "./pages/Category"
import MyBets from "./pages/MyBets"
import Footer from "./components/Footer"
import MatchPage from "./pages/MatchPage"

import { BetSlipProvider } from "./context/BetSlipContext"
import { ThemeProvider } from "./context/ThemeContext"

import "./styles/Globals.css"
import "./styles/Theme.css"

const App = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <ThemeProvider>
      <BetSlipProvider>
        <BrowserRouter>
          <Nav
            sidebarExpanded={sidebarExpanded}
            onToggleSidebar={() =>
              setSidebarExpanded((current) => !current)
            }
          />

          <div
            className={`app-layout ${
              sidebarExpanded ? "sidebar-expanded" : ""
            }`}
          >
            <Sidebar expanded={sidebarExpanded} />

            <main className="app-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/live" element={<Live />} />
                <Route path="/sports/football" element={<Football />} />
                <Route path="/sports/:category" element={<Category />} />
                <Route path="/match/:id" element={<MatchPage />} />
                <Route path="/my-bets" element={<MyBets />} />
              </Routes>

              <Footer />
            </main>

            <BetSlipPanel />
          </div>

          <BottomNav />
        </BrowserRouter>
      </BetSlipProvider>
    </ThemeProvider>
  )
}

export default App
