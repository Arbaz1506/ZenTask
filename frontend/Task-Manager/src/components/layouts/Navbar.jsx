import React from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Navbar = ({ isSidebarOpen, onMenuClick }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-md border-b border-gray-200/20 shadow-sm sticky top-0 z-50">
      {/* Mobile Toggle */}
      <button
        className="md:hidden text-2xl text-gray-100 hover:text-purple-400 transition-all"
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <HiX /> : <HiOutlineMenu />}
      </button>

      {/* Brand */}
      <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 select-none">
        ZenTask
      </h1>

      {/* Desktop message */}
      <div className="hidden md:flex items-center gap-4">
        <span className="text-gray-200 text-sm font-medium select-none">
          Organize your day, master your tasks
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
