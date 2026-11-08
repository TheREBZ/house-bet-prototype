import Nav from "./components/Nav"
import Sidebar from "./components/SideBar"
import Home from "./pages/Home"
import "./styles/Globals.css"

const App = () => {
  return (
    <>
      <Nav />

      <div className="app-layout">
        <Sidebar />

        <main className="app-main">
          <Home />
        </main>
      </div>
    </>
  )
}

export default App