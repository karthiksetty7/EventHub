// Importing React packages
import React from "react";

// Importing Toastify
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Importing Routes
import AppRoutes from "./routes/AppRoutes";

// Importing Global Styles
import "./App.css";

// ==========================================
// MAIN APPLICATION COMPONENT
// ==========================================

const App = () => {
  return (
    <div className="app-container">
      {/* ===================================== */}
      {/* APPLICATION ROUTES */}
      {/* ===================================== */}

      <AppRoutes />

      {/* ===================================== */}
      {/* GLOBAL TOAST NOTIFICATIONS */}
      {/* ===================================== */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

// ==========================================
// EXPORTING APP COMPONENT
// ==========================================

export default App;
