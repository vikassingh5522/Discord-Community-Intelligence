import React, { useEffect, useState } from "react";
import api from "../api/axios";
import TrendingTopics from "../components/TrendingTopics";

export default function TrendingTopicsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/analytics/trending-topics");
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load trending topics");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-white">Trending Topics</h1>
      <div className="glass-card p-6 rounded-2xl">
        {loading ? <div className="text-white/70">Loading…</div> : <TrendingTopics data={data} />}
      </div>
    </div>
  );
}
