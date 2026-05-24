// Importing required packages
import { Link } from "react-router-dom";

import { FaCalendarTimes, FaSearch } from "react-icons/fa";

// Importing CSS
import "./index.css";

// ==========================================
// EMPTY STATE COMPONENT
// ==========================================

const EmptyState = ({
  title = "No Data Found",

  description = "There is currently no data available.",

  buttonText = "Go Home",

  buttonLink = "/",

  showButton = true,

  type = "default",
}) => {
  // ==========================================
  // ICON SELECTION
  // ==========================================

  const renderIcon = () => {
    switch (type) {
      case "search":
        return <FaSearch className="empty-icon" />;

      default:
        return <FaCalendarTimes className="empty-icon" />;
    }
  };

  // ==========================================
  // COMPONENT UI
  // ==========================================

  return (
    <div className="empty-state-container">
      {/* ======================================
          ICON
      ====================================== */}

      <div className="empty-icon-container">{renderIcon()}</div>

      {/* ======================================
          TITLE
      ====================================== */}

      <h2 className="empty-title">{title}</h2>

      {/* ======================================
          DESCRIPTION
      ====================================== */}

      <p className="empty-description">{description}</p>

      {/* ======================================
          BUTTON
      ====================================== */}

      {showButton && (
        <Link to={buttonLink} className="empty-button">
          {buttonText}
        </Link>
      )}
    </div>
  );
};

// ==========================================
// EXPORTING COMPONENT
// ==========================================

export default EmptyState;
