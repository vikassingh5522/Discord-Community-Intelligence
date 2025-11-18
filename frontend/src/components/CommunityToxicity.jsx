import React, { useState, useEffect } from "react";
import api from "../api/axios";

export default function CommunityToxicity() {
  const [data, setData] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/analytics/toxicity");
      setData(res.data);
    } catch (err) {
      console.error("Error loading toxicity:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!data) return <div className="text-gray-300">Loading…</div>;

  return (
    <div className="bg-[#1F2937] p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">⚠️ Toxicity Levels</h2>

      {data.toxicity.map((u, i) => (
        <div
          key={i}
          className="flex justify-between p-3 rounded bg-[#111827] mb-2 shadow"
        >
          <span className="text-gray-200">{u.username}</span>
          <span className="text-red-400 font-bold">{u.toxicMessages}</span>
        </div>
      ))}
    </div>
  );
}
