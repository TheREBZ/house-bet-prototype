import Nav from "./components/Nav"
import Sidebar from "./components/SideBar"
import BottomNav from "./components/BottomNav"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import "./styles/Globals.css"

const App = () => {
  return (
    <>
      <Nav />

      <div className="app-layout">
        <Sidebar />

        <main className="app-main">
          <Home />
          <Footer />
        </main>
        <BottomNav />
      </div>
    </>
  )
}

export default App