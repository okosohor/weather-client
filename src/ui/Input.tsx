import React from 'react';

interface Props {
  placeholder?: string;
  name: string;
  value: string;
  error?: string
  type: 'text' | 'email' | 'password';
  handleChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input({ name, value, type, handleChange, error, placeholder = "" }: Props) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleChange(e.target.value);
  }
  return (
    <>
    <label className="relative block w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="peer w-full placeholder:text-white focus:placeholder:text-gray-500 border-b-2 border-gray-300 bg-transparent py-2 px-0 text-gray-900 focus:outline-none focus:border-indigo-600"
      />
      <span
        className={"absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-indigo-600 pointer-events-none " + (value ? "top-[-10px]" : "")}
      >
        {name}
      </span>
      {error && <span className='text-red-500 text-xs absolute bottom-[-15px] left-0'>{error}</span>}
    </label>
    </>
  );
}
