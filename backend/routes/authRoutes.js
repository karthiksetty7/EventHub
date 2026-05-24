import express from "express";
const router = express.Router();

// Importing controllers with required .js extension
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController.js";

// Importing middlewares with required .js extension
import authMiddleware from "../middleware/authMiddleware.js";
import {
  validateRegister,
  validateLogin,
} from "../middleware/validationMiddleware.js";

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// USER REGISTRATION
// POST /api/auth/register
router.post("/register", validateRegister, registerUser);

// USER LOGIN
// POST /api/auth/login
router.post("/login", validateLogin, loginUser);

// GET CURRENT LOGGED-IN USER PROFILE
// GET /api/auth/me
router.get("/me", authMiddleware, getCurrentUser);

export default router;
