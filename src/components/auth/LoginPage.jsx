import { Link } from "react-router-dom"
import Input from "../forms/Input"

function LoginPage() {
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
          <form action=""
            className="flex flex-col gap-4 my-32 w-96">
          <Input
            placeholder="Numéro de Telephone: 0979087532"
              type="text"
            />
          
          <Input
            placeholder="Mot de passe"
              type="password"
            />
            <span
              className="text-xs text-blue-500 font-semibold -mt-3 cursor-pointer">Forget Password?</span>
            <button className="rounded-full bg-blue-500 w-2/4 mx-auto text-sm py-2 text-white font-bold ">Login</button>
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