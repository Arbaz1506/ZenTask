import React from "react";
import proDef from "../../assets/images/proDef.jpg"; // fallback image
import { LuMail } from "react-icons/lu";

// ✅ Minimal & Elegant StatCard
const StatCard = ({ label, count, status }) => {
  const getBgColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-blue-600/30 text-blue-300";
      case "Completed":
        return "bg-green-600/30 text-green-300";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-300";
      default:
        return "bg-gray-700/30 text-gray-200";
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg ${getBgColor()} min-w-[80px] shadow-sm
        hover:shadow-lg transition-shadow duration-300`}
      role="region"
      aria-label={`${label} tasks count`}
    >
      <span className="text-xl font-semibold select-none">{count}</span>
      <span className="text-xs mt-1 select-none whitespace-nowrap">{label}</span>
    </div>
  );
};

// ✅ Elegant UserCard with enhanced UI
const UserCard = ({ userInfo }) => {
  const totalTasks =
    (userInfo?.pendingTasks || 0) +
    (userInfo?.inProgressTasks || 0) +
    (userInfo?.completedTasks || 0);

  return (
    <div
      className="w-full bg-white/5 backdrop-blur-md rounded-3xl shadow-lg p-6 flex flex-col gap-6 hover:scale-[1.03] transition-transform duration-300 border border-gray-700/60"
      role="article"
      aria-label={`User card for ${userInfo?.name || "Unnamed User"}`}
    >
      {/* Top: Avatar + Info */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src={userInfo?.profileImageUrl || proDef}
            alt={`Avatar of ${userInfo?.name || "Unnamed User"}`}
            className="w-20 h-20 rounded-full border-2 border-gray-600 shadow-lg object-cover"
            loading="lazy"
          />
          <span
            className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-gray-700 transition-colors duration-700 ease-in-out
              ${
                userInfo?.isOnline
                  ? "bg-green-400 animate-pulse"
                  : "bg-gray-500"
              }`}
            aria-label={userInfo?.isOnline ? "Online" : "Offline"}
            title={userInfo?.isOnline ? "Online" : "Offline"}
          ></span>
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-semibold text-white tracking-wide leading-tight truncate max-w-xs">
            {userInfo?.name || "Unnamed User"}
          </p>
          <p className="text-sm text-gray-300 flex items-center gap-2 mt-1 max-w-xs truncate">
            <LuMail className="inline text-gray-400" aria-hidden="true" />
            <span className="truncate">{userInfo?.email || "No email"}</span>
          </p>
          <span className="mt-2 text-xs px-4 py-1 bg-gray-700/50 text-white rounded-full shadow-sm w-max select-none">
            {userInfo?.role || "Member"}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mt-3 justify-start">
        <StatCard label="Pending" count={userInfo?.pendingTasks || 0} status="Pending" />
        <StatCard label="In Progress" count={userInfo?.inProgressTasks || 0} status="In Progress" />
        <StatCard label="Completed" count={userInfo?.completedTasks || 0} status="Completed" />
        <StatCard label="Total" count={totalTasks} />
      </div>
    </div>
  );
};

export { UserCard, StatCard };
