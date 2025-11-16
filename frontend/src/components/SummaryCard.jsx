import React from "react";

export default function SummaryCard({ title, value, icon: Icon }) {
  return (
    <div
      className="bg-gradient-to-br from-gray-800 to-gray-900 
      text-white p-6 rounded-2xl shadow-xl border border-gray-700 
      hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h2 className="text-4xl font-extrabold mt-1 animate-pulse">{value}</h2>
        </div>

        
        {Icon && (
          <div className="bg-gray-700 p-4 rounded-xl shadow-lg">
            <Icon size={34} className="text-indigo-300" />
          </div>
        )}
      </div>
    </div>
  );
}
