// src/components/Inputs/SelectDropdown.jsx
import React, { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-white/20 border border-gray-600 text-gray-100 text-sm focus:outline-none"
      >
        <span>
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder || "Select..."}
        </span>
        {isOpen ? (
          <LuChevronUp className="text-gray-300 text-lg" />
        ) : (
          <LuChevronDown className="text-gray-300 text-lg" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-3 py-2 cursor-pointer text-sm text-gray-100 hover:bg-gray-700 transition ${
                value === option.value ? "bg-gray-700" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
