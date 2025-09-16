import React, { useState } from "react";
import { Mail, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useTasks } from "../../contexts/TaskContext";


function TasksPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const { getTasksByStatus, toggleTaskCompletion } = useTasks();

  const handleComplete = (taskId) => {
    toggleTaskCompletion(taskId);
  };

  const filteredTasks = getTasksByStatus(selectedTab);

  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  const statusBadge = (task) => {
    if (task.completed)
      return <span className="px-3 py-1 rounded-xl bg-green-100 text-green-600">Completed</span>;
    if (task.deadline) {
      const dueDate = new Date(task.deadline);
      if (dueDate < new Date())
        return <span className="px-3 py-1 rounded-xl bg-red-100 text-red-600">Overdue</span>;
    }
    return <span className="px-3 py-1 rounded-xl bg-gray-100 text-gray-600">Pending</span>;
  };

  const formatDate = (isoString) => {
    if (!isoString) return "No deadline";
    return new Date(isoString).toLocaleDateString();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["all", "urgent", "upcoming", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-xl transition ${selectedTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-3">
        <span>Task</span>
        <span>Source</span>
        <span>Deadline</span>
        <span>Priority</span>
        <span>Status</span>
        <span className="text-center">Actions</span>
      </div>

      <div className="mt-4 space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-6 gap-4 items-center p-3 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="col-span-1">
                <div className="font-medium text-gray-800">{task.task_title}</div>
              </div>

              {/* Source */}
              <span className="flex items-center gap-2 text-gray-700">
                {task.source === "Email" ? (
                  <Mail className="w-4 h-4 text-gray-500" />
                ) : (
                  <Calendar className="w-4 h-4 text-gray-500" />
                )}
                {task.source}
              </span>

              {/* Deadline */}
              <span className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 text-gray-500" />
                {formatDate(task.deadline)}
              </span>

              {/* Priority */}
              <span
                className={`px-3 py-1 rounded-xl text-sm font-medium ${priorityColors[task.priority]}`}
              >
                {task.priority}
              </span>

              {/* Status */}
              <span>{statusBadge(task)}</span>

              {/* Actions */}
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleComplete(task.id)}
                  className={`${task.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-600'} transition-colors`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks found</p>
        )}
      </div>
    </div>
  );
}

export default TasksPage;
