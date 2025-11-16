import React from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function TopChannels({ data }) {
  if (!data || data.length === 0)
    return (
      <div className="text-gray-400 text-center py-12">
        No channel data available.
      </div>
    );

  // Max messages for bar scaling
  const maxMessages = Math.max(...data.map((c) => c.messages));

  return (
    <div className="space-y-4">
      {data.map((ch, i) => (
        <motion.div
          key={ch.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition cursor-pointer"
        >
          <div className="flex justify-between items-center">
            {/* LEFT SIDE */}
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-indigo-600/80 px-2 py-0.5 rounded text-xs font-bold">
                  #{i + 1}
                </span>
                <h2 className="font-semibold text-white text-lg">{ch.name}</h2>
                <BarChart3 className="w-4 h-4 text-indigo-400" />
              </div>

              <p className="text-gray-400 text-sm mt-1">
                Channel ID: {ch.id}
              </p>

              <p className="text-gray-500 text-xs mt-1">
                Last active: {ch.lastActive || "unknown"}
              </p>
            </div>

            {/* RIGHT SIDE NUMBER */}
            <div className="text-2xl font-bold text-indigo-400">
              {ch.messages}
            </div>
          </div>

          {/* MESSAGE BAR */}
          <div className="w-full bg-white/10 rounded-full h-2 mt-4 overflow-hidden">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${(ch.messages / maxMessages) * 100}%` }}
            ></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
