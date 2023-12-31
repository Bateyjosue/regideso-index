import { Link, useNavigate } from "react-router-dom"
import Input from "../forms/Input"
import { useForm } from "react-hook-form"
import { createAuthProvider } from "react-token-auth"
import IMAGES from "../../assets/images"
import { useState } from "react"
import toast from 'react-hot-toast'
import { Oval } from 'react-loader-spinner'



// eslint-disable-next-line react-refresh/only-export-components
export const [useAuth, authFetch, login, logout] = createAuthProvider({
    accessTokenKey: 'accessToken',
    onUpdateToken: (token) => fetch('/update-token', {
      method: 'POST',
      body: token.loginResponse.refeshToken
    }).then((response) => response.json()).then(data => console.log(data))
  })

const baseUrl = 'https://regi-api.bingwainnovationhub.com/v1/'

function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // const [data, setData] = useState(false)

  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm()

  const onSubmit = async data => {
    try {
      setLoading(true)
      const responseLogin = await fetch(`${baseUrl}users/signin`, {
        method: "POST",
        cache: "reload",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      },)
      const loginData = await responseLogin.json()
      if(JSON.stringify(loginData).status >= 200 && JSON.stringify(loginData).status <= 209)alert(JSON.stringify(loginData))
      login(data)
      localStorage.setItem('access_token', loginData.loginResponse.accessToken)
      setLoading(false)
      navigate('/', {replace: true})
    }
    catch (error) {
      setError(error);
      setLoading(false)
    }
  }

  if (error) {
    toast.error('Invalide Creadetials')
  }

  return (
    <main>
      <section className="w-full h-screen grid grid-cols-2 place-content-center place-items-center">
        <article className="">
          <img src={IMAGES.logo} alt="" className="w-full h-screen " />
        </article>
        <article className="">
          <h1 className="text-3xl font-semibold text-center">
            <span>Login</span>
            <hr className="text-blue-500 bg-blue-500 h-[3px] w-8 mx-auto mt-1 border-none outline-none rounder-lg"/>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 my-32 w-96">
            
          <Input
            placeholder="Numéro de Telephone: 0979087532"
              type="text"
              label="phone"
            register ={register}
            />
            {errors.telephone && <span className="text-sm text-red-400 -mt-4">This field is required</span>}

          <Input
            placeholder="Mot de passe"
              type="password"
              label="password"
            register={register}
            />
            {errors.password && <span className="text-sm text-red-400 -mt-4">This field is required</span>}

            <span
              className="text-xs text-blue-500 font-semibold -mt-3 cursor-pointer">Forget Password?</span>
            <button className={`rounded-full bg-blue-500 w-2/4 mx-auto text-sm py-2 text-white font-bold ${loading && ' flex gap-1'}`} type="submit">
              <span>
              {loading && (<Oval 
  height="20"
  width="80"
  radius={2}
  color="white"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>)}
              </span>
              <span>Login</span>
            </button>
            <span className="text-sm underline">
              Don&apos;t have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
            </span>
          </form>
        </article>
      </section>
    </main>
  )
}

export default LoginPage
