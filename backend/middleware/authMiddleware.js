import jwt from "jsonwebtoken";

// ==========================================
// AUTHENTICATION MIDDLEWARE
// Verifies JWT Token
// ==========================================
// middleware/authMiddleware.js
const authMiddleware = (request, response, next) => {
  // Use a case-insensitive lookup for the Authorization header
  const authHeader =
    request.headers["authorization"] || request.headers["Authorization"];

  // DEBUG: Print what the middleware actually sees
  console.log("DEBUG: Middleware checking header:", authHeader);

  if (!authHeader) {
    return response
      .status(401)
      .json({ success: false, message: "Authorization token missing" });
  }

  // Handle both "Bearer <token>" and just "<token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return response
      .status(401)
      .json({ success: false, message: "Invalid token format" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decodedToken;
    next();
  } catch (error) {
    // THIS IS THE IMPORTANT CHANGE
    console.error("DEBUG: JWT Verification Failed:", error.message);
    return response.status(401).json({
      success: false,
      message: "Invalid or expired token",
      details: error.message, // Return the error to the client for debugging
    });
  }
};

export default authMiddleware;
