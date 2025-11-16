import React, { useEffect, useState } from "react";
import api from "../api/axios";
import GrowthChart from "../components/GrowthChart";
import MonthlyChart from "../components/MonthlyChart";
import WeeklyChart from "../components/WeeklyChart";

export default function GrowthPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/analytics/growth");
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load growth data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalUsers = data?.totalUsers ?? 0;
  const highestDay = data?.joinCounts
    ? Object.keys(data.joinCounts).sort((a, b) => data.joinCounts[b] - data.joinCounts[a])[0]
    : "—";

  return (
    <div className="min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8">📈 Server Growth Analytics</h1>

      {loading ? (
        <div className="text-gray-300">Loading charts…</div>
      ) : (
        <div className="space-y-10">

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-lg text-gray-300">Total Users</h2>
              <p className="text-4xl font-bold text-indigo-400">{totalUsers}</p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-lg text-gray-300">Highest Growth Day</h2>
              <p className="text-3xl font-bold text-pink-400">{highestDay}</p>
            </div>

          </div>

          
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Daily User Growth</h2>
            <GrowthChart data={data?.joinCounts ?? {}} />
          </div>

         
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Weekly Growth Overview</h2>
            <WeeklyChart data={data?.weeklyCounts ?? {}} />
          </div>

         
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Monthly Growth</h2>
            <MonthlyChart data={data?.monthlyCounts ?? {}} />
          </div>

        </div>
      )}
    </div>
  );
}
