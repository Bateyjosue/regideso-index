import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Header from "../ui/Header";
import Sidebar from "../ui/Sidebar";
import supabase from "../../data/supabase.d";
import { User } from "@supabase/supabase-js";
// import SideBar from "../navigation/SideBar"
// import Profile from "../navigation/Profile"
// import { useAuth } from "../auth/LoginPage"

const MainLayout: React.FC = ()=> {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    (
      async () => {
        const { data: subscription } = await supabase.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            setUser(session?.user);
          } else {
            setUser(null);
            navigate('/login')
          }
        });

        return () => {
          subscription?.subscription.unsubscribe();
        };
      }
    )()
  }, []);


  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark h-screen">
      <div className="flex overflow-hidden h-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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

export default MainLayout