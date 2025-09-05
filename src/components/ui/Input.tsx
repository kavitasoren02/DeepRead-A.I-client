import React, { useState } from "react";
import type { InputProps } from "../../Service/interface";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handletogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType =
    showPassword && props.type === "password" ? "text" : props.type;

  return (
    <div className="relative mb-4 w-full max-w-md">
      <div className="relative">
        <input
          {...props}
          type={inputType}
          className="
  w-full
  max-w-md
  mt-1
  lg:mt-[10px]
  px-4
  py-3
  text-black
  bg-transparent
  border
  border-[#ACACB1]
  focus:outline-none
  focus:border-black
  focus:ring-2
   focus:ring-black
  placeholder:text-gray-400
  text-sm
  sm:text-base
"
        />
        {props.type === "password" && (
          <div
            onClick={handletogglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <FaEyeSlash className="text-black text-base sm:text-lg" />
            ) : (
              <FaEye className="text-black text-base sm:text-lg" />
            )}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
