import React, { useEffect, useState } from "react";
import api from "../api/axios";
import TopChannels from "../components/TopChannels";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";

export default function TopChannelsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/analytics/channels");
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load channels");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-[80vh]"
    >
      <div className="flex items-center gap-2 mb-6">
        <Hash className="w-8 h-8 text-indigo-400" />
        <h1 className="text-3xl font-bold text-white">Top Channels</h1>
      </div>

      <div className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="w-full h-16 bg-white/10 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <TopChannels data={data} />
        )}
      </div>
    </motion.div>
  );
}
