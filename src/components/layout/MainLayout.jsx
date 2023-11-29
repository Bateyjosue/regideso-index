import { Outlet, Navigate } from "react-router-dom"
import SideBar from "../navigation/SideBar"
import Profile from "../navigation/Profile"
import { useAuth } from "../auth/LoginPage"

function MainLayout() {
  const [logged] = useAuth()

  if (!logged) return <Navigate to='/login'/>
  
  return (
    <div className="flex h-screen overflow-hidden">
      <header className="w-3/12 bg-gray-300/20">
        <SideBar/>
      </header>
      <main className="w-11/12 overflow-y-scroll">
        <Profile/>
        <Outlet className="w-full"/>
      </main>
    </div>
  )
}

export default MainLayout