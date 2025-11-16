

import React from "react";

export default function TrendingTopics({ data }) {
  if (!data) return <div className="text-gray-500">No data</div>;
  const { topWords = [], topHashtags = [] } = data;
  return (
    <div>
      <div className="mb-3">
        <div className="text-sm text-gray-500">Top words</div>
        <div className="space-y-2 mt-2">
          {topWords.map((w, idx) => (
            <div key={idx} className="flex justify-between">
              <div className="text-gray-700">{w.word}</div>
              <div className="text-gray-500">{w.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm text-gray-500">Top hashtags</div>
        <div className="space-y-2 mt-2">
          {topHashtags.map((h, idx) => (
            <div key={idx} className="flex justify-between">
              <div className="text-indigo-600">{h.hashtag}</div>
              <div className="text-gray-500">{h.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
