import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom"
import ErrorPage from "./components/Error/ErrorPage"
import { Toaster } from 'react-hot-toast';
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./components/pages/auth/Login";
import NotFound from "./components/pages/NotFound";

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
