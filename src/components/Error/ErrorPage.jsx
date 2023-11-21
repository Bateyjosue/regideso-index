import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="bg-blue-500 h-screen flex flex-col justify-center items-center gap-8 text-white">
      <h1 className="text-6xl ">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="border px-6 py-2 rounded-lg font-bold" >Go back</Link>
    </div>
  );
}