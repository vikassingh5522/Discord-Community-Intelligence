import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function CommunityRetention() {
  const [data, setData] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/analytics/retention");
      setData(res.data);
    } catch (err) {
      console.error("Retention error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!data) return <div className="text-gray-300">Loading…</div>;

  return (
    <div className="bg-[#1F2937] p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">📈 New Member Retention</h2>

      <div className="bg-[#111827] p-4 rounded mb-3 shadow">
        <p className="text-gray-300">New Members (30 days)</p>
        <h3 className="text-2xl font-bold text-white">{data.newMembers}</h3>
      </div>

      <div className="bg-[#111827] p-4 rounded mb-3 shadow">
        <p className="text-gray-300">Active Last 7 Days</p>
        <h3 className="text-2xl font-bold text-white">{data.retained}</h3>
      </div>

      <div className="bg-[#111827] p-4 rounded shadow">
        <p className="text-gray-300">Retention Rate</p>
        <h3 className="text-2xl font-bold text-green-400 animate-pulse">
          {data.retentionRate}%
        </h3>
      </div>
    </div>
  );
}
