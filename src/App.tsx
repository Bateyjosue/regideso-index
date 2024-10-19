import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom"
import ErrorPage from "./components/Error/ErrorPage"
import { Toaster } from 'react-hot-toast';
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./components/pages/auth/Login";
import NotFound from "./components/pages/NotFound";
import DirectionLayout from "./components/layout/DirectionLayout";
import AgentLayout from "./components/layout/AgentLayout";
import SubscriberLayout from "./components/layout/SubscriberLayout";

/**
 * The main application component.
 *
 * This component renders the main router and toaster.
 *
 * @returns The main application component.
 */
const App:React.FC = ()=> {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />} >
          <Route index element={<div>Dashboard</div>} />
          <Route path="/direction" element={<DirectionLayout/>}>
            <Route path="agency" element={<div>Direction / Agency</div>} />
            <Route path="avenue" element={<div>Direction / Avenue</div>} />
          </Route>
          <Route path="/agent" element={<AgentLayout />}>
            <Route path="level" element={<div>Agent Level</div>}/>
            <Route path="category" element={<div>Agent Category</div>}/>
          </Route>
          <Route path="/subscriber" element={<SubscriberLayout />}>
            <Route path="category" element={<div>Subscriber Category</div>}/>
          </Route>
        </Route>
      <Route path="/login" element={<LoginPage />} errorElement={<ErrorPage />} />
      <Route path="*" element={<NotFound />}></Route>
      </Route>
    )
  )

  return (
    <>
      <Toaster/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
