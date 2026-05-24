// Importing required packages
import { Routes, Route, Navigate } from "react-router-dom";

// Importing pages
import Login from "../pages/Login";

import Register from "../pages/Register";

import Home from "../pages/Home";

import EventDetails from "../pages/EventDetails";

import Booking from "../pages/Booking";

import BookingHistory from "../pages/BookingHistory";

import OrganizerDashboard from "../pages/OrganizerDashboard";

import CreateEvent from "../pages/CreateEvent";

import EditEvent from "../pages/EditEvent";

import AdminDashboard from "../pages/AdminDashboard";

import Unauthorized from "../pages/Unauthorized";

import NotFound from "../pages/NotFound";

// Importing layouts
import MainLayout from "../layouts/MainLayout";

import DashboardLayout from "../layouts/DashboardLayout";

// Importing protected route component
import ProtectedRoute from "../components/ProtectedRoute";

// ==========================================
// APPLICATION ROUTES COMPONENT
// ==========================================

const AppRoutes = () => {
  return (
    <Routes>
      {/* ==========================================
            PUBLIC ROUTES
        ========================================== */}

      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Register Route */}
      <Route path="/register" element={<Register />} />

      {/* ==========================================
            MAIN USER ROUTES
        ========================================== */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Home Page */}
        <Route index element={<Home />} />

        {/* Event Details */}
        <Route path="events/:id" element={<EventDetails />} />

        {/* Booking Page */}
        <Route path="booking/:id" element={<Booking />} />

        {/* Booking History */}
        <Route path="my-bookings" element={<BookingHistory />} />
      </Route>

      {/* ==========================================
            ORGANIZER ROUTES
        ========================================== */}

      <Route
        path="/organizer"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Organizer Dashboard */}
        <Route index element={<OrganizerDashboard />} />

        {/* Create Event */}
        <Route path="create-event" element={<CreateEvent />} />

        {/* Edit Event */}
        <Route path="edit-event/:id" element={<EditEvent />} />
      </Route>

      {/* ==========================================
            ADMIN ROUTES
        ========================================== */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Admin Dashboard */}
        <Route index element={<AdminDashboard />} />
      </Route>

      {/* ==========================================
            UNAUTHORIZED PAGE
        ========================================== */}

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ==========================================
            REDIRECT ROUTE
        ========================================== */}

      <Route path="/home" element={<Navigate to="/" />} />

      {/* ==========================================
            NOT FOUND PAGE
        ========================================== */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// ==========================================
// EXPORTING ROUTES
// ==========================================

export default AppRoutes;
