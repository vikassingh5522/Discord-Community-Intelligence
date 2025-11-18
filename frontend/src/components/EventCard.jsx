import React from "react";
import { motion } from "framer-motion";

export default function EventCard({ event }) {
  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 mb-4"
      whileHover={{ scale: 1.02 }}
    >
      <h2 className="text-xl font-semibold text-indigo-400">
        {event.title || "Unknown Event"}
      </h2>

      <p className="text-gray-300 mt-1">
        <strong>Type:</strong> {event.type || "N/A"}
      </p>

      <p className="text-gray-400 text-sm mt-2">
        {event.description || "No description available."}
      </p>

      <div className="text-gray-500 text-xs mt-3">
        <strong>Time:</strong> {event.timestamp || "N/A"}
      </div>
    </motion.div>
  );
}
