import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import EventCard from "../components/EventCard";

export default function EventTrackingPage() {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

 
  const tempEvents = [
    {
      title: "User Joined",
      type: "user_join",
      description: "A new member joined the server.",
      timestamp: "2025-11-12T08:00:00Z",
    },
    {
      title: "Message Sent",
      type: "message_sent",
      description: "A user sent a message in #general.",
      timestamp: "2025-11-12T08:15:00Z",
    },
    {
      title: "Reaction Added",
      type: "reaction",
      description: "User reacted with ",
      timestamp: "2025-11-12T08:20:00Z",
    },
    {
      title: "Voice Note Posted",
      type: "voice",
      description: "User posted a 12 sec voice message.",
      timestamp: "2025-11-12T08:35:00Z",
    },
    {
      title: "URL Shared",
      type: "url_share",
      description: "User shared a website link.",
      timestamp: "2025-11-12T09:10:00Z",
    },
    {
      title: "Event Triggered",
      type: "system_event",
      description: "Bot triggered an automated event.",
      timestamp: "2025-11-12T09:45:00Z",
    },
    {
      title: "User Left",
      type: "user_left",
      description: "A user left the server.",
      timestamp: "2025-11-12T10:05:00Z",
    },
    {
      title: "Pinned Message",
      type: "pin",
      description: "Moderator pinned a message.",
      timestamp: "2025-11-12T10:20:00Z",
    },
    {
      title: "Role Assigned",
      type: "role_assign",
      description: "Admin assigned a new role.",
      timestamp: "2025-11-12T11:00:00Z",
    },
    {
      title: "Channel Created",
      type: "channel_create",
      description: "A new channel #announcements was created.",
      timestamp: "2025-11-12T12:00:00Z",
    }
  ];

  
  useEffect(() => {
    api.get("/analytics/events")
      .then((res) => {
        if (!res.data.events || res.data.events.length === 0) {
         
          setEvents(tempEvents);
          setTotal(tempEvents.length);
        } else {
          
          setEvents(res.data.events);
          setTotal(res.data.totalEvents);
        }
        setLoading(false);
      })
      .catch(() => {
     
        setEvents(tempEvents);
        setTotal(tempEvents.length);
        setLoading(false);
      });
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

      
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-3">📊 Event Summary Table</h2>

        <table className="w-full text-left text-gray-300 text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Event</th>
              <th className="py-2">Type</th>
              <th className="py-2">Time</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="py-2">{e.title}</td>
                <td className="py-2">{e.type}</td>
                <td className="py-2">{e.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EventCard event={event} />
        </motion.div>
      ))}
    </div>
  );
}
