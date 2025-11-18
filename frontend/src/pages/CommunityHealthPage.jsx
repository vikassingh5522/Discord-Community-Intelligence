import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CommunityEngagement from "../components/CommunityEngagement";
import CommunityToxicity from "../components/CommunityToxicity";
import CommunityRetention from "../components/CommunityRetention";
import CommunityModerators from "../components/CommunityModerators";

export default function CommunityHealthPage() {
  const [activeTab, setActiveTab] = useState("engagement");

  const tabs = [
    { id: "engagement", label: "🔥 Engagement" },
    { id: "toxicity", label: "⚠️ Toxicity" },
    { id: "retention", label: "📈 Retention" },
    { id: "moderators", label: "🛡 Moderators" },
  ];

  return (
    <div className="p-6 min-h-screen" style={{ background: "#242424" }}>
      <h1 className="text-3xl font-bold text-white mb-6">
        💠 Community Health Dashboard
      </h1>

      <div className="flex gap-3 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300
              ${
                activeTab === t.id
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-[#1F2937] text-gray-300 hover:bg-[#374151]"
              }
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <AnimatePresence mode="wait">
          {activeTab === "engagement" && (
            <motion.div
              key="eng"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <CommunityEngagement />
            </motion.div>
          )}

          {activeTab === "toxicity" && (
            <motion.div
              key="tox"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <CommunityToxicity />
            </motion.div>
          )}

          {activeTab === "retention" && (
            <motion.div
              key="ret"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <CommunityRetention />
            </motion.div>
          )}

          {activeTab === "moderators" && (
            <motion.div
              key="mod"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <CommunityModerators />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
