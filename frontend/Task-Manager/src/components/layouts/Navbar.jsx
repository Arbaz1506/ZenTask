import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-md border-b border-gray-200/20 shadow-sm sticky top-0 z-50"
        role="banner"
        aria-label="Main navigation bar"
      >
        {/* Mobile toggle */}
        <button
          className="md:hidden text-2xl text-gray-100 hover:text-purple-400 transition-all"
          onClick={() => setOpenSideMenu(!openSideMenu)}
          aria-label={openSideMenu ? "Close menu" : "Open menu"}
        >
          {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        {/* Brand */}
        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 select-none">
          ZenTask
        </h1>

        {/* Task manager message */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-gray-200 text-sm font-medium select-none">
            Organize your day, master your tasks
          </span>
        </div>
      </nav>

      {/* Mobile SideMenu Overlay */}
      {openSideMenu && (
        <div
          className="fixed inset-0 z-40 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Side menu"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpenSideMenu(false)}
            aria-hidden="true"
          ></div>

          {/* SideMenu */}
          <div className="relative w-64 h-full bg-white/10 backdrop-blur-md shadow-lg rounded-tr-3xl rounded-br-3xl p-6">
            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
