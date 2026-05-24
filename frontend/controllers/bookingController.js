import { db } from "../config/db.js";

// ==========================================
// BOOKING MODEL FUNCTIONS
// ==========================================
import {
  createBooking,
  getBookingBySeat,
  updateSeatStatus,
  getUserBookings,
  getEventBookings,
  cancelBooking,
  getBookingById,
  createBookingHistory,
  getPublicBookedSeats,
} from "../models/bookingModel.js";

// ==========================================
// EVENT MODEL FUNCTIONS
// ==========================================
import { getEventById, updateAvailableSeats } from "../models/eventModel.js";

// ==========================================
// UTILITIES
// ==========================================
import generateQRCode from "../utils/qrGenerator.js";

import { sendBookingConfirmationEmail } from "../utils/emailService.js";

import { updateEventPricing } from "./eventController.js";

// ==========================================
// CREATE BOOKING CONTROLLER
// ==========================================
export const createNewBooking = async (request, response) => {
  try {
    const userId = request.user.id;
    const userEmail = request.user.email;

    const { event_id, seat_number } = request.body;

    // ==========================================
    // VALIDATION
    // ==========================================
    if (!event_id || !seat_number) {
      return response.status(400).json({
        success: false,
        message: "Please select event and seat",
      });
    }

    // ==========================================
    // FETCH EVENT
    // ==========================================
    const event = await getEventById(event_id);

    if (!event) {
      return response.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // ==========================================
    // CHECK SEAT AVAILABILITY
    // ==========================================
    const existingBooking = await getBookingBySeat(event_id, seat_number);

    if (existingBooking) {
      return response.status(400).json({
        success: false,
        message: "Seat already booked. Please choose another seat.",
      });
    }

    // ==========================================
    // CHECK AVAILABLE SEATS
    // ==========================================
    if (event.available_seats <= 0) {
      return response.status(400).json({
        success: false,
        message: "No seats available",
      });
    }

    // ==========================================
    // GENERATE QR CODE
    // ==========================================
    let qrCode = null;

    try {
      qrCode = await generateQRCode({
        ticket_id: Date.now(),
        user_id: userId,
        event_id,
        seat_number,
        event_title: event.title,
        event_date: event.event_date,
      });
    } catch (qrError) {
      return response.status(500).json({
        success: false,
        message: "Failed to generate QR code",
      });
    }

    // ==========================================
    // CREATE BOOKING
    // ==========================================
    const booking = await createBooking({
      user_id: userId,
      event_id,
      seat_number,
      ticket_price: event.current_price,
      qr_code: qrCode,
    });

    // ==========================================
    // UPDATE SEAT STATUS
    // ==========================================
    await updateSeatStatus(event_id, seat_number, 1);

    // ==========================================
    // UPDATE AVAILABLE SEATS
    // ==========================================
    const updatedAvailableSeats = event.available_seats - 1;

    await updateAvailableSeats(event_id, updatedAvailableSeats);

    // ==========================================
    // UPDATE DYNAMIC PRICING
    // ==========================================
    await updateEventPricing(
      event_id,
      updatedAvailableSeats,
      event.total_seats,
      event.base_price,
    );

    // ==========================================
    // CREATE BOOKING HISTORY
    // ==========================================
    await createBookingHistory({
      user_id: userId,
      event_id,
      ticket_id: booking.id,
      action: "BOOKED",
    });

    // ==========================================
    // SEND EMAIL
    // ==========================================
    try {
      await sendBookingConfirmationEmail({
        userEmail,
        userName: request.user.name || "User",
        eventTitle: event.title,
        eventDate: event.event_date,
        eventTime: event.event_time,
        location: event.location,
        seatNumber: seat_number,
        ticketPrice: event.current_price,
        qrCode,
      });
    } catch (emailError) {
      console.error("Email Sending Failed:", emailError.message);
    }

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================
    return response.status(201).json({
      success: true,
      message: "Ticket booked successfully",
      booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    return response.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

// ==========================================
// GET USER BOOKINGS
// ==========================================
export const fetchUserBookings = async (request, response) => {
  try {
    const userId = request.user.id;

    const bookings = await getUserBookings(userId);

    return response.status(200).json({
      success: true,
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Fetch User Bookings Error:", error);

    return response.status(500).json({
      success: false,
      message: "Failed to fetch user bookings",
    });
  }
};

// ==========================================
// GET EVENT BOOKINGS
// ==========================================
export const fetchEventBookings = async (request, response) => {
  try {
    const { eventId } = request.params;

    if (!eventId) {
      return response.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    const bookings = await getEventBookings(eventId);

    return response.status(200).json({
      success: true,
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Fetch Event Bookings Error:", error);

    return response.status(500).json({
      success: false,
      message: "Failed to fetch event bookings",
    });
  }
};

// ==========================================
// CANCEL BOOKING
// ==========================================
export const cancelUserBooking = async (request, response) => {
  try {
    const { bookingId } = request.params;

    const userId = request.user.id;

    // ==========================================
    // FETCH BOOKING
    // ==========================================
    const booking = await getBookingById(bookingId);

    if (!booking) {
      return response.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // ==========================================
    // AUTHORIZATION
    // ==========================================
    if (booking.user_id !== userId) {
      return response.status(403).json({
        success: false,
        message: "You can only cancel your own booking",
      });
    }

    // ==========================================
    // CANCEL BOOKING
    // ==========================================
    await cancelBooking(bookingId);

    // ==========================================
    // FREE SEAT INVENTORY
    // ==========================================
    await updateSeatStatus(booking.event_id, booking.seat_number, 0);

    // ==========================================
    // UPDATE AVAILABLE SEATS
    // ==========================================
    const event = await getEventById(booking.event_id);

    const updatedAvailableSeats = event.available_seats + 1;

    await updateAvailableSeats(booking.event_id, updatedAvailableSeats);

    // ==========================================
    // UPDATE DYNAMIC PRICING
    // ==========================================
    await updateEventPricing(
      booking.event_id,
      updatedAvailableSeats,
      event.total_seats,
      event.base_price,
    );

    // ==========================================
    // CREATE HISTORY
    // ==========================================
    await createBookingHistory({
      user_id: userId,
      event_id: booking.event_id,
      ticket_id: booking.id,
      action: "CANCELLED",
    });

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================
    return response.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error);

    return response.status(500).json({
      success: false,
      message: "Failed to cancel booking",
    });
  }
};

// ==========================================
// FETCH PUBLIC BOOKED SEATS
// ==========================================
export const fetchPublicBookedSeats = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    // ==========================================
    // FETCH BOOKED SEATS
    // ==========================================
    const rows = await getPublicBookedSeats(eventId);

    // ==========================================
    // FORMAT RESPONSE
    // ==========================================
    const bookedSeats = rows.map((row) => ({
      seat_number: row.seat_number,
    }));

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================
    return res.status(200).json({
      success: true,
      bookings: bookedSeats,
    });
  } catch (error) {
    console.error("Fetch Public Seats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch booked seats",
    });
  }
};
