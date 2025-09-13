import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import PRO_DEF from "../../assets/images/proDef.jpg";
import { IoMdClose } from "react-icons/io";

const SideMenu = ({ activeMenu, isOpen, setIsOpen }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setSideMenuData(user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
  }, [user]);

  const handleClick = (route) => {
    if (route === "/logout") {
      localStorage.clear();
      if (clearUser) clearUser();
      navigate("/login");
      setIsOpen(false);
      return;
    }
    navigate(route);
    setIsOpen(false); // Close sidebar on mobile after click
  };

  if (!user) return <div className="p-4 text-gray-400">Loading menu...</div>;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-purple-900/40 via-indigo-900/20 to-slate-900/30
          backdrop-blur-lg shadow-xl rounded-tr-3xl rounded-br-3xl p-6 flex flex-col gap-6
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static
        `}
      >
        {/* Mobile Close Button */}
        <button
          className="md:hidden self-end mb-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          <IoMdClose className="w-6 h-6" />
        </button>

        {/* Profile Card */}
        <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-inner border border-white/20">
          <div className="relative">
            <img
              src={user.profileImageUrl || PRO_DEF}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-purple-400 shadow-md"
            />
            <span className="absolute -bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/50"></span>
          </div>
          {user.role === "admin" && (
            <span className="text-xs text-purple-300 font-semibold uppercase mt-2 tracking-wide">Admin</span>
          )}
          <h5 className="text-md font-semibold mt-1 truncate">{user.name || ""}</h5>
          <p className="text-xs text-gray-300 truncate">{user.email || ""}</p>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-3 flex-1">
          {sideMenuData.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.label;

            return (
              <div
                key={item.id}
                onClick={() => handleClick(item.path)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 transform ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-white shadow-lg scale-105"
                    : "text-gray-200 hover:bg-white/20 hover:scale-105"
                }`}
              >
                <Icon
                  className={`text-lg transition-all duration-500 ${
                    isActive
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200 animate-gradient"
                      : "text-gray-200"
                  }`}
                />
                <span className="font-medium truncate">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-auto text-xs text-gray-400 text-center">
          &copy; 2025 ZenTask
        </div>

        {/* Gradient Animation Keyframes */}
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideMenu;
