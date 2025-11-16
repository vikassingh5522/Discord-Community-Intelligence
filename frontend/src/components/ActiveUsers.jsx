import React from "react";

export default function ActiveUsers({ data }) {
  if (!data) return <div className="text-gray-500">No data</div>;
  const { activeCount, inactiveCount, hourlyHeatmap, dailyActiveUsers } = data;
  return (
    <div>
      <div className="mb-4">
        <div className="text-sm text-gray-500">Active</div>
        <div className="text-xl font-bold">{activeCount}</div>
      </div>

      <div className="text-sm text-gray-500">Inactive</div>
      <div className="text-lg mb-3">{inactiveCount}</div>

      <div className="text-sm text-gray-500 mb-2">Hourly heatmap (0-23)</div>
      <div className="grid grid-cols-6 gap-1">
        { (hourlyHeatmap || []).map((v,i) => (
          <div key={i} className="text-center p-2 bg-gray-100 rounded">
            <div className="text-xs text-gray-500">{i}</div>
            <div className="text-sm font-semibold">{v}</div>
          </div>
        )) }
      </div>
    </div>
  );
}
