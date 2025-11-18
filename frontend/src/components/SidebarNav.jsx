import React from "react";
import { motion } from "framer-motion";

export default function SidebarNav({ active, setActive }) {

  const items = [
    {
      id: "summary", label: "Summary",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M5.25 7.5v9m4.5-12v12m4.5-6v6m4.5-9v9" />
        </svg>
      )
    },
    {
      id: "growth", label: "Server Growth",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 17l6-6 4 4 8-8" />
        </svg>
      )
    },
    {
      id: "messages", label: "Message Frequency",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 15v4a2 2 0 01-2 2H5l-4 4V7a2 2 0 012-2h8" />
        </svg>
      )
    },
    {
      id: "channels", label: "Channel Activity",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 5h18M3 12h18M3 19h18" />
        </svg>
      )
    },
    {
      id: "activeUsers", label: "Active Users",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M17 20h5v-2a7 7 0 10-14 0v2h5m3-7a3 3 0 110-6 3 3 0 010 6z" />
        </svg>
      )
    },
    {
      id: "roles", label: "Role Distribution",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 6v12m6-6H6" />
        </svg>
      )
    },
    {
      id: "emoji", label: "Emoji Trends",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 15a3 3 0 003-3H9a3 3 0 003 3zM9 9h.01M15 9h.01" />
        </svg>
      )
    },
    {
      id: "memes", label: "Meme Trends",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )
    },
    {
      id: "links", label: "Link Sharing",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M10 13a5 5 0 017 0l1 1a5 5 0 11-7 7l-1-1m4-4a5 5 0 00-7 0l-1 1a5 5 0 107 7" />
        </svg>
      )
    },
    {
      id: "voice", label: "Voice Metrics",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 10v4m-4-7v10m-4-4v-2" />
        </svg>
      )
    },

    {
      id: "community", label: "Community Health",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 2M12 8a6 6 0 11-6 6"
          />
        </svg>
      )
    },

    {
      id: "raids", label: "Raid Detection",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 6l7 12H5l7-12z" />
        </svg>
      )
    },
    {
      id: "events", label: "Event Tracking",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 7v4l4 2 4-2V7" />
        </svg>
      )
    },
  ];

  return (
    <>
      <aside
        className="
          hidden md:flex flex-col 
          w-64 h-screen
          p-6 gap-6 border-r border-white/10
          overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
          sticky top-0
        "
      >
        <div className="text-white font-bold text-xl mb-2">
          Discord Analytics
        </div>

        <nav className="flex flex-col gap-2 pb-10">
          {items.map((it) => {
            const isActive = active === it.id;

            return (
              <motion.button
                key={it.id}
                onClick={() => setActive(it.id)}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition 
                ${isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}
              `}
              >
                <span>{it.icon}</span>
                <span className="font-medium">{it.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-auto text-sm text-white/60 pb-4">
          © {new Date().getFullYear()} Discord Analytics
        </div>
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#0D1321] border-b border-white/5">
        <div className="flex gap-2 overflow-x-auto p-3 scrollbar-thin">
          {items.map((it) => {
            const isActive = active === it.id;

            return (
              <button
                key={it.id}
                onClick={() => setActive(it.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm 
                ${isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}
              `}
              >
                {it.icon}
                <span>{it.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
