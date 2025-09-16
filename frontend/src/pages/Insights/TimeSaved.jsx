import React, { useState } from "react";
import data from "./data";
import "./index.css";
function TimeSaved() {
  const [stats, setStats] = useState(data[0]);

  return (
    <div className="p-3 rounded-md flex flex-col indigo-shad flex-grow bg-white">
      <div className="flex items-center gap-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-clock"
            viewBox="0 0 16 16"
          >
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
          </svg>
        </div>
        <div className="text-lg">
          <h3 className="indigo font-medium">Time Saved</h3>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-2xl indigo font-bold">{stats.time} hours</p>
      </div>
      <div>
        <p className="text-md font-light">This week via Automation</p>
      </div>
    </div>
  );
}

export default TimeSaved;
