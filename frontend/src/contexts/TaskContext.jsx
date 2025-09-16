import React, { createContext, useContext, useState, useCallback } from 'react';
import { initialTasks } from '../data/tasksData';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};


export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTaskCompletion = useCallback((taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }, []);

  const addTask = useCallback((newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      created_at: new Date().toISOString()
    };
    setTasks(prevTasks => [...prevTasks, task]);
  }, []);

  const updateTask = useCallback((taskId, updates) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updates }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const getTasksByDate = useCallback((date) => {
    const targetDate = new Date(date);
    return tasks.filter(task => {
      if (!task.deadline) return false;
      const taskDate = new Date(task.deadline);
      return taskDate.toDateString() === targetDate.toDateString();
    });
  }, [tasks]);

  const getTasksByStatus = useCallback((status) => {
    switch (status) {
      case 'all':
        return tasks;
      case 'urgent':
        return tasks.filter(task => task.priority === 'High' && !task.completed);
      case 'upcoming':
        return tasks.filter(task => {
          if (task.completed || !task.deadline) return false;
          const now = new Date();
          const taskDate = new Date(task.deadline);
          const diffTime = taskDate - now;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays >= 0 && diffDays <= 7;
        });
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks]);

  const value = {
    tasks,
    toggleTaskCompletion,
    addTask,
    updateTask,
    deleteTask,
    getTasksByDate,
    getTasksByStatus
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
