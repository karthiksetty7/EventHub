// ==========================================
// IMPORTING DATABASE CONNECTION
// ==========================================
import { db } from "../config/db.js";

// ==========================================
// CREATE NEW BOOKING
// ==========================================
export const createBooking = async (bookingData) => {
  const { user_id, event_id, seat_number, ticket_price, qr_code } = bookingData;

  const createBookingQuery = `
    INSERT INTO tickets (user_id, event_id, seat_number, ticket_price, qr_code)
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await db.execute({
    sql: createBookingQuery,
    args: [user_id, event_id, seat_number, ticket_price, qr_code],
  });

  return {
    id: Number(result.lastInsertRowid),
    ...bookingData,
  };
};

// ==========================================
// GET BOOKING BY EVENT & SEAT
// ==========================================
export const getBookingBySeat = async (eventId, seatNumber) => {
  const query = `
    SELECT *
    FROM tickets
    WHERE event_id = ?
    AND seat_number = ?
    AND booking_status = 'CONFIRMED'
  `;
  const result = await db.execute({ sql: query, args: [eventId, seatNumber] });
  return result.rows[0];
};

// ==========================================
// UPDATE SEAT STATUS
// ==========================================
export const updateSeatStatus = async (eventId, seatNumber, isBooked) => {
  const query = `
    UPDATE seat_inventory
    SET is_booked = ?
    WHERE event_id = ?
    AND seat_number = ?
  `;
  const result = await db.execute({
    sql: query,
    args: [isBooked, eventId, seatNumber],
  });
  return {
    updatedRows: result.rowsAffected,
  };
};

// ==========================================
// GET USER BOOKINGS
// ==========================================
export const getUserBookings = async (userId) => {
  const query = `
    SELECT
      tickets.*,
      events.title,
      events.location,
      events.event_date,
      events.event_time,
      events.image_url,
      events.base_price
    FROM tickets
    INNER JOIN events ON tickets.event_id = events.id
    WHERE tickets.user_id = ?
    ORDER BY tickets.booked_at DESC
  `;
  const result = await db.execute({ sql: query, args: [userId] });
  return result.rows;
};

// ==========================================
// GET EVENT BOOKINGS (Organizer Analytics)
// ==========================================
export const getEventBookings = async (eventId) => {
  const query = `
    SELECT
      tickets.*,
      users.name,
      users.email
    FROM tickets
    INNER JOIN users ON tickets.user_id = users.id
    WHERE tickets.event_id = ?
    ORDER BY tickets.booked_at DESC
  `;
  const result = await db.execute({ sql: query, args: [eventId] });
  return result.rows;
};

// ==========================================
// CANCEL BOOKING
// ==========================================
export const cancelBooking = async (bookingId) => {
  const query = `
    UPDATE tickets
    SET booking_status = 'CANCELLED'
    WHERE id = ?
  `;
  const result = await db.execute({ sql: query, args: [bookingId] });
  return {
    updatedRows: result.rowsAffected,
  };
};

// ==========================================
// GET BOOKING BY ID
// ==========================================
export const getBookingById = async (bookingId) => {
  const query = `
    SELECT *
    FROM tickets
    WHERE id = ?
  `;
  const result = await db.execute({ sql: query, args: [bookingId] });
  return result.rows[0];
};

// ==========================================
// CREATE BOOKING HISTORY
// ==========================================
export const createBookingHistory = async (historyData) => {
  const { user_id, event_id, ticket_id, action } = historyData;

  const query = `
    INSERT INTO booking_history (user_id, event_id, ticket_id, action)
    VALUES (?, ?, ?, ?)
  `;
  const result = await db.execute({
    sql: query,
    args: [user_id, event_id, ticket_id, action],
  });
  return {
    id: Number(result.lastInsertRowid),
  };
};

// ==========================================
// GET TOTAL BOOKINGS COUNT (Admin Analytics)
// ==========================================
export const getTotalBookingsCount = async () => {
  const query = `
    SELECT COUNT(*) AS total_bookings
    FROM tickets
  `;
  const result = await db.execute(query);
  return result.rows[0].total_bookings;
};

// Add this to bookingModel.js
export const getPublicBookedSeats = async (eventId) => {
  const query = `
    SELECT seat_number 
    FROM tickets 
    WHERE event_id = ? 
    AND booking_status = 'CONFIRMED'
  `;
  const result = await db.execute({ sql: query, args: [eventId] });
  return result.rows; // This returns an array like [{seat_number: '1.0'}, {seat_number: '2.0'}]
};
