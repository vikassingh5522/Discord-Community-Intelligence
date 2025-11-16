import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ActiveUsers from "../components/ActiveUsers";

export default function ActiveUsersPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState("");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/analytics/active-users");
      setData(res.data);
      setLastUpdate(new Date().toLocaleString());
    } catch (err) {
      console.error(err);
      setError("Failed to load active users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-[80vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Active Users</h1>
        <button
          onClick={load}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Refresh ↻
        </button>
      </div>

      <p className="text-white/60 mb-3 text-sm">
        Last updated: {lastUpdate || "Loading..."}
      </p>

      <div className="glass-card p-6 rounded-2xl">
        {loading && <div className="animate-pulse text-white/70">Loading… ⏳</div>}
        {error && <div className="text-red-400 font-semibold">{error}</div>}
        {!loading && !error && <ActiveUsers data={data} />}
      </div>
    </div>
  );
}
