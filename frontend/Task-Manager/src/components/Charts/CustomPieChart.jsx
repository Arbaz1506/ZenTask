import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomToolTip";

const DEFAULT_COLORS = [
  "url(#grad1)",
  "url(#grad2)",
  "url(#grad3)",
  "url(#grad4)",
];

const CustomPieChart = ({ data, colors = DEFAULT_COLORS }) => {
  return (
    <div
      className="w-full h-[380px] bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center"
      role="region"
      aria-label="Task status distribution chart"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow:
          "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 10px 2px rgba(255, 255, 255, 0.1)",
      }}
    >
   

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#F87171" />
            </linearGradient>
            <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
          </defs>

          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={80}
            labelLine={false}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={800}
            onMouseEnter={(e, index) => {
              // You can add slice expansion logic here if desired
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                className="cursor-pointer transition-transform duration-300 hover:scale-110 hover:drop-shadow-lg"
                style={{ transformOrigin: "center" }}
              />
            ))}
          </Pie>

          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{
              backgroundColor: "rgba(31, 41, 55, 0.9)",
              borderRadius: "0.75rem",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "10px 16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              fontSize: "0.9rem",
            }}
            animationDuration={250}
            delayShow={150}
          />

          <Legend
            content={<CustomLegend />}
            wrapperStyle={{
              marginTop: "16px",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.85)",
              userSelect: "none",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
