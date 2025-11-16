import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function GrowthChart({ data }) {
  const series = Object.keys(data)
    .sort()
    .map((day) => ({ day, value: data[day] }));

  if (series.length === 0)
    return <div className="text-gray-500">No growth data</div>;

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={series}>
          <defs>
            <linearGradient id="dailyColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#ddd" }} />
          <YAxis tick={{ fill: "#ccc" }} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#7c3aed"
            fillOpacity={1}
            fill="url(#dailyColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
