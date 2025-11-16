import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function WeeklyChart({ data }) {
  const series = Object.keys(data).map((week) => ({
    week,
    value: data[week],
  }));

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={series}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="week" tick={{ fill: "#ddd" }} />
          <YAxis tick={{ fill: "#ccc" }} />
          <Tooltip />
          <Bar dataKey="value" fill="#34d399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
