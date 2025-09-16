import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import Layout from "./components/Layout";
import TasksPage from "./pages/Tasks/TasksPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import NotificationsPage from "./pages/Notifications/NotificationsPage";
import InsightsPage from "./pages/Insights/InsightsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import LandingPage from "./pages/LandingPage"; 
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="tasks" element={<TasksPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="insights" element={<InsightsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<TasksPage />} /> 
                </Routes>
              </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
};

export default App;
