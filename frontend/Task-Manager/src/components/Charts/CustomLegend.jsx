// src/components/Charts/CustomLegend.jsx
import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-5 mt-4">
      {payload?.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center space-x-2"
        >
          <div
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm font-semibold text-gray-200">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
