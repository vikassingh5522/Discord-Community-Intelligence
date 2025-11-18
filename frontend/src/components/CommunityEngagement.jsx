import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function CommunityEngagement() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get("/analytics/engagement");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching engagement:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div className="text-gray-300">Loading...</div>;

  return (
    <div className="bg-[#1F2937] p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">🔥 Engagement Scores</h2>

      {data.topUsers.map((u, i) => (
        <div
          key={i}
          className="flex justify-between p-3 rounded bg-[#111827] mb-2 shadow"
        >
          <span className="text-gray-200">{u.username}</span>
          <span className="text-green-400 font-bold">{u.score}</span>
        </div>
      ))}
    </div>
  );
}
