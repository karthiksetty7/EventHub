import { Link, useNavigate } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { MdEvent, MdDashboard } from "react-icons/md";
import { HiHome, HiTicket } from "react-icons/hi";

import useAuth from "../../hooks/useAuth";

import "./index.css";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const onClickLogout = () => {
    logout();
    navigate("/login");
  };

  const isOrganizer = user?.role === "organizer";
  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button type="button" className="menu-button" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <Link to="/" className="logo-link">
          <MdEvent className="logo-icon" />
          <h1 className="logo-text">EventHub</h1>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          <HiHome />
          <span>Home</span>
        </Link>

        <Link to="/my-bookings" className="nav-link">
          <HiTicket />
          <span>My Bookings</span>
        </Link>

        {isOrganizer && (
          <Link to="/organizer" className="nav-link">
            <MdDashboard />
            <span>Organizer</span>
          </Link>
        )}

        {isAdmin && (
          <Link to="/admin" className="nav-link">
            <MdDashboard />
            <span>Admin</span>
          </Link>
        )}
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <div className="user-avatar">{user?.name?.charAt(0) || "U"}</div>

          <div className="user-details">
            <p className="user-name">{user?.name || "User"}</p>
            <p className="user-role">{user?.role || "guest"}</p>
          </div>
        </div>

        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
