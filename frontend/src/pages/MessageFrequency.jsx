import React, { useState } from "react";
import MessageBarChart from "./MessageBarChart";
import { ArrowUpCircle, ArrowDownCircle, RefreshCw } from "lucide-react";

export default function MessageFrequency() {
 
  const defaultData = {
    Monday: 22,
    Tuesday: 18,
    Wednesday: 30,
    Thursday: 25,
    Friday: 15,
    Saturday: 40,
    Sunday: 12,
  };

  const [messageData, setMessageData] = useState(defaultData);


  const generateTempData = () => {
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const newData = {};
    days.forEach((day) => {
      newData[day] = Math.floor(Math.random() * 50) + 10;
    });
    setMessageData(newData);
  };


  const totalMessages = Object.values(messageData).reduce((a, b) => a + b, 0);
  const maxDay = Object.entries(messageData).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  const trend =
    messageData.Saturday > messageData.Friday ? "up" : "down";

  return (
    <div className="p-6 text-white">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor"
            strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 15v4a2 2 0 01-2 2H5l-4 4V7a2 2 0 012-2h8" />
          </svg>
          Message Frequency
        </h2>

        <button 
          onClick={generateTempData}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition"
        >
          <RefreshCw size={18} />
          Generate Temp Data
        </button>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="glass-card p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Total Weekly Messages</p>
          <h2 className="text-3xl font-bold mt-1">{totalMessages}</h2>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Highest Activity</p>
          <h2 className="text-xl font-semibold mt-1 text-indigo-300">{maxDay}</h2>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Trend</p>
            <h2 className="text-xl font-semibold mt-1">
              {trend === "up" ? "Increasing" : "Decreasing"}
            </h2>
          </div>
          {trend === "up" ? (
            <ArrowUpCircle size={40} className="text-green-400" />
          ) : (
            <ArrowDownCircle size={40} className="text-red-400" />
          )}
        </div>

      </div>

   
      <div className="bg-[#1f1f1f] p-4 rounded-xl shadow-lg">
        <MessageBarChart data={messageData} />
      </div>
    </div>
  );
}
