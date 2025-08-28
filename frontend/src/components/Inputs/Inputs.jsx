import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'

const Input = ({ value, onChange, label, placeholder, type, className }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="mb-4">
      <label className="text-[13px] font-medium text-gray-700">{label}</label>
      <div className="input-box flex items-center border border-gray-200 rounded-lg bg-gray-100 px-4 focus-within:border-orange-500 transition-colors duration-600 ">
  <input
    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
    placeholder={placeholder}
    className="w-full h-10 bg-transparent outline-none"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
  {type === "password" && (
    showPassword ? (
      <FaRegEyeSlash
        className="text-orange-500 cursor-pointer ml-2"
        onClick={toggleShowPassword}
      />
    ) : (
      <FaRegEye
        className="text-slate-400 cursor-pointer ml-2"
        onClick={toggleShowPassword}
      />
    )
  )}
</div>

    </div>
  )
}

export default Input
