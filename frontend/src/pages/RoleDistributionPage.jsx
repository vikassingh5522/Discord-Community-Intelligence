import React, { useEffect, useState } from "react";
import api from "../api/axios";
import RoleDistribution from "../components/RoleDistribution";

export default function RoleDistributionPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await api.get("/analytics/roles"); 
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load role distribution");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-white">Role Distribution</h1>

      <div className="glass-card p-6 rounded-2xl">
        {loading ? (
          <div className="text-white/70">Loading…</div>
        ) : (
          <RoleDistribution data={data} />
        )}
      </div>
    </div>
  );
}
