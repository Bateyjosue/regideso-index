import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import ErrorPage from "./components/Error/ErrorPage"
import LoginPage from "./components/auth/LoginPage"
import RegisterPage from "./components/auth/RegisterPage"
import IndexClient, {loader as indexLoader} from "./components/clients/IndexClient"
import Fuite, {loader as leakesLoader} from "./components/clients/Fuite"
import Dashboard, {loader} from "./components/clients/Dashboard"
import Subscribers from "./components/clients/Subscribers"
import AddSubscriber from "./components/clients/AddSubscriber"

import { Toaster } from 'react-hot-toast';
import QrCode from "./components/clients/QrCode"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />} >
          <Route index element={<Dashboard />} loader={loader} />
          <Route path="index-client" element={<IndexClient />} loader={indexLoader}/>
          <Route path="fuites" element={<Fuite />} loader={leakesLoader}/>
          <Route path="subscriber" element={<Subscribers />}/>
          <Route path="subscriber">
            <Route index element={<Subscribers />} />
            <Route path=":id" element={<QrCode />} />
          </Route>
          <Route path="new-subscriber" element={<AddSubscriber />}/>
          
        </Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
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
