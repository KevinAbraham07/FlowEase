import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { fetchStats } from "./data";

const COLORS = ["#ef4444", "#facc15", "#22c55e"];
function PriorityDonut() {
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

  const { priorities } = stats;

  const chartData = Object.entries(priorities).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="p-5 flex bg-white rounded-md flex-col ">
      <h3 className="mb-2 font-semibold">Task Priorities</h3>
      <div className="flex justify-center items-center">
        <PieChart width={250} height={250}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            paddingAngle={5}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>
    </div>
  );
}

export default PriorityDonut;
