import React from "react";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  return (
    <>
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-md border-b border-gray-200/20 shadow-sm sticky top-0 z-50"
        role="banner"
        aria-label="Main navigation bar"
      >
        {/* Mobile toggle is inside SideMenu now */}
        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 select-none">
          ZenTask
        </h1>

        {/* Optional desktop message */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-gray-200 text-sm font-medium select-none">
            Organize your day, master your tasks
          </span>
        </div>
      </nav>

      {/* SideMenu */}
      <SideMenu activeMenu={activeMenu} />
    </>
  );
};

export default Navbar;
