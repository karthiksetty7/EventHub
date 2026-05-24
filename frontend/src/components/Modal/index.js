// Importing required packages
import { useEffect } from "react";

import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

// Importing CSS
import "./index.css";

// ==========================================
// MODAL COMPONENT
// ==========================================

const Modal = ({
  isOpen = false,

  title = "Confirmation",

  description = "Are you sure you want to continue?",

  confirmText = "Confirm",

  cancelText = "Cancel",

  type = "warning",

  loading = false,

  onConfirm,

  onClose,
}) => {
  // ==========================================
  // ESC KEY CLOSE
  // ==========================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // ==========================================
  // PREVENT BACKGROUND SCROLL
  // ==========================================

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  // ==========================================
  // MODAL CLOSED
  // ==========================================

  if (!isOpen) {
    return null;
  }

  // ==========================================
  // COMPONENT UI
  // ==========================================

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        {/* ==================================
            CLOSE BUTTON
        ================================== */}

        <button type="button" className="modal-close-button" onClick={onClose}>
          <FaTimes />
        </button>

        {/* ==================================
            ICON
        ================================== */}

        <div className={`modal-icon-container ${type}`}>
          <FaExclamationTriangle className="modal-icon" />
        </div>

        {/* ==================================
            TITLE
        ================================== */}

        <h2 className="modal-title">{title}</h2>

        {/* ==================================
            DESCRIPTION
        ================================== */}

        <p className="modal-description">{description}</p>

        {/* ==================================
            ACTION BUTTONS
        ================================== */}

        <div className="modal-actions">
          {/* Cancel Button */}
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>

          {/* Confirm Button */}
          <button
            type="button"
            className={`confirm-button ${type}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// EXPORTING COMPONENT
// ==========================================

export default Modal;
