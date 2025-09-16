import React from "react";
import CompletionCard from "./CompletionCard";
import TimeSaved from "./TimeSaved";
import Third from "./Third";
import AutoExtract from "./AutoExtract";
import PriorityDonut from "./PriorityDonut";
import Source from "./Source";
import Timeline from "./Timeline";

const InsightsPage = () => {
  return (
    <div>
      <div className="flex space-between gap-10 h-[140px] ">
        <div className="flex-1">
          <CompletionCard />
        </div>
        <div className="flex-1">
          <TimeSaved />
        </div>
        <div className="flex-1">
          <Third />
        </div>
        <div className="flex-1">
          <AutoExtract />
        </div>
      </div>
      <div className="flex space-between h-[300px] gap-10 mt-10">
        <div className="flex-1">
          <PriorityDonut />
        </div>
        <div className="flex-1">
          <Source />
        </div>
      </div>

      <Timeline />
    </div>
  );
};

export default InsightsPage;
