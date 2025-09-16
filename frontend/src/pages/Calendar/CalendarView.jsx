import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";

const CalendarView = ({ events, selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = currentMonth.date(d);
      const dayTasks = events.filter((task) => {
        if (!task.deadline) return false;
        return dayjs(task.deadline).isSame(date, "day");
      });

      days.push(
        <div
          key={d}
          onClick={() => handleDateClick(date)}
          className={`h-24 border rounded-[20px] flex flex-col items-start p-2 text-gray-700 font-bold cursor-pointer font-inter ${
            selectedDate && dayjs(selectedDate).isSame(date, "day")
              ? "bg-purple-300 border-purple-500"
              : "bg-white"
          }`}
        >
          <span>{d}</span>
          <div className="flex gap-1 mt-1 flex-wrap">
            {dayTasks.map((task, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  task.completed ? 'bg-green-500' : 
                  task.priority === 'High' ? 'bg-red-500' :
                  task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}
                title={`${task.task_title} (${task.priority})`}
              ></span>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white bg-opacity-95 rounded-[20px] shadow p-4 mb-6 font-inter">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-1">
          <ChevronLeft />
        </button>

        <h2 className="text-lg font-semibold">{currentMonth.format("MMMM YYYY")}</h2>

        <button onClick={nextMonth} className="p-1">
          <ChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-600">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2 mt-2">{renderDays()}</div>
    </div>
  );
};

export default CalendarView;
