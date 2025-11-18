

import React, { useEffect, useState } from "react";
import api from "../api/axios";
import GrowthChart from "../components/GrowthChart";
import MonthlyChart from "../components/MonthlyChart";
import WeeklyChart from "../components/WeeklyChart";

const tempGrowthData = {
  totalUsers: 523,
  joinCounts: {
    "2025-11-01": 5,
    "2025-11-02": 12,
    "2025-11-03": 8,
    "2025-11-04": 14,
    "2025-11-05": 22,
    "2025-11-06": 18,
    "2025-11-07": 30,
  },
  weeklyCounts: {
    "Week 1": 45,
    "Week 2": 67,
    "Week 3": 82,
    "Week 4": 95,
  },
  monthlyCounts: {
    "Jan": 120,
    "Feb": 95,
    "Mar": 130,
    "Apr": 150,
    "May": 140,
    "Jun": 180,
    "Jul": 200,
    "Aug": 175,
    "Sep": 160,
    "Oct": 210,
    "Nov": 225,
  },
};

export default function GrowthPage() {
  const [data, setData] = useState(tempGrowthData); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/analytics/growth");

        if (res?.data) {
          setData({
            ...tempGrowthData,     
            ...res.data
          });
        }
      } catch (err) {
        console.log("API failed → using temporary data");
      }
      setLoading(false);
    };

    load();
  }, []);

  
  const joinCounts = data?.joinCounts ?? {};
  const weeklyCounts = data?.weeklyCounts ?? {};
  const monthlyCounts = data?.monthlyCounts ?? {};

  const totalUsers = data?.totalUsers ?? 0;

  const highestDay =
    Object.keys(joinCounts).length > 0
      ? Object.keys(joinCounts).sort((a, b) => joinCounts[b] - joinCounts[a])[0]
      : "—";

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-4xl font-extrabold mb-8">📈 Server Growth Analytics</h1>

      {loading ? (
        <div className="text-gray-300">Loading charts…</div>
      ) : (
        <div className="space-y-10">

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-lg text-gray-300">Total Users</h2>
              <p className="text-4xl font-bold text-indigo-400">{totalUsers}</p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-lg text-gray-300">Highest Growth Day</h2>
              <p className="text-3xl font-bold text-pink-400">{highestDay}</p>
            </div>
          </div>

         
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Daily User Growth</h2>
            <GrowthChart data={joinCounts} />

           
            <h3 className="text-lg font-bold mt-6 mb-2">📊  Daily Records</h3>
            <table className="w-full bg-[#111827] border border-gray-700 rounded-xl">
              <thead>
                <tr className="border-b border-gray-700 text-gray-300">
                  <th className="p-2">Date</th>
                  <th className="p-2">New Users</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(joinCounts).map(([day, count]) => (
                  <tr key={day} className="border-b border-gray-800">
                    <td className="p-2">{day}</td>
                    <td className="p-2">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Weekly Growth Overview</h2>
            <WeeklyChart data={weeklyCounts} />

            <h3 className="text-lg font-bold mt-6 mb-2">📊 Weekly Records</h3>
            <table className="w-full bg-[#111827] border border-gray-700 rounded-xl">
              <thead>
                <tr className="border-b border-gray-700 text-gray-300">
                  <th className="p-2">Week</th>
                  <th className="p-2">New Users</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(weeklyCounts).map(([week, count]) => (
                  <tr key={week} className="border-b border-gray-800">
                    <td className="p-2">{week}</td>
                    <td className="p-2">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Monthly Growth</h2>
            <MonthlyChart data={monthlyCounts} />

            <h3 className="text-lg font-bold mt-6 mb-2">📊 Raw Monthly Records</h3>
            <table className="w-full bg-[#111827] border border-gray-700 rounded-xl">
              <thead>
                <tr className="border-b border-gray-700 text-gray-300">
                  <th className="p-2">Month</th>
                  <th className="p-2">New Users</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(monthlyCounts).map(([month, count]) => (
                  <tr key={month} className="border-b border-gray-800">
                    <td className="p-2">{month}</td>
                    <td className="p-2">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
}













// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import GrowthChart from "../components/GrowthChart";
// import MonthlyChart from "../components/MonthlyChart";
// import WeeklyChart from "../components/WeeklyChart";

// export default function GrowthPage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await api.get("/analytics/growth");
//         setData(res.data);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load growth data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   const totalUsers = data?.totalUsers ?? 0;
//   const highestDay = data?.joinCounts
//     ? Object.keys(data.joinCounts).sort((a, b) => data.joinCounts[b] - data.joinCounts[a])[0]
//     : "—";

//   return (
//     <div className="min-h-screen text-white">
//       <h1 className="text-4xl font-extrabold mb-8">📈 Server Growth Analytics</h1>

//       {loading ? (
//         <div className="text-gray-300">Loading charts…</div>
//       ) : (
//         <div className="space-y-10">

       
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             <div className="glass-card p-6 rounded-2xl">
//               <h2 className="text-lg text-gray-300">Total Users</h2>
//               <p className="text-4xl font-bold text-indigo-400">{totalUsers}</p>
//             </div>

//             <div className="glass-card p-6 rounded-2xl">
//               <h2 className="text-lg text-gray-300">Highest Growth Day</h2>
//               <p className="text-3xl font-bold text-pink-400">{highestDay}</p>
//             </div>

//           </div>

          
//           <div className="glass-card p-6 rounded-2xl">
//             <h2 className="text-xl font-bold mb-4">Daily User Growth</h2>
//             <GrowthChart data={data?.joinCounts ?? {}} />
//           </div>

         
//           <div className="glass-card p-6 rounded-2xl">
//             <h2 className="text-xl font-bold mb-4">Weekly Growth Overview</h2>
//             <WeeklyChart data={data?.weeklyCounts ?? {}} />
//           </div>

         
//           <div className="glass-card p-6 rounded-2xl">
//             <h2 className="text-xl font-bold mb-4">Monthly Growth</h2>
//             <MonthlyChart data={data?.monthlyCounts ?? {}} />
//           </div>

//         </div>
//       )}
//     </div>
//   );
// }
