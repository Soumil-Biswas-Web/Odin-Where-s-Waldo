import Header from "./Content/Header/Header"
import Footer from "./Content/Footer"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className="bg-[--background-color] flex flex-col items-center min-h-[100vh] justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
