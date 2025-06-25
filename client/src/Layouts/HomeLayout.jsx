import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import Home from "../components/Home"
import Footer from "../components/Footer"

function HomeLayout() {
  return (
    <div>
      <Home/>
    </div>
  )
}

export default HomeLayout
