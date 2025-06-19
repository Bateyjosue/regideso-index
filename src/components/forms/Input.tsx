import React from 'react';

interface IAtributeInput {
  type: string;
  placeholder: string;
  label: string | null;
  value: string;
  className: string;
  register?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const Input: React.FC<IAtributeInput> = ({type, placeholder, label, value, className, register, onChange}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border-b-2 py-2 outline-none font-semibold ${className}`}
        value={value}
        {...register(label, { required: true })}
        onChange={(e) => onChange?.(e)}
      />
    </>
  )
}

export default Input