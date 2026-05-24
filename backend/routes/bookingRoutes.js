import express from "express";
const router = express.Router();

// Importing controllers
import {
  createNewBooking,
  fetchUserBookings,
  fetchEventBookings,
  cancelUserBooking,
  fetchPublicBookedSeats, // Ensure this is imported
} from "../controllers/bookingController.js";

// Importing middlewares
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { validateBooking } from "../middleware/validationMiddleware.js";

// ==========================================
// BOOKING ROUTES
// ==========================================

// 1. CREATE NEW TICKET BOOKING
router.post("/", authMiddleware, validateBooking, createNewBooking);

// 2. GET BOOKINGS OF THE LOGGED-IN USER
router.get("/my-bookings", authMiddleware, fetchUserBookings);

// 3. GET ALL BOOKINGS (Organizer/Admin only - Full details)
router.get(
  "/event/:eventId",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  fetchEventBookings,
);

// 4. PUBLIC/ATTENDEE ROUTE: See taken seats (No role restriction)
router.get(
  "/public/booked-seats/:eventId",
  authMiddleware,
  fetchPublicBookedSeats,
);

// 5. CANCEL A BOOKING
router.delete("/:bookingId", authMiddleware, cancelUserBooking);

export default router;
