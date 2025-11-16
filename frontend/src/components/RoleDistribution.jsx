import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function RoleDistribution({ data }) {
  if (!data) return <div className="text-gray-500">No data</div>;

  const { roles } = data;

  const totalMembers = roles.reduce((a, b) => a + b.count, 0);

  const COLORS = [
    "#4ade80",
    "#60a5fa",
    "#f472b6",
    "#fbbf24",
    "#34d399",
    "#a78bfa",
    "#fb7185",
  ];

  return (
    <div className="space-y-6">
      
      <div className="p-4 bg-white/10 rounded-xl shadow flex justify-between">
        <div>
          <p className="text-gray-300 text-sm">Total Roles</p>
          <p className="text-2xl font-bold text-white">{roles.length}</p>
        </div>

        <div>
          <p className="text-gray-300 text-sm">Total Members</p>
          <p className="text-2xl font-bold text-white">{totalMembers}</p>
        </div>
      </div>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={roles}
              dataKey="count"
              nameKey="role"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {roles.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    
      <div className="space-y-3">
        <h2 className="text-white text-lg">Role Breakdown</h2>

        <ul className="space-y-2">
          {roles.map((r, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-3 bg-white/5 rounded-lg text-white"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="font-semibold">{r.role}</span>
              </div>

              <div>{r.count}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
