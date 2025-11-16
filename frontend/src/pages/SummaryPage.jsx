import React, { useEffect, useState } from "react";
import api from "../api/axios";
import SummaryCard from "../components/SummaryCard";

import ChannelPieChart from "../components/ChannelPieChart";
import MessageBarChart from "./MessageBarChart";

import { Users, MessageSquare, FolderKanban } from "lucide-react";

export default function SummaryPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/analytics/summary");
        setSummary(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch summary");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen text-white">

      <h1 className="text-4xl font-extrabold mb-8">📊 Server Overview</h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <SummaryCard
          title="Total Users"
          value={loading ? "…" : summary?.totalUsers ?? "—"}
          icon={Users}
        />

        <SummaryCard
          title="Total Messages"
          value={loading ? "…" : summary?.totalMessages ?? "—"}
          icon={MessageSquare}
        />

        <SummaryCard
          title="Total Channels"
          value={loading ? "…" : summary?.totalChannels ?? "—"}
          icon={FolderKanban}
        />

      </div>

   
      <section className="mt-10">
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-3">Quick Insights</h2>

          <p className="text-white/70 leading-relaxed">
            Track your server’s activity, channel distribution, and user engagement at a glance.
            Explore the charts below for deeper understanding.
          </p>
        </div>
      </section>

     
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

        
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Channel Category Distribution</h2>
          <ChannelPieChart data={summary?.channelDistribution ?? {}} />
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Daily Message Activity</h2>
          <MessageBarChart data={summary?.dailyMessages ?? {}} />
        </div>

      </section>

     
      <section className="mt-10">
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">🔥 Top Active Channels</h2>

          <ul className="space-y-3">
            {(summary?.topChannels ?? []).map((ch) => (
              <li
                key={ch.name}
                className="bg-gray-800 p-3 rounded-xl flex justify-between items-center"
              >
                <span className="text-gray-300">#{ch.name}</span>
                <span className="text-indigo-400 font-semibold">{ch.messages} msgs</span>
              </li>
            ))}

            {loading && <p className="text-white/70">Loading…</p>}
          </ul>
        </div>
      </section>

    </div>
  );
}
