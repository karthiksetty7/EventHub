import express from "express";
const router = express.Router();

import {
  createNewEvent,
  fetchAllEvents,
  fetchSingleEvent,
  fetchOrganizerEvents,
  updateSingleEvent,
  deleteSingleEvent,
  fetchUpcomingEvents,
} from "../controllers/eventController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import uploadEventImage from "../middleware/uploadMiddleware.js";
import {
  validateEvent,
  validateIdParam,
  validatePagination,
} from "../middleware/validationMiddleware.js";

// Helper to normalize data only when needed (POST/PUT)
const normalizeEventData = (req, res, next) => {
  if (req.body.total_seats) req.body.total_seats = Number(req.body.total_seats);
  if (req.body.base_price) req.body.base_price = Number(req.body.base_price);
  next();
};

// ==========================================
// PUBLIC EVENT ROUTES
// ==========================================

// GET ALL EVENTS (Public)
router.get("/", validatePagination, fetchAllEvents);

// GET UPCOMING EVENTS (Public)
router.get("/upcoming", fetchUpcomingEvents);

// GET SINGLE EVENT BY ID (Public)
router.get("/:id", validateIdParam, fetchSingleEvent);

// ==========================================
// PROTECTED ROUTES
// ==========================================

// CREATE NEW EVENT
router.post(
  "/",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  uploadEventImage,
  normalizeEventData,
  validateEvent,
  createNewEvent,
);

// GET EVENTS CREATED BY THE LOGGED-IN ORGANIZER
router.get(
  "/organizer/my-events",
  authMiddleware,
  roleMiddleware("organizer"),
  fetchOrganizerEvents,
);

// UPDATE AN EVENT BY ID
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  uploadEventImage, // 1. MUST BE FIRST to parse FormData
  normalizeEventData, // 2. Then normalize the numbers
  validateIdParam, // 3. Then validate IDs
  validateEvent, // 4. Finally validate the now-populated req.body
  updateSingleEvent, // 5. Then run controller
);

// DELETE AN EVENT BY ID
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("organizer", "admin"),
  validateIdParam,
  deleteSingleEvent,
);

export default router;
