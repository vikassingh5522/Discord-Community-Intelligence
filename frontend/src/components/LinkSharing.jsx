import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function LinkSharingPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchLinkStats = async () => {
    try {
      const res = await api.get("/analytics/link-sharing");
      setLinks(res.data || []);
    } catch (err) {
      console.error("Error fetching link sharing analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinkStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg text-gray-300 p-6">
        Loading Link Sharing Analytics...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">🔗 Link Sharing Analytics</h1>

      <p className="mb-6 text-gray-400">
        Insights about URLs shared across your server conversations.
      </p>

      {links.length === 0 ? (
        <p className="text-gray-400">No links found in your conversations.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((item, index) => (
            <div
              key={index}
              className="bg-[#1F2937] p-4 rounded-lg shadow-md border border-gray-700"
            >
              <h2 className="text-lg font-semibold break-all text-blue-300">
                {item.url}
              </h2>

              <div className="mt-2 text-gray-400 text-sm">
                <p>📊 Shared: <span className="text-white">{item.count} times</span></p>
                <p>⏱ First Seen: {new Date(item.first_seen).toLocaleString()}</p>
                <p>📅 Last Seen: {new Date(item.last_seen).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
