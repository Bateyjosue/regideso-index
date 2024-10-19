import { ErrorInfo, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Header from "../ui/Header";
import Sidebar from "../ui/Sidebar";
import supabase from "../../data/supabase.d";
import { PostgrestError, User } from "@supabase/supabase-js";
import useGetAgent from "../../hooks/useGetAgent";
import { getAgent, getAgentLevel } from "../../data/agent/agentService";
// import SideBar from "../navigation/SideBar"
// import Profile from "../navigation/Profile"
// import { useAuth } from "../auth/LoginPage"

import { IAgent, ILevel, IProfile } from '../../data/types/index';
import toast from "react-hot-toast";


const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [agent, setAgent] = useState<IAgent | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [level, setLevel] = useState<ILevel | null>(null);
  const navigate = useNavigate()

  const profile: IProfile = {
    fullName: `${agent?.firstname} ${agent?.lastname}`,
    role: level?.name!
  }

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


  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (user?.id) {
        const { agent, error } = await getAgent(user?.id);
        const {level, error: errorLevel} = await getAgentLevel(agent?.[0].code_level)

        console.log(level);
        console.log(errorLevel);

        if (isMounted) {
          if (error || errorLevel) {
            setError(error);
          }
          if (agent?.length !== 0) {
            setAgent(agent?.[0]);
          }
          if (level?.length !== 0) { 
            setLevel(level?.[0]);
          }
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  if (error) {
    toast(`${error?.message}`);
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

export default MainLayout