import { Outlet } from "react-router-dom"
import SideBar from "../Navigation/SideBar"

function MainLayout() {
  return (
    <div className="flex h-screen">
      <header className="w-3/12 bg-gray-300/20">
        <SideBar/>
      </header>
      <main className="w-11/12">
        <Outlet className="w-full"/>
      </main>
    </div>
  )
}

export default MainLayout