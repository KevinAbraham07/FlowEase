import React, { useState, useEffect } from "react";
import { fetchStats } from "./data";
import "./index.css";

function CompletionCard() {
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

  return (
    <div className="p-3 rounded-md flex neon-shad flex-col flex-grow bg-white">
      <div className="flex items-center gap-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bullseye"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
            <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </div>
        <div className="text-lg">
          <h3 className="neon font-medium">Completion</h3>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-2xl neon font-bold">{stats.value}%</p>
      </div>
      <div>
        <p className="text-md font-light">
          {stats.change}%{" "}
          {stats.changeType === "increase"
            ? "more than last month"
            : "less than last month"}
        </p>
      </div>
    </div>
  );
}

export default CompletionCard;
