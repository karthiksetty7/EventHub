// Importing CSS file
import "./index.css";

// ==========================================
// LOADER COMPONENT
// ==========================================

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-container">
      {/* Spinner */}
      <div className="spinner"></div>

      {/* Loading Text */}
      <p className="loader-text">{message}</p>
    </div>
  );
};

// ==========================================
// EXPORTING COMPONENT
// ==========================================

export default Loader;
