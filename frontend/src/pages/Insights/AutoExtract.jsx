import React, { useState } from "react";
import data from "./data";
import "./index.css";
function AutoExtract() {
  const [stats, setStats] = useState(data[0]);
  return (
    <div className="p-3 rounded-md flex flex-col neon2-shad flex-grow bg-white">
      <div className="flex items-center gap-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-graph-up"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"
            />
          </svg>
        </div>
        <div className="text-lg">
          <h3 className="neon2 font-medium">Auto-Extracted</h3>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-2xl neon2 font-bold">{stats.totalExtract}</p>
      </div>
      <div>
        <p className="text-md font-light">Tasks this week</p>
      </div>
    </div>
  );
}

export default AutoExtract;
