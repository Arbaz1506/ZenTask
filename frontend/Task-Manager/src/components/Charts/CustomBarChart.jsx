import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Priority colors
const PRIORITY_COLORS = {
  Low: "#10B981",    // green
  Medium: "#F59E0B", // amber
  High: "#EF4444",   // red
};

// Custom tooltip with enhanced styling
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { priority, count } = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md shadow-lg border border-gray-700 select-none">
        <p className="font-semibold mb-0.5">{priority}</p>
        <p>Count: <span className="font-medium">{count}</span></p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ data }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl text-gray-100 max-w-full">
    <ResponsiveContainer width="100%" height={340}>
      <BarChart
        data={data}
        margin={{ top: 15, right: 30, left: 10, bottom: 20 }}
        barCategoryGap="18%"
        role="img"
        aria-label="Bar chart showing task counts per priority"
      >
        <CartesianGrid stroke="#374151" strokeDasharray="3 3" opacity={0.25} />
        <XAxis
          dataKey="priority"
          stroke="#D1D5DB"
          fontSize={14}
          tickLine={false}
          axisLine={false}
          padding={{ left: 20, right: 20 }}
          interval={0}
        />
        <YAxis
          stroke="#D1D5DB"
          fontSize={14}
          tickLine={false}
          axisLine={{ stroke: "#4B5563", strokeWidth: 1 }}
          width={40}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(156, 163, 175, 0.2)" }} />
        <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={70} minPointSize={5}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.priority] || "#6366F1"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default CustomBarChart;
