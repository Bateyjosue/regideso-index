import { Link } from "react-router-dom"

const NotFound: React.FC = () => {
  return (
    <div
      id="error-page"
      className="bg-blue-500 h-screen flex flex-col justify-center items-center gap-8 text-white">
      <h1 className="text-6xl ">404!</h1>
      <p>Page Not found</p>
      <p>
        <i>Sorry, the page you are looking for does not exist</i>
      </p>
      <Link to="/" className="border px-6 py-2 rounded-lg font-bold" >Go back</Link>
    </div>
  )
}

export default NotFound;