import React, { useState } from "react";
import CalendarView from "./CalendarView";
import EventsComponents from "./EventsComponent";
import { useTasks } from "../../contexts/TaskContext";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { tasks } = useTasks();

  return (
    <div className="flex-1 p-6">
      <CalendarView
        events={tasks}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <EventsComponents 
        selectedDate={selectedDate} 
        events={tasks}
      />
    </div>
  );
};

export default CalendarPage;
