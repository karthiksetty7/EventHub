import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importing Database Connection Bootstrapper
import { initializeDB } from "./config/db.js";

// Importing individual route modules
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Importing global error handler middleware
import errorMiddleware from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Standard Express Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// FIX: Disable caching for all API routes to prevent 304 errors
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static event uploaded images
app.use("/uploads", express.static("uploads"));

// ==========================================
// MOUNTING ROUTE LAYERS
// ==========================================
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// Fallback Route for Undefined Endpoints
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler (Must be mounted last)
app.use(errorMiddleware);

// ==========================================
// ASYNC SERVER LIFECYCLE BOOTSTRAP
// ==========================================
const startServer = async () => {
  try {
    await initializeDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "❌ Critical System Error: Failed to start the backend server:",
      error,
    );
    process.exit(1);
  }
};

startServer();
