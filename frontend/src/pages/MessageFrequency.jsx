import React from "react";
import MessageBarChart from "./MessageBarChart";

export default function MessageFrequency() {
 
  const messageData = {
    Monday: 22,
    Tuesday: 18,
    Wednesday: 30,
    Thursday: 25,
    Friday: 15,
    Saturday: 40,
    Sunday: 12,
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor"
          strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 15v4a2 2 0 01-2 2H5l-4 4V7a2 2 0 012-2h8" />
        </svg>
        Message Frequency
      </h2>

      <div className="bg-[#1f1f1f] p-4 rounded-xl shadow-lg">
        <MessageBarChart data={messageData} />
      </div>
    </div>
  );
}
