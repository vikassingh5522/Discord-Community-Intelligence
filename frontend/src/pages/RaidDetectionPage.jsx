import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import RaidCard from "../components/RaidCard";

export default function RaidDetectionPage() {
  const [raids, setRaids] = useState([]);
  const [loading, setLoading] = useState(true);

  const tempRaids = [
    {
      severity: "High",
      count: 12,
      start: "2025-11-18T10:21:00Z",
      end: "2025-11-18T10:28:00Z",
      users: [
        { id: 1, username: "spam_bot_001", joinedAt: "10:22 AM" },
        { id: 2, username: "raid_member_02", joinedAt: "10:22 AM" },
        { id: 3, username: "attack_user_15", joinedAt: "10:23 AM" },
      ],
    },
    {
      severity: "Medium",
      count: 6,
      start: "2025-11-17T09:15:00Z",
      end: "2025-11-17T09:20:00Z",
      users: [
        { id: 4, username: "test_raid003", joinedAt: "09:16 AM" },
        { id: 5, username: "chat_spammer", joinedAt: "09:17 AM" },
      ],
    },
  ];

  useEffect(() => {
    api
      .get("/analytics/raids")
      .then((res) => {
        if (res.data && res.data.raids && res.data.raids.length > 0) {
          setRaids(res.data.raids);
        } else {
          setRaids(tempRaids); 
        }
        setLoading(false);
      })
      .catch(() => {
        setRaids(tempRaids); 
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-white text-xl">Loading raid detection...</div>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">⚠️ Raid Detection</h1>

      {raids.length === 0 ? (
        <div className="text-gray-400 text-lg">No raids detected</div>
      ) : (
        raids.map((raid, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <RaidCard raid={raid} index={i} />
          </motion.div>
        ))
      )}

      {/* RAW DATA TABLE */}
      <h2 className="text-2xl font-bold mt-12 mb-4">📊 Raw Raid Records</h2>
      <div className="bg-[#111827] p-4 rounded-xl border border-gray-700 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">#</th>
              <th className="p-2">Severity</th>
              <th className="p-2">User Count</th>
              <th className="p-2">Start</th>
              <th className="p-2">End</th>
            </tr>
          </thead>
          <tbody>
            {raids.map((r, i) => (
              <tr key={i} className="border-b border-gray-800">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{r.severity}</td>
                <td className="p-2">{r.count}</td>
                <td className="p-2">{r.start}</td>
                <td className="p-2">{r.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
