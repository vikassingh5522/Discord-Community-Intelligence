import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import EventCard from "../components/EventCard";

export default function EventTrackingPage() {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/analytics/events")
      .then((res) => {
        setTotal(res.data.totalEvents);
        setEvents(res.data.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-white text-xl">Loading event data…</div>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">🎉 Event Success Tracking</h1>

      <div className="text-gray-300 mb-5">
        <strong>Total Events Detected:</strong>{" "}
        <span className="text-indigo-400">{total}</span>
      </div>

      {events.length === 0 ? (
        <div className="text-gray-400">No events found</div>
      ) : (
        events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <EventCard event={event} />
          </motion.div>
        ))
      )}
    </div>
  );
}
