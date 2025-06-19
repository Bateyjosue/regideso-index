import { Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import Header from "../ui/Header"
import Sidebar from "../ui/Sidebar"
import { useState } from "react"

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  const profile = {
    fullName: user?.user_metadata?.full_name || user?.email || 'User',
    role: user?.user_metadata?.role || 'User'
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark h-screen">
      <div className="flex overflow-hidden h-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} profile={profile}/>

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}