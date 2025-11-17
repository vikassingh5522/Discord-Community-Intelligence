import React from "react";

export default function MemeTrendCard({ meme, count }) {
  return (
    <div className="bg-[#1b2533] p-5 rounded-2xl shadow-md border border-gray-700">
      <h3 className="text-lg font-semibold text-white">{meme}</h3>
      <p className="text-gray-300 mt-1">Count: {count}</p>
    </div>
  );
}
