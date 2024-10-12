import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom"
// import MainLayout from "./components/layout/MainLayout"
import ErrorPage from "./components/Error/ErrorPage"

import { Toaster } from 'react-hot-toast';
import MainLayout from "./components/layout/MainLayout";
import SignUp from "./components/pages/auth/SignUp";
import LoginPage from "./components/pages/auth/Login";

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
        </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<ErrorPage />}></Route>
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
