import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function VoiceMetrics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVoiceStats = async () => {
    try {
      const res = await api.get("/analytics/voice-metrics");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching voice metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoiceStats();
  }, []);

  if (loading) return <div className="p-6 text-gray-300">Loading Voice Metrics...</div>;
  if (!stats) return <div className="p-6 text-gray-300">No data available</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">🎙 Voice Metrics Dashboard</h1>


      {/* ============== SUMMARY CARDS ============== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="bg-[#1F2937] p-5 rounded-lg">
          <p className="text-gray-300">Total Voice Messages</p>
          <h2 className="text-3xl font-bold">{stats.totalVoiceMessages}</h2>
        </div>

        <div className="bg-[#1F2937] p-5 rounded-lg">
          <p className="text-gray-300">Avg Duration (sec)</p>
          <h2 className="text-3xl font-bold">{stats.averageDuration}</h2>
        </div>

        <div className="bg-[#1F2937] p-5 rounded-lg">
          <p className="text-gray-300">Voice Emojis Used</p>
          <h2 className="text-3xl font-bold">{stats.topEmojis.length}</h2>
        </div>

      </div>


      {/* ============== TOP USERS ============== */}
      <h2 className="text-xl font-semibold mb-2">👤 Top Users Sending Voice Messages</h2>
      <div className="bg-[#1F2937] p-5 rounded-lg mb-8">
        {stats.topUsers.length === 0 ? (
          "No user data"
        ) : (
          stats.topUsers.map((u, i) => (
            <div key={i} className="flex justify-between p-2 bg-[#111827] mb-2 rounded">
              <span>{u.username}</span>
              <span>{u.count}</span>
            </div>
          ))
        )}
      </div>


      {/* ============== TOP CHANNELS ============== */}
      <h2 className="text-xl font-semibold mb-2">📢 Top Channels for Voice Messages</h2>
      <div className="bg-[#1F2937] p-5 rounded-lg mb-8">
        {stats.topChannels.length === 0 ? (
          "No channel data"
        ) : (
          stats.topChannels.map((c, i) => (
            <div key={i} className="flex justify-between p-2 bg-[#111827] mb-2 rounded">
              <span>{c.channel}</span>
              <span>{c.count}</span>
            </div>
          ))
        )}
      </div>


      {/* ============== EMOJI USAGE ============== */}
      <h2 className="text-xl font-semibold mb-2">🎧 Most Used Voice Emojis</h2>
      <div className="bg-[#1F2937] p-5 rounded-lg">
        {stats.topEmojis.length === 0 ? (
          "No emojis used"
        ) : (
          stats.topEmojis.map((e, i) => (
            <div key={i} className="flex justify-between p-2 bg-[#111827] mb-2 rounded">
              <span className="text-2xl">{e.emoji}</span>
              <span>{e.count}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
