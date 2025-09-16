import React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import dayjs from "dayjs";
import { useTasks } from "../../contexts/TaskContext";

const Events = ({ selectedDate, events }) => {
  const { toggleTaskCompletion } = useTasks();
  
  const selectedTasks =
    selectedDate &&
    events.filter((task) => {
      if (!task.deadline) return false;
      return dayjs(task.deadline).isSame(selectedDate, "day");
    });

  const handleComplete = (taskId) => {
    toggleTaskCompletion(taskId);
  };

  const getPriorityColor = (priority, completed) => {
    if (completed) return "text-green-600";
    switch (priority) {
      case 'High': return "text-red-600";
      case 'Medium': return "text-yellow-600";
      case 'Low': return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return <AlertCircle className="w-4 h-4" />;
      case 'Medium': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-[20px] bg-gray-50 min-h-32 font-inter">
      {selectedDate ? (
        selectedTasks.length > 0 ? (
          <div className="w-full">
            <h3 className="font-semibold mb-4 text-gray-800">
              Tasks on {dayjs(selectedDate).format("DD MMM YYYY")}:
            </h3>
            <div className="space-y-3">
              {selectedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`flex items-center gap-2 ${getPriorityColor(task.priority, task.completed)}`}>
                      {getPriorityIcon(task.priority)}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.task_title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{task.task_description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {dayjs(task.deadline).format("HH:mm")}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.completed ? 'bg-green-100 text-green-700' :
                          task.priority === 'High' ? 'bg-red-100 text-red-700' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-gray-500">{task.category}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleComplete(task.id)}
                    className={`ml-3 p-2 rounded-full transition-colors ${
                      task.completed 
                        ? 'text-green-600 bg-green-100 hover:bg-green-200' 
                        : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No tasks scheduled for this date
          </p>
        )
      ) : (
        <p className="text-gray-500 text-center">
          Click a date to see its tasks
        </p>
      )}
    </div>
  );
};

export default Events;
