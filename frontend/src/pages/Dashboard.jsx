import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import SidebarNav from "../components/SidebarNav";

// Dashboard Pages
import SummaryPage from "./SummaryPage";
import GrowthPage from "./GrowthPage";
import ActiveUsersPage from "./ActiveUsersPage";
import TrendingTopicsPage from "./TrendingTopicsPage";
import TopChannelsPage from "./TopChannelsPage";
import MessageFrequency from "./MessageFrequency";
import RoleDistributionPage from "./RoleDistributionPage";
import EmojiTrendsPage from "./EmojiTrendsPage";
import MemeTrendsPage from "./MemeTrendsPage";
import LinkSharingPage from "./LinkSharingPage";
import VoiceMetricsPage from "./VoiceMetricsPage";   

export default function Dashboard() {
  const [active, setActive] = useState("summary");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  const renderActive = () => {
    switch (active) {
      case "summary":
        return <SummaryPage />;

      case "growth":
        return <GrowthPage />;

      case "messages":
        return <MessageFrequency />;

      case "channels":
        return <TopChannelsPage />;

      case "activeUsers":
        return <ActiveUsersPage />;

      case "trending":
        return <TrendingTopicsPage />;

      case "roles":
        return <RoleDistributionPage />;

      case "emoji":
        return <EmojiTrendsPage />;

      case "memes":
        return <MemeTrendsPage />;

      case "links":
        return <LinkSharingPage />;

      // ⭐ NOW VOICE METRICS PAGE WORKING
      case "voice":
        return <VoiceMetricsPage />;

      case "community":
        return <div className="text-white">Community Health Coming Soon...</div>;

      case "toxicity":
        return <div className="text-white">Toxicity Detection Coming Soon...</div>;

      case "retention":
        return <div className="text-white">Retention Analytics Coming Soon...</div>;

      case "moderators":
        return <div className="text-white">Moderator Effectiveness Coming Soon...</div>;

      case "raids":
        return <div className="text-white">Raid Detection Coming Soon...</div>;

      case "events":
        return <div className="text-white">Event Tracking Coming Soon...</div>;

      default:
        return <SummaryPage />;
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden" style={{ backgroundColor: "#0D1321" }}>

      <SidebarNav active={active} setActive={setActive} />

      <div className="flex-1 flex flex-col">

        <header className="w-full h-16 bg-[#111827] text-white flex items-center justify-between px-6 shadow-md">
          <h2 className="text-xl font-semibold tracking-wide">
            🚀 Discord Analytics Panel
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-sm opacity-80">
              Welcome 👋
              <span className="font-bold text-indigo-400"> {username} </span>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-1 rounded-md shadow"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 pt-6">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            {renderActive()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
