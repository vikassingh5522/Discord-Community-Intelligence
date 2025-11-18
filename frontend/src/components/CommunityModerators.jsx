import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function CommunityModerators() {
  const [data, setData] = useState(null);

  const loadMods = async () => {
    try {
      const res = await api.get("/analytics/moderators");
      setData(res.data);
    } catch (err) {
      console.error("Moderator error:", err);
    }
  };

  useEffect(() => {
    loadMods();
  }, []);

  if (!data) return <div className="text-gray-300">Loading…</div>;

  return (
    <div className="bg-[#1F2937] p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">🛡 Moderator Effectiveness</h2>

      {data.moderators.map((m, i) => (
        <div
          key={i}
          className="p-3 rounded bg-[#111827] mb-3 shadow-lg border border-gray-800"
        >
          <p className="text-white font-semibold">{m.username}</p>

          <div className="text-gray-300 text-sm mt-1">
            <p>
              Warnings: <span className="text-yellow-400">{m.warnings}</span>
            </p>
            <p>
              Deleted Messages:{" "}
              <span className="text-red-400">{m.deletedMessages}</span>
            </p>
            <p>
              Spam Removed:{" "}
              <span className="text-blue-400">{m.spamRemoved}</span>
            </p>
            <p>
              Avg Response Time:{" "}
              <span className="text-green-400">{m.averageResponseTime} sec</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
