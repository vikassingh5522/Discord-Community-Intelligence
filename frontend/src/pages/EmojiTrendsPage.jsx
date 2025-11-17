import React, { useEffect, useState } from "react";
import api from "../api/axios";
import EmojiTrends from "../components/EmojiTrends";
import { motion } from "framer-motion";

export default function EmojiTrendsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/analytics/emoji-trends");
      setData(res.data);
    } catch (err) {
      setError("Failed to load emoji trends");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen w-full p-6 text-white relative">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-6"
      >
        Emoji Trends
      </motion.h1>

      <div className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        {loading && <div className="text-white/70 animate-pulse">Loading emojis… ⏳</div>}
        {error && <div className="text-red-400">{error}</div>}
        {!loading && !error && <EmojiTrends data={data} />}
      </div>
    </div>
  );
}
