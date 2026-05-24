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
// CREATE BOOKING
// ==========================================
export const createBooking = async (bookingData) => {
  try {
    const response = await axiosInstance.post("/bookings", bookingData);

    return response.data;
  } catch (error) {
    handleApiError(error, "Booking failed");
  }
};

// ==========================================
// GET USER BOOKINGS
// ==========================================
export const getUserBookings = async () => {
  try {
    const response = await axiosInstance.get("/bookings/my-bookings");

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch bookings");
  }
};

// ==========================================
// GET SINGLE BOOKING
// ==========================================
export const getBookingById = async (bookingId) => {
  try {
    const response = await axiosInstance.get(`/bookings/${bookingId}`);

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch booking details");
  }
};

// ==========================================
// CANCEL BOOKING
// ==========================================
export const cancelBooking = async (bookingId) => {
  try {
    const response = await axiosInstance.put(`/bookings/cancel/${bookingId}`);

    return response.data;
  } catch (error) {
    handleApiError(error, "Booking cancellation failed");
  }
};

// ==========================================
// DOWNLOAD TICKET
// ==========================================
export const downloadTicket = async (bookingId) => {
  try {
    const response = await axiosInstance.get(`/bookings/ticket/${bookingId}`, {
      responseType: "blob",
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Ticket download failed");
  }
};

// ==========================================
// GET BOOKED SEATS
// ==========================================
export const getBookedSeats = async (eventId) => {
  try {
    const response = await axiosInstance.get(
      `/bookings/public/booked-seats/${eventId}`,
    );

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch booked seats");
  }
};

// ==========================================
// VERIFY QR TICKET
// ==========================================
export const verifyTicket = async (qrCodeData) => {
  try {
    const response = await axiosInstance.post(
      "/bookings/verify-ticket",
      qrCodeData,
    );

    return response.data;
  } catch (error) {
    handleApiError(error, "Ticket verification failed");
  }
};

// ==========================================
// RESEND BOOKING EMAIL
// ==========================================
export const resendBookingEmail = async (bookingId) => {
  try {
    const response = await axiosInstance.post(
      `/bookings/resend-email/${bookingId}`,
    );

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to resend email");
  }
};
