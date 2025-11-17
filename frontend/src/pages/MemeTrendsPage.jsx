import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MemeTrendCard from "../components/MemeTrendCard";


export default function MemeTrendsPage() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemeTrends();
  }, []);

  const fetchMemeTrends = async () => {
    try {
      const res = await getMemeTrends();
      setMemes(res.data.topMemes || []);
    } catch (err) {
      console.error("Failed to load meme trends", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#0d1321" }}>
      
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Meme Trends
      </motion.h1>

      {loading ? (
        <p className="text-gray-300">Loading trends...</p>
      ) : memes.length === 0 ? (
        <p className="text-gray-300">No meme trends found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {memes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <MemeTrendCard meme={item.meme} count={item.count} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
