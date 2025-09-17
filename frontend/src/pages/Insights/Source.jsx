import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { fetchStats } from "./data";

function Source() {
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

  const { sources } = stats;

  const chartData = Object.entries(sources).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="p-5 flex flex-col bg-white rounded-md">
      <h3 className="mb-2 font-semibold">Task Sources</h3>
      <div className="flex justify-center items-center">
        <BarChart width={300} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />

          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </div>
    </div>
  );
}

export default Source;
