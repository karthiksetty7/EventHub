// Importing required packages
import { Link } from "react-router-dom";

import { FaLock, FaHome, FaArrowLeft } from "react-icons/fa";

// Importing CSS
import "./index.css";

// ==========================================
// UNAUTHORIZED COMPONENT
// ==========================================

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      {/* ======================================
          CARD CONTAINER
      ====================================== */}

      <div className="unauthorized-card">
        {/* ==================================
            ICON
        ================================== */}

        <div className="unauthorized-icon-container">
          <FaLock className="unauthorized-icon" />
        </div>

        {/* ==================================
            CONTENT
        ================================== */}

        <h1>Access Denied</h1>

        <p>You do not have permission to access this page.</p>

        <span className="unauthorized-description">
          Your current account role does not allow access to this route. Please
          contact the administrator if you believe this is a mistake.
        </span>

        {/* ==================================
            ACTION BUTTONS
        ================================== */}

        <div className="unauthorized-actions">
          {/* HOME BUTTON */}

          <Link to="/" className="home-button">
            <FaHome />
            Back To Home
          </Link>

          {/* GO BACK BUTTON */}

          <button
            type="button"
            className="back-button"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// EXPORTING COMPONENT
// ==========================================

export default Unauthorized;
