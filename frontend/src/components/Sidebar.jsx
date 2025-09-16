import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, Bell, BarChart2, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          navigate("/"); // redirect if not logged in
        }
      } catch (err) {
        navigate("/"); // redirect if not logged in
      }
    };
    fetchUser();
  }, [navigate]);

  const menu = [
    { name: "Tasks", icon: <CheckSquare size={20} />, key: "tasks", path: "/tasks" },
    { name: "Calendar", icon: <Calendar size={20} />, key: "calendar", path: "/calendar" },
    { name: "Notifications", icon: <Bell size={20} />, key: "notifications", path: "/notifications" },
    { name: "Insights", icon: <BarChart2 size={20} />, key: "insights", path: "/insights" },
    { name: "Settings", icon: <Settings size={20} />, key: "settings", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-blue-500 to-purple-500 flex flex-col justify-between font-inter">
      <div>
        <div className="p-6 text-2xl font-bold text-white/85">FlowEase</div>
        <nav className="flex flex-col mt-6">
          {menu.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActive(item.key);
                navigate(item.path);
              }}
              className={`flex items-center gap-3 px-6 py-3 text-left rounded-lg mx-3 mb-2 transition-all
                ${active === item.key ? "bg-pink-500 text-white/100" : "text-white/85"} hover:bg-purple-600`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center justify-center mb-4">
        <img src="src/assets/sih-logo.png" alt="sih-logo" className="w-32 h-auto" />
      </div>
      <div className="p-2 bg-purple-600 rounded-lg m-2 flex items-center gap-3">
        <img
          src={user?.profilePic || "/default-avatar.png"}
          alt="profile"
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold text-white/85">{user?.name || "User"}</p>
          <p className="text-xs text-white/85">{user?.email || "user@example.com"}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
