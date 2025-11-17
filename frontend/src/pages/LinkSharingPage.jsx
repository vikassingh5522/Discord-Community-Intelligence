import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function LinkSharingPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLinkStats = async () => {
    try {
      const res = await api.get("/analytics/link-sharing");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching link sharing analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinkStats();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!stats) return <div>No data found</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">🔗 Link Sharing Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1F2937] p-5 rounded-lg">
          <p>Total URLs Shared</p>
          <h2 className="text-3xl">{stats.totalLinks}</h2>
        </div>

        <div className="bg-[#1F2937] p-5 rounded-lg">
          <p>Unique Domains</p>
          <h2 className="text-3xl">{stats.topDomains.length}</h2>
        </div>

        <div className="bg-[#1F2937] p-5 rounded-lg">
          <p>Active Link Sharers</p>
          <h2 className="text-3xl">{stats.topUsers.length}</h2>
        </div>
      </div>

    
      <h2 className="text-xl font-semibold">🌍 Top Shared Domains</h2>
      <div className="bg-[#1F2937] p-5 rounded-lg mb-8">
        {stats.topDomains.length === 0 ? "No domain data" : stats.topDomains.map((d, i) => (
          <div key={i} className="flex justify-between p-2 bg-[#111827] mb-2 rounded">
            <span>{d.domain}</span>
            <span>{d.count}</span>
          </div>
        ))}
      </div>

      
      <h2 className="text-xl font-semibold">🔗 Most Popular URLs</h2>
      <div className="bg-[#1F2937] p-5 rounded-lg mb-8">
        {stats.topUrls.length === 0 ? "No URLs" : stats.topUrls.map((u, i) => (
          <div key={i} className="p-2 bg-[#111827] mb-2 rounded">
            <p className="break-all">{u.url}</p>
            <p>Shared {u.count} times</p>
          </div>
        ))}
      </div>

     
      <h2 className="text-xl font-semibold">👥 Top Users Sharing Links</h2>
      <div className="bg-[#1F2937] p-5 rounded-lg mb-8">
        {stats.topUsers.length === 0 ? "No users" : stats.topUsers.map((u, i) => (
          <div key={i} className="flex justify-between p-2 bg-[#111827] mb-2 rounded">
            <span>{u.username}</span>
            <span>{u.count}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
