// ==========================================
// IMPORTING DATABASE CONNECTION
// ==========================================
import { db } from "../config/db.js";

// ==========================================
// CREATE NEW EVENT
// ==========================================
export const createEvent = async (eventData) => {
  const {
    organizer_id,
    title,
    description,
    category,
    location,
    event_date,
    event_time,
    total_seats,
    base_price,
    current_price,
    image_url,
  } = eventData;

  const createEventQuery = `
    INSERT INTO events (
      organizer_id, title, description, category, location,
      event_date, event_time, total_seats, available_seats,
      base_price, current_price, image_url, status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE')
  `;
  const result = await db.execute({
    sql: createEventQuery,
    args: [
      organizer_id,
      title,
      description,
      category,
      location,
      event_date,
      event_time,
      total_seats,
      total_seats,
      base_price,
      current_price,
      image_url,
    ],
  });

  return {
    id: Number(result.lastInsertRowid),
    ...eventData,
    status: "ACTIVE", // Ensure the returned object reflects this
  };
};

// ==========================================
// GET ALL EVENTS (Supports Search & Filters)
// ==========================================
export const getAllEvents = async (filters) => {
  // Use a subquery to get counts to avoid grouping issues entirely
  let query = `
    SELECT 
      e.*, 
      u.name AS organizer_name,
      (e.total_seats - (SELECT COUNT(*) FROM booking_history bh WHERE bh.event_id = e.id)) AS calculated_available_seats
    FROM events e
    INNER JOIN users u ON e.organizer_id = u.id
    WHERE e.status = 'ACTIVE'
  `;
  const queryParams = [];

  if (filters.search) {
    query += ` AND (e.title LIKE ? OR e.category LIKE ? OR e.location LIKE ?) `;
    const searchValue = `%${filters.search}%`;
    queryParams.push(searchValue, searchValue, searchValue);
  }

  if (filters.category) {
    query += ` AND e.category = ? `;
    queryParams.push(filters.category);
  }

  query += ` ORDER BY e.created_at DESC `;

  const result = await db.execute({ sql: query, args: queryParams });
  return result.rows;
};

// ==========================================
// GET SINGLE EVENT BY ID
// ==========================================
export const getEventById = async (eventId) => {
  const query = `
    SELECT events.*, users.name AS organizer_name, users.email AS organizer_email
    FROM events
    INNER JOIN users ON events.organizer_id = users.id
    WHERE events.id = ?
  `;
  const result = await db.execute({ sql: query, args: [eventId] });
  return result.rows[0];
};

// ==========================================
// GET EVENTS BY ORGANIZER
// ==========================================
export const getEventsByOrganizer = async (organizerId) => {
  const query = `
    SELECT * FROM events
    WHERE organizer_id = ?
    ORDER BY created_at DESC
  `;
  const result = await db.execute({ sql: query, args: [organizerId] });
  return result.rows;
};

// ==========================================
// UPDATE EVENT
// ==========================================
export const updateEvent = async (eventId, updatedData) => {
  const {
    title,
    description,
    category,
    location,
    event_date,
    event_time,
    total_seats,
    base_price,
    current_price,
    image_url,
    status,
  } = updatedData;

  const updateQuery = `
    UPDATE events
    SET title = ?, description = ?, category = ?, location = ?,
        event_date = ?, event_time = ?, total_seats = ?,
        base_price = ?, current_price = ?, image_url = ?,
        status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  // Ensure all values are defined (fallback to null if undefined)
  const args = [
    title ?? null,
    description ?? null,
    category ?? null,
    location ?? null,
    event_date ?? null,
    event_time ?? null,
    total_seats ?? 0,
    base_price ?? 0,
    current_price ?? 0,
    image_url ?? null,
    status ?? "ACTIVE",
    eventId,
  ];

  const result = await db.execute({
    sql: updateQuery,
    args: args,
  });

  return { updatedRows: result.rowsAffected };
};

// ==========================================
// DELETE EVENT
// ==========================================
export const deleteEvent = async (eventId) => {
  const query = `DELETE FROM events WHERE id = ?`;
  const result = await db.execute({ sql: query, args: [eventId] });
  return { deletedRows: result.rowsAffected };
};

// ==========================================
// UPDATE AVAILABLE SEATS
// ==========================================
export const updateAvailableSeats = async (eventId, availableSeats) => {
  const query = `UPDATE events SET available_seats = ? WHERE id = ?`;
  const result = await db.execute({
    sql: query,
    args: [availableSeats, eventId],
  });
  return { updatedRows: result.rowsAffected };
};

// ==========================================
// UPDATE DYNAMIC EVENT PRICING
// ==========================================
export const updateDynamicPricing = async (eventId, currentPrice) => {
  const query = `UPDATE events SET current_price = ? WHERE id = ?`;
  const result = await db.execute({
    sql: query,
    args: [currentPrice, eventId],
  });
  return { updatedRows: result.rowsAffected };
};

// ==========================================
// GET TOTAL EVENTS COUNT
// ==========================================
export const getTotalEventsCount = async () => {
  const query = `SELECT COUNT(*) AS total_events FROM events`;
  const result = await db.execute(query);
  return result.rows[0].total_events;
};

// ==========================================
// GET UPCOMING EVENTS
// ==========================================
export const getUpcomingEvents = async () => {
  const query = `
    SELECT events.*, users.name AS organizer_name
    FROM events
    INNER JOIN users ON events.organizer_id = users.id
    WHERE events.event_date >= DATE('now') 
      AND events.status = 'ACTIVE'
    ORDER BY events.event_date ASC
    LIMIT 10
  `;
  const result = await db.execute(query);
  return result.rows;
};
