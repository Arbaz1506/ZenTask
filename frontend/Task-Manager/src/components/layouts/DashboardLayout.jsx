import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-gray-100">
      
      {/* Sidebar */}
      {user && (
        <SideMenu activeMenu={activeMenu} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar activeMenu={activeMenu} />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6 m-2 md:m-4 bg-white/5 backdrop-blur-sm rounded-l-3xl shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
