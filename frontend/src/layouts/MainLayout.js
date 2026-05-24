// Importing required packages
import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";

// Importing components
import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

// Importing CSS
import "./MainLayout.css";

// ==========================================
// MAIN LAYOUT COMPONENT
// ==========================================

const MainLayout = () => {
  // ==========================================
  // STATES
  // ==========================================

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ==========================================
  // TOGGLE SIDEBAR
  // ==========================================

  const toggleSidebar = () => {
    setIsSidebarOpen((previousState) => !previousState);
  };

  // ==========================================
  // CLOSE SIDEBAR ON LARGE SCREENS
  // ==========================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ==========================================
  // COMPONENT UI
  // ==========================================

  return (
    <div className="main-layout">
      {/* ======================================
          SIDEBAR
      ====================================== */}

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* ======================================
          MAIN CONTENT AREA
      ====================================== */}

      <div className="main-layout-content">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ==========================================
// EXPORTING COMPONENT
// ==========================================

export default MainLayout;
