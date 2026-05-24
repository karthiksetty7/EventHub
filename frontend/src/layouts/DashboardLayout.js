// Importing required packages
import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

// Importing components
import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

// Importing CSS
import "./DashboardLayout.css";

// ==========================================
// DASHBOARD LAYOUT COMPONENT
// ==========================================

const DashboardLayout = () => {
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
    <div className="dashboard-layout">
      {/* ======================================
          SIDEBAR
      ====================================== */}

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* ======================================
          MAIN DASHBOARD CONTENT
      ====================================== */}

      <div className="dashboard-layout-content">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Dashboard Page Content */}
        <main className="dashboard-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ==========================================
// EXPORTING COMPONENT
// ==========================================

export default DashboardLayout;
