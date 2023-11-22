import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import ErrorPage from "./components/Error/ErrorPage"
import LoginPage from "./components/auth/LoginPage"
import RegisterPage from "./components/auth/RegisterPage"
import IndexClient, {loader as indexLoader} from "./components/clients/IndexClient"
import Fuite, {loader as leakesLoader} from "./components/clients/Fuite"
import Dashboard, {loader} from "./components/clients/Dashboard"
import Subscribers, {loader as subLoader} from "./components/clients/Subscribers"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route errorElement={<ErrorPage />}>
          <Route path="/" element={<MainLayout />} >
            <Route index element={<Dashboard />} loader={loader} />
            <Route path="index-client" element={<IndexClient />} loader={indexLoader}/>
            <Route path="fuites" element={<Fuite />} loader={leakesLoader}/>
            <Route path="subscriber" element={<Subscribers />} loader={subLoader}/>
          </Route>
        </Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
