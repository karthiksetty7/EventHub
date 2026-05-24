// Importing required packages
import { Link } from "react-router-dom";

import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";

// Importing CSS
import "./index.css";

// ==========================================
// NOT FOUND COMPONENT
// ==========================================

const NotFound = () => {
  return (
    <div className="not-found-page">
      {/* ======================================
          BACKGROUND CIRCLES
      ====================================== */}

      <div className="circle circle-one" />

      <div className="circle circle-two" />

      <div className="circle circle-three" />

      {/* ======================================
          CONTENT CARD
      ====================================== */}

      <div className="not-found-card">
        {/* ==================================
            404 NUMBER
        ================================== */}

        <div className="not-found-number">404</div>

        {/* ==================================
            ICON
        ================================== */}

        <div className="not-found-icon-container">
          <FaSearch className="not-found-icon" />
        </div>

        {/* ==================================
            CONTENT
        ================================== */}

        <h1>Page Not Found</h1>

        <p>
          The page you are looking for does not exist or may have been moved.
        </p>

        <span className="not-found-description">
          Please check the URL or return back to the homepage to continue
          exploring events and bookings.
        </span>

        {/* ==================================
            ACTION BUTTONS
        ================================== */}

        <div className="not-found-actions">
          {/* HOME BUTTON */}

          <Link to="/" className="home-button">
            <FaHome />
            Back To Home
          </Link>

          {/* BACK BUTTON */}

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

export default NotFound;
