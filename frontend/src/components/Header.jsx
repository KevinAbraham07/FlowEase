import React, { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Header = ({ active, onMenuClick }) => {
  const [searchValue, setSearchValue] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    switch (active) {
      case "tasks":
        setTitle("Tasks Overview");
        break;
      case "notifications":
        setTitle("Notifications");
        break;
      case "insights":
        setTitle("Insights and Analytics");
        break;
      case "calendar":
        setTitle("Calendar View");
        break;
      case "settings":
        setTitle("Settings");
        break;
      default:
        setTitle("");
    }
  }, [active]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleLogout = async () => {
    window.location.href ="http://localhost:5000/api/auth/logout";
  //   try {

  //     const res = await axios.post(
  //     "http://localhost:5000/api/auth/logout",
  //     {},
  //     { withCredentials: true }
  //   );
  //   return res.data;
  // } 
  // catch (err){
  //   console.error("Logout failed:", err);
  //   throw err;
  // }

  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg font-inter">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          aria-label="Open sidebar"
          onClick={onMenuClick}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative w-64 md:w-96">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full p-3 pl-10 pr-4 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-purple-700 text-white font-bold rounded-full hover:bg-purple-800 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
