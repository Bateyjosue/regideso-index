import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import ErrorPage from "./components/Error/ErrorPage"
import LoginPage from "./components/auth/LoginPage"
import RegisterPage from "./components/auth/RegisterPage"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'dashboard',
          // element: <RegisterPage />
        },
      ]
    },
    {
      path: '/register',
      element: <RegisterPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
