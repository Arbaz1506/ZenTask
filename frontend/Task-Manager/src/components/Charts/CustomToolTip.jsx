// src/components/Charts/CustomTooltip.jsx
import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];

    return (
      <div className="bg-gray-900/95 text-gray-100 rounded-xl px-4 py-2 shadow-lg border border-gray-700">
        {/* Status */}
        <p className="text-xs uppercase tracking-wide font-medium text-gray-400 mb-1">
          {data.name}
        </p>

        {/* Count */}
        <p className="text-sm">
          Count:{" "}
          <span
            className="font-semibold"
            style={{ color: data.color }}
          >
            {data.value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
