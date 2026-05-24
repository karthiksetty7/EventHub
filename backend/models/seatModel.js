// ==========================================
// IMPORTING DATABASE CONNECTION
// ==========================================
import { db } from "../config/db.js";

// ==========================================
// CREATE SEAT
// ==========================================
export const createSeat = async (seatData) => {
  const { event_id, seat_number, is_booked } = seatData;

  const query = `
    INSERT INTO seat_inventory (event_id, seat_number, is_booked)
    VALUES (?, ?, ?)
  `;
  const result = await db.execute({
    sql: query,
    args: [event_id, seat_number, is_booked || 0],
  });

  return {
    id: Number(result.lastInsertRowid),
    ...seatData,
  };
};

// ==========================================
// GET ALL SEATS BY EVENT
// ==========================================
export const getSeatsByEvent = async (eventId) => {
  const query = `
    SELECT *
    FROM seat_inventory
    WHERE event_id = ?
    ORDER BY seat_number ASC
  `;
  const result = await db.execute({ sql: query, args: [eventId] });
  return result.rows;
};

// ==========================================
// GET SINGLE SEAT
// ==========================================
export const getSeatByNumber = async (eventId, seatNumber) => {
  const query = `
    SELECT *
    FROM seat_inventory
    WHERE event_id = ?
    AND seat_number = ?
  `;
  const result = await db.execute({ sql: query, args: [eventId, seatNumber] });
  return result.rows[0];
};

// ==========================================
// UPDATE SEAT BOOKING STATUS
// ==========================================
export const updateSeatBookingStatus = async (
  eventId,
  seatNumber,
  bookingStatus,
) => {
  const query = `
    UPDATE seat_inventory
    SET is_booked = ?
    WHERE event_id = ?
    AND seat_number = ?
  `;
  const result = await db.execute({
    sql: query,
    args: [bookingStatus, eventId, seatNumber],
  });
  return {
    updatedRows: result.rowsAffected,
  };
};

// ==========================================
// GET AVAILABLE SEATS
// ==========================================
export const getAvailableSeats = async (eventId) => {
  const query = `
    SELECT *
    FROM seat_inventory
    WHERE event_id = ?
    AND is_booked = 0
    ORDER BY seat_number ASC
  `;
  const result = await db.execute({ sql: query, args: [eventId] });
  return result.rows;
};

// ==========================================
// GET BOOKED SEATS
// ==========================================
export const getBookedSeats = async (eventId) => {
  const query = `
    SELECT *
    FROM seat_inventory
    WHERE event_id = ?
    AND is_booked = 1
    ORDER BY seat_number ASC
  `;
  const result = await db.execute({ sql: query, args: [eventId] });
  return result.rows;
};

// ==========================================
// GET TOTAL SEATS COUNT
// ==========================================
export const getTotalSeatsCount = async (eventId) => {
  const query = `
    SELECT COUNT(*) AS total_seats
    FROM seat_inventory
    WHERE event_id = ?
  `;
  const result = await db.execute({ sql: query, args: [eventId] });
  return result.rows[0].total_seats;
};

// ==========================================
// GET BOOKED SEATS COUNT
// ==========================================
export const getBookedSeatsCount = async (eventId) => {
  const query = `
    SELECT COUNT(*) AS booked_seats
    FROM seat_inventory
    WHERE event_id = ?
    AND is_booked = 1
  `;
  const result = await db.execute({ sql: query, args: [eventId] });
  return result.rows[0].booked_seats;
};

// ==========================================
// DELETE ALL SEATS OF EVENT
// ==========================================
export const deleteSeatsByEvent = async (eventId) => {
  const query = `
    DELETE FROM seat_inventory
    WHERE event_id = ?
  `;
  const result = await db.execute({
    sql: query,
    args: [eventId],
  });
  return {
    deletedRows: result.rowsAffected,
  };
};
