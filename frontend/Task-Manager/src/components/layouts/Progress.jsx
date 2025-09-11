import React from "react";

const Progress = ({ progress, status }) => {
  const getColor = () => {
    switch (status) {
      case "In Progress":
        return "from-cyan-400 to-cyan-600";
      case "Completed":
        return "from-indigo-400 to-indigo-600";
      default:
        return "from-violet-400 to-violet-600";
    }
  };

  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
      <div
        className={`h-2.5 rounded-full bg-gradient-to-r ${getColor()} transition-all duration-500 ease-out`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Progress;
