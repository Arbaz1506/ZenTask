import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => setActiveTab(tab.label)}
          className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${
              activeTab === tab.label
                ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
            }`}
        >
          {/* Tab Label */}
          <span>{tab.label}</span>

          {/* Count Badge */}
          <span
            className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-colors
              ${
                activeTab === tab.label
                  ? "bg-white text-blue-600 shadow-sm"
                  : "bg-gray-300 text-gray-700 group-hover:bg-gray-400"
              }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskStatusTabs;
