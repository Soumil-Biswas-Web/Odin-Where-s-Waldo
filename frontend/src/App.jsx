import { Outlet } from "react-router-dom"
import { Flash } from "./Content/Components/Flash"

function App() {

  return (
    <div className="bg-background-color min-h-screen">
      <Flash />
      <Outlet />
    </div>
  )
}

export default App
