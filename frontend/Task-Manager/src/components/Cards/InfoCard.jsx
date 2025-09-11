import React from "react";

const InfoCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
      {/* Optional colored icon or dot */}
      {Icon ? (
        <Icon className={`text-2xl ${color}`} />
      ) : (
        <div className={`w-3 h-3 ${color} rounded-full`} />
      )}

      {/* Text info */}
      <div className="flex flex-col">
        <span className="text-xs md:text-sm text-gray-300 font-medium">{label}</span>
        <span className="text-lg md:text-xl font-bold text-white">{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
