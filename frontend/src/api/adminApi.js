import axiosInstance from "../services/axiosInstance";

// ==========================================
// COMMON ERROR HANDLER
// ==========================================
const handleApiError = (error, defaultMessage = "Something went wrong") => {
  const customError = new Error(
    error?.response?.data?.message || error?.message || defaultMessage,
  );

  customError.status = error?.response?.status || 500;

  customError.success = false;

  throw customError;
};

// ==========================================
// GET ADMIN DASHBOARD STATS
// ==========================================
export const getDashboardStats = async () => {
  try {
    const response = await axiosInstance.get("/admin/dashboard");

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch dashboard stats");
  }
};

// ==========================================
// GET ALL USERS
// ==========================================
export const getAllUsers = async (queryParams) => {
  try {
    const response = await axiosInstance.get("/admin/users", {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch users");
  }
};

// ==========================================
// DELETE USER
// ==========================================
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/admin/users/${userId}`);

    return response.data;
  } catch (error) {
    handleApiError(error, "User deletion failed");
  }
};

// ==========================================
// GET ALL BOOKINGS
// ==========================================
export const getAllBookings = async (queryParams) => {
  try {
    const response = await axiosInstance.get("/admin/bookings", {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch bookings");
  }
};

// ==========================================
// GET ADMIN EVENTS
// ==========================================
export const getAdminEvents = async (queryParams) => {
  try {
    const response = await axiosInstance.get("/admin/events", {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch events");
  }
};

// ==========================================
// DELETE ADMIN EVENT
// ==========================================
export const deleteAdminEvent = async (eventId) => {
  try {
    const response = await axiosInstance.delete(`/admin/events/${eventId}`);

    return response.data;
  } catch (error) {
    handleApiError(error, "Event deletion failed");
  }
};

// ==========================================
// BLOCK USER
// ==========================================
export const blockUser = async (userId) => {
  try {
    const response = await axiosInstance.put(`/admin/block-user/${userId}`);

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to block user");
  }
};

// ==========================================
// UNBLOCK USER
// ==========================================
export const unblockUser = async (userId) => {
  try {
    const response = await axiosInstance.put(`/admin/unblock-user/${userId}`);

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to unblock user");
  }
};

// ==========================================
// GET REVENUE ANALYTICS
// ==========================================
export const getRevenueAnalytics = async () => {
  try {
    const response = await axiosInstance.get("/admin/revenue-analytics");

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch analytics");
  }
};

// ==========================================
// GET BOOKING ANALYTICS
// ==========================================
export const getBookingAnalytics = async () => {
  try {
    const response = await axiosInstance.get("/admin/booking-analytics");

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch booking analytics");
  }
};

// ==========================================
// RENAME THIS TO MATCH YOUR DASHBOARD CALL
// ==========================================
export const deleteAdminUser = async (userId) => {
  // Changed from deleteUser
  try {
    const response = await axiosInstance.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "User deletion failed");
  }
};
