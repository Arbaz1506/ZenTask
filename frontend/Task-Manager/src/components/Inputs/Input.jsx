import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type = "text", error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full mb-4 relative">
      {label && (
        <label className="block text-sm font-medium text-white/80 mb-1">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-2xl px-4 py-3 pr-10
            text-sm md:text-base outline-none
            focus:ring-2 focus:ring-purple-400 focus:border-purple-400
            transition-all duration-300
            hover:border-white/40
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-white/50 hover:text-purple-400 focus:outline-none transition-colors duration-200"
          >
            {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
