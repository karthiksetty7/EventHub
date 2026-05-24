// Importing express package
import express from "express";

// Creating router instance
const router = express.Router();

// Add this line at the very top of adminRoutes.js
router.use((req, res, next) => {
  console.log(
    `DEBUG: Admin Router received request: ${req.method} ${req.originalUrl}`,
  );
  next();
});

// Importing the unified controller
import {
  getFullDashboardData,
  deleteEvent,
  deleteUser,
} from "../controllers/adminController.js";

// Importing middlewares
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import { validateIdParam } from "../middleware/validationMiddleware.js";

// ==========================================
// ADMIN PROTECTED ROUTES
// ==========================================

// GET FULL DASHBOARD DATA
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  getFullDashboardData,
);

// DELETE EVENT
router.delete(
  "/events/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validateIdParam,
  deleteEvent,
);

// 2. ADD THIS NEW ROUTE FOR DELETING USERS
router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validateIdParam,
  deleteUser,
);

// Exporting router
export default router;
