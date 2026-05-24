// ==========================================
// APPLICATION CONSTANTS
// ==========================================

export const APP_NAME =
  process.env.REACT_APP_APP_NAME || "Event Management System";

// ==========================================
// API CONFIGURATION
// ==========================================

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

// ==========================================
// USER ROLES
// ==========================================

export const USER_ROLES = {
  ADMIN: "admin",

  ORGANIZER: "organizer",

  ATTENDEE: "attendee",
};

// ==========================================
// EVENT CATEGORIES
// ==========================================

export const EVENT_CATEGORIES = [
  "Music",

  "Technology",

  "Business",

  "Education",

  "Sports",

  "Workshop",

  "Entertainment",

  "Conference",

  "Festival",

  "Startup",
];

// ==========================================
// BOOKING STATUS
// ==========================================

export const BOOKING_STATUS = {
  CONFIRMED: "confirmed",

  CANCELLED: "cancelled",

  PENDING: "pending",
};

// ==========================================
// PAYMENT STATUS
// ==========================================

export const PAYMENT_STATUS = {
  PAID: "paid",

  UNPAID: "unpaid",

  REFUNDED: "refunded",
};

// ==========================================
// EVENT STATUS
// ==========================================

export const EVENT_STATUS = {
  UPCOMING: "upcoming",

  COMPLETED: "completed",

  CANCELLED: "cancelled",
};

// ==========================================
// PAGINATION CONFIGURATION
// ==========================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,

  DEFAULT_LIMIT: 10,

  MAX_LIMIT: 50,
};

// ==========================================
// TOAST MESSAGES
// ==========================================

export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",

  REGISTER_SUCCESS: "Registration successful",

  LOGOUT_SUCCESS: "Logout successful",

  EVENT_CREATED: "Event created successfully",

  EVENT_UPDATED: "Event updated successfully",

  EVENT_DELETED: "Event deleted successfully",

  BOOKING_SUCCESS: "Booking confirmed successfully",

  BOOKING_CANCELLED: "Booking cancelled successfully",

  SOMETHING_WENT_WRONG: "Something went wrong",
};

// ==========================================
// ROUTE PATHS
// ==========================================

export const ROUTES = {
  HOME: "/",

  LOGIN: "/login",

  REGISTER: "/register",

  EVENT_DETAILS: "/events/:id",

  BOOKING: "/booking/:id",

  BOOKING_HISTORY: "/booking-history",

  ORGANIZER_DASHBOARD: "/organizer/dashboard",

  CREATE_EVENT: "/organizer/create-event",

  EDIT_EVENT: "/organizer/edit-event/:id",

  ADMIN_DASHBOARD: "/admin/dashboard",

  UNAUTHORIZED: "/unauthorized",
};

// ==========================================
// LOCAL STORAGE KEYS
// ==========================================

export const STORAGE_KEYS = {
  TOKEN: "event_management_token",

  USER: "event_management_user",
};

// ==========================================
// FILE UPLOAD CONFIGURATION
// ==========================================

export const FILE_UPLOAD = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024,

  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
};

// ==========================================
// SEAT CONFIGURATION
// ==========================================

export const SEAT_CONFIG = {
  ROWS: 10,

  COLUMNS: 10,
};

// ==========================================
// DASHBOARD STATISTICS CARDS
// ==========================================

export const DASHBOARD_CARDS = {
  TOTAL_EVENTS: "Total Events",

  TOTAL_BOOKINGS: "Total Bookings",

  TOTAL_REVENUE: "Total Revenue",

  ACTIVE_USERS: "Active Users",
};
