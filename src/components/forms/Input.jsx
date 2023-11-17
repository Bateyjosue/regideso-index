/* eslint-disable react/prop-types */

function Input({type, placeholder, className}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border-b-2 py-2 outline-none font-semibold ${className}`}
      />
    </>
  )
}

export default Input