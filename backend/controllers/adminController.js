import { db } from "../config/db.js";

import { getTotalUsersCount } from "../models/userModel.js";

import { getTotalEventsCount } from "../models/eventModel.js";

import { getTotalBookingsCount } from "../models/bookingModel.js";

// ==========================================
// GET FULL DASHBOARD DATA
// ==========================================
export const getFullDashboardData = async (req, res) => {
  try {
    // ==========================================
    // FETCH DASHBOARD DATA
    // ==========================================
    const [
      stats,
      users,
      events,
      bookings,
      userCount,
      eventCount,
      bookingCount,
    ] = await Promise.all([
      // ==========================================
      // TOTAL REVENUE
      // ==========================================
      db.execute(`
        SELECT 
          SUM(ticket_price) AS total_revenue 
        FROM tickets 
        WHERE booking_status = 'CONFIRMED'
      `),

      // ==========================================
      // USERS
      // ==========================================
      db.execute(`
        SELECT 
          id,
          name,
          email,
          role,
          created_at,
          is_active,
          last_login
        FROM users
        ORDER BY created_at DESC
      `),

      // ==========================================
      // EVENTS
      // ==========================================
      db.execute(`
        SELECT 
          events.*,
          users.name AS organizer_name
        FROM events
        INNER JOIN users
          ON events.organizer_id = users.id
        ORDER BY events.created_at DESC
      `),

      // ==========================================
      // BOOKINGS
      // ==========================================
      db.execute(`
        SELECT 
          tickets.*,
          users.name AS user_name,
          events.title AS event_title
        FROM tickets
        INNER JOIN users
          ON tickets.user_id = users.id
        INNER JOIN events
          ON tickets.event_id = events.id
        ORDER BY tickets.booked_at DESC
      `),

      // ==========================================
      // COUNTS
      // ==========================================
      getTotalUsersCount(),
      getTotalEventsCount(),
      getTotalBookingsCount(),
    ]);

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================
    return res.status(200).json({
      success: true,

      statistics: {
        totalUsers: userCount || 0,

        totalEvents: eventCount || 0,

        totalBookings: bookingCount || 0,

        totalRevenue: stats.rows[0]?.total_revenue || 0,
      },

      users: users.rows || [],

      events: events.rows || [],

      bookings: bookings.rows || [],
    });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
    });
  }
};

// ==========================================
// DELETE EVENT (ADMIN + ORGANIZER)
// ==========================================
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const { userId, role } = req.user;

    // ==========================================
    // VALIDATION
    // ==========================================
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    // ==========================================
    // FETCH EVENT
    // ==========================================
    const result = await db.execute(
      `
      SELECT organizer_id
      FROM events
      WHERE id = ?
      `,
      [id],
    );

    const events = result.rows;

    // ==========================================
    // CHECK EVENT EXISTS
    // ==========================================
    if (!events || events.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // ==========================================
    // AUTHORIZATION
    // ==========================================
    const isOwner = events[0].organizer_id === userId;

    const isAdmin = role === "admin";

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own events",
      });
    }

    // ==========================================
    // DELETE EVENT
    // ==========================================
    await db.execute(
      `
      DELETE FROM events
      WHERE id = ?
      `,
      [id],
    );

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================
    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};



// ==========================================
// DELETE USER (PROTECTED)
// ==========================================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: adminId, role: adminRole } = req.user;

    // 1. Only admin can delete users
    if (adminRole !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // 2. Fetch target user
    // NOTE: Depending on your DB driver, check if you need 'result.rows[0]'
    // instead of '[users] = ...' if you aren't using destructuring
    const result = await db.execute("SELECT id, role FROM users WHERE id = ?", [
      id,
    ]);
    const targetUser = result.rows[0];

    if (!targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 3. Prevent self-deletion
    if (String(targetUser.id) === String(adminId)) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot delete yourself" });
    }

    // 4. Prevent deleting other admins
    if (targetUser.role === "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Cannot delete other admins" });
    }

    // 5. Delete
    await db.execute("DELETE FROM users WHERE id = ?", [id]);

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete user" });
  }
};
