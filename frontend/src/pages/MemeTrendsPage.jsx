import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MemeTrendCard from "../components/MemeTrendCard";

const tempMemeTrends = [
  { meme: "🔥 Sigma Rule #69", count: 42 },
  { meme: "😂 Rizz God Meme", count: 35 },
  { meme: "🐶 Doge is Back", count: 28 },
  { meme: "📉 Bro Went From Hero to Zero", count: 19 },
  { meme: "😮 NPC Memes", count: 12 },
  { meme: "🗿 Skibidi Toilet Returns", count: 8 },
];

export default function MemeTrendsPage() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemeTrends();
  }, []);

  const fetchMemeTrends = async () => {
    try {

      const res = await getMemeTrends();

      if (res.data?.topMemes?.length > 0) {
        setMemes(res.data.topMemes);
      } else {
        setMemes(tempMemeTrends); 
      }
    } catch (error) {
      console.log("API Failed, using temporary meme trends...");
      setMemes(tempMemeTrends); 
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
        <>
      
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

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            📊 Raw Meme Trend Records
          </h2>

          <div className="bg-[#1b2533] p-4 rounded-xl border border-gray-700 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2 text-white">#</th>
                  <th className="p-2 text-white">Meme</th>
                  <th className="p-2 text-white">Count</th>
                </tr>
              </thead>
              <tbody>
                {memes.map((r, i) => (
                  <tr key={i} className="border-b border-gray-800">
                    <td className="p-2 text-gray-300">{i + 1}</td>
                    <td className="p-2 text-gray-300">{r.meme}</td>
                    <td className="p-2 text-gray-300">{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
