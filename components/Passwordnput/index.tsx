import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IconType } from "react-icons";

interface PasswordInputProps {
  label: string;
  id: string;
  icon: IconType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, icon: Icon, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative w-full mb-6 group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="text-purple-500" />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        className="block py-2.5 px-4 pl-10 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-purple-600 peer"
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] left-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-purple-600"
      >
        {label}
      </label>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePassword}>
        {showPassword ? <AiOutlineEyeInvisible className="text-purple-500" /> : <AiOutlineEye className="text-purple-500" />}
      </div>
    </div>
  );
};

export default PasswordInput;
