/* eslint-disable react/prop-types */

function Input({type, placeholder, label,value, className, register}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border-b-2 py-2 outline-none font-semibold ${className}`}
        value={value}
        {...register(label, {required: true})}
      />
    </>
  )
}

export default Input