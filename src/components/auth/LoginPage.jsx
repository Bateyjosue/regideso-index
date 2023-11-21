import { Link, Navigate } from "react-router-dom"
import Input from "../forms/Input"
import { useForm } from "react-hook-form"
import { createAuthProvider } from "react-token-auth"

export const [useAuth, authFetch, login, logout] = createAuthProvider({
    accessTokenKey: 'accessToken',
    onUpdateToken: (token) => fetch('/update-token', {
      method: 'POST',
      body: token.loginResponse.refeshToken
    }).then((response) => response.json())
  })

const baseUrl = 'https://regi-api.bingwainnovationhub.com/v1/'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm()


  
  
  const onSubmit = async data => {
    try {
      const responseLogin = await fetch(`${baseUrl}users/signin`, {
        method: "POST",
        cache: "reload",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      },)
      const loginData = await responseLogin.json()
      if(JSON.stringify(loginData).status != 200)alert(JSON.stringify(loginData))
      login(data)
    }
    catch (error) {
      console.log(error);
    }
    
  }

  console.log('isAuth', useAuth());

  if(useAuth()) return <Navigate to="/" replace />


  return (
    <main>
      <section className="w-full h-screen grid grid-cols-2 place-content-center place-items-center">
        <article className="">
          <img src="/src/assets/bg-1.webp" alt="" className="w-full h-screen " />
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
            <button className="rounded-full bg-blue-500 w-2/4 mx-auto text-sm py-2 text-white font-bold" type="submit">Login</button>
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