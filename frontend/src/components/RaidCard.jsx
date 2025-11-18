import React from "react";

export default function RaidCard({ raid, index }) {
  return (
    <div className="p-6 mb-6 rounded-xl bg-[#111827] shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-3">
        Raid #{index + 1} —{" "}
        <span className="text-indigo-400">{raid.severity}</span>
      </h2>

      <p className="text-gray-300">
        <strong>Joined:</strong> {raid.count} users
      </p>

      <p className="text-gray-300">
        <strong>Start:</strong> {raid.start}
      </p>

      <p className="text-gray-300 mb-3">
        <strong>End:</strong> {raid.end}
      </p>

      <h3 className="text-lg font-semibold mb-2">Users Involved:</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {raid.users.map((u) => (
          <div
            key={u.id}
            className="p-3 bg-[#0d1220] rounded-lg border border-gray-700"
          >
            <p className="font-semibold text-indigo-300">{u.username}</p>
            <p className="text-sm text-gray-400">{u.joinedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
