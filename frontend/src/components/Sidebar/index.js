// Importing required packages
import { Link, useLocation } from "react-router-dom";

import { FaTimes, FaCalendarAlt } from "react-icons/fa";

import {
  MdDashboard,
  MdAdd,
  MdEventNote,
  MdAdminPanelSettings,
} from "react-icons/md";

import { HiHome, HiTicket } from "react-icons/hi";

// FIXED auth hook
import useAuth from "../../hooks/useAuth";

import "./index.css";

// ==========================================
// SIDEBAR COMPONENT
// ==========================================

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const { user } = useAuth();

  const isOrganizer = user?.role === "organizer";
  const isAdmin = user?.role === "admin";

  const userLinks = [
    { id: 1, label: "Home", path: "/", icon: <HiHome /> },
    { id: 2, label: "My Bookings", path: "/my-bookings", icon: <HiTicket /> },
  ];

  const organizerLinks = [
    {
      id: 3,
      label: "Organizer Dashboard",
      path: "/organizer",
      icon: <MdDashboard />,
    },
    {
      id: 4,
      label: "Create Event",
      path: "/organizer/create-event",
      icon: <MdAdd />,
    },
  ];

  const adminLinks = [
    {
      id: 5,
      label: "Admin Dashboard",
      path: "/admin",
      icon: <MdAdminPanelSettings />,
    },
  ];

  const renderLinks = (links) =>
    links.map((eachLink) => {
      const isActive = location.pathname === eachLink.path;

      return (
        <Link
          key={eachLink.id}
          to={eachLink.path}
          className={`sidebar-link ${isActive ? "active-link" : ""}`}
          onClick={toggleSidebar}
        >
          <span className="sidebar-icon">{eachLink.icon}</span>
          <span>{eachLink.label}</span>
        </Link>
      );
    });

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <FaCalendarAlt />
            <h2>EventHub</h2>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.name?.charAt(0) || "U"}</div>

          <h3>{user?.name || "User"}</h3>
          <p>{user?.role || "guest"}</p>
        </div>

        <div className="sidebar-links">
          <div className="sidebar-section">
            <p className="section-title">General</p>
            {renderLinks(userLinks)}
          </div>

          {isOrganizer && (
            <div className="sidebar-section">
              <p className="section-title">Organizer</p>
              {renderLinks(organizerLinks)}
            </div>
          )}

          {isAdmin && (
            <div className="sidebar-section">
              <p className="section-title">Administration</p>
              {renderLinks(adminLinks)}
            </div>
          )}
        </div>

        <div className="sidebar-footer">
          <MdEventNote />
          <p>Manage your events efficiently</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
