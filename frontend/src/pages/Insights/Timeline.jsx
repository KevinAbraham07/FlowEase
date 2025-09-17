import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchStats } from "./data"; // your JSON array

function Timeline() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    fetchStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) {
    return (
      <div className="p-3 rounded-md flex neon-shad flex-col flex-grow bg-white">
        <p>Loading...</p>
      </div>
    );
  }

  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const chartData = [
    {
      month: Months[new Date().getMonth() - 2],
      Completed: stats.m2_completed,
      Pending: stats.m2_pending,
    },
    {
      month: Months[new Date().getMonth() - 1],
      Completed: stats.m1_completed,
      Pending: stats.m1_pending,
    },
    {
      month: Months[new Date().getMonth()],
      Completed: stats.m_completed,
      Pending: stats.m_pending,
    },
  ];

  return (
    <div
      className="flex flex-col mt-20 bg-white
    rounded-md p-5 w-full"
    >
      <h3 className="mb-2 font-semibold">Task Timeline</h3>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Completed"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Pending"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Timeline;
