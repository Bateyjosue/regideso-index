import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import ErrorPage from "./components/Error/ErrorPage"
import MainLayout from "./components/layout/MainLayout"
import LoginPage from "./components/pages/auth/Login"
import BiometricSetup from "./components/pages/auth/BiometricSetup"
import AgentMobileLogin from "./components/pages/auth/AgentMobileLogin"
import NotFound from "./components/pages/NotFound"
import DirectionLayout from "./components/layout/DirectionLayout"
import AgentLayout from "./components/layout/AgentLayout"
import SubscriberLayout from "./components/layout/SubscriberLayout"
import Dashboard from "./components/ui/Dashboard"
import Direction from "./components/ui/Direction"
import { Agency, Avenue } from "./components/pages/direction"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={<LoginPage />} errorElement={<ErrorPage />} />
        <Route path="/biometric-setup" element={<BiometricSetup />} errorElement={<ErrorPage />} />
        <Route path="/agent-login" element={<AgentMobileLogin />} errorElement={<ErrorPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } errorElement={<ErrorPage />}>
          <Route index element={<Dashboard />} />
          <Route path="/direction" element={<DirectionLayout/>}>
            <Route index element={<Direction />} />
            <Route path="agency" element={<Agency />} />
            <Route path="avenue" element={<Avenue />} />
          </Route>
          <Route path="/agent" element={<AgentLayout />}>
            <Route path="level" element={<div>Agent Level</div>}/>
            <Route path="category" element={<div>Agent Category</div>}/>
          </Route>
          <Route path="/subscriber" element={<SubscriberLayout />}>
            <Route path="category" element={<div>Subscriber Category</div>}/>
          </Route>
        </Route>
        
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    )
  )

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App