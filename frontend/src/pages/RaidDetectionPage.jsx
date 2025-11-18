import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import RaidCard from "../components/RaidCard";

export default function RaidDetectionPage() {
  const [raids, setRaids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/analytics/raids")
      .then((res) => {
        setRaids(res.data.raids || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
    </div>
  );
}
