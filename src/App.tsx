import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/Nav"
import Sidebar from "./components/SideBar"
import BottomNav from "./components/BottomNav"
import Home from "./pages/Home"
import Live from "./pages/Live"
import Football from "./pages/Football"
import Category from "./pages/Category"
import Footer from "./components/Footer"
import MatchPage from "./pages/MatchPage"
import "./styles/Globals.css"

const App = () => {
  return (
    <BrowserRouter>
      <Nav />

      <div className="app-layout">
        <Sidebar />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<Live />} />
            <Route path="/sports/football" element={<Football />} /> {/* NEW */}
            <Route path="/sports/:category" element={<Category />} />
            <Route path="/match/:id" element={<MatchPage />} />
          </Routes>
          <Footer />
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App