import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MessageBarChart({ data }) {
  const series = Object.keys(data).map((day) => ({
    day,
    messages: data[day],
  }));

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={series}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="day" tick={{ fill: "#ccc" }} />
          <YAxis tick={{ fill: "#ccc" }} />
          <Tooltip />
          <Bar dataKey="messages" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
