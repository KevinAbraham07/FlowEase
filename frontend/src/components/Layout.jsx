import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1]; 
  const active = path || "tasks"; 
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = useCallback(() => setIsOpen(true), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

  return (
    <div className="relative flex h-screen bg-gray-100">
      {/* Static sidebar removed in favor of overlay */}

      {/* Overlay sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={closeSidebar}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-out translate-x-0">
            <Sidebar active={active} setActive={() => {}} />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header active={active} onMenuClick={openSidebar} />
        <main className="flex-1 p-6 overflow-auto bg-gradient-to-b from-blue-500 to-purple-500">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
