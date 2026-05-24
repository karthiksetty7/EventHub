// ==========================================
// GLOBAL ERROR HANDLER MIDDLEWARE
// Handles application-wide server errors
// ==========================================
const errorMiddleware = (error, request, response, next) => {
  console.error("Server Error:", error);

  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  // SQLite Unique Constraint Error Handler Integration
  if (error.message && error.message.includes("UNIQUE constraint failed")) {
    statusCode = 400;
    message = "Duplicate data detected";
  }

  // SQLite Foreign Key Constraint Error Handler Integration
  if (
    error.message &&
    error.message.includes("FOREIGN KEY constraint failed")
  ) {
    statusCode = 400;
    message = "Invalid reference data provided";
  }

  response.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
