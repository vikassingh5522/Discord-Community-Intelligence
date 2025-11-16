import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#34d399", "#f472b6", "#f59e0b"];

export default function ChannelPieChart({ data }) {
  const series = Object.keys(data).map((cat, i) => ({
    name: cat,
    value: data[cat],
  }));

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={series}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {series.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
