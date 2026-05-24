// Reusable inline core validator rules with required .js extensions
import {
  validateRegisterData,
  validateLoginData,
  validateEventData,
  validateBookingData,
} from "../utils/validators.js";

// ==========================================
// REGISTER VALIDATION MIDDLEWARE
// ==========================================
export const validateRegister = (request, response, next) => {
  try {
    const { isValid, errors } = validateRegisterData(request.body);

    if (!isValid) {
      return response.status(400).json({
        success: false,
        message: "Registration validation failed",
        errors,
      });
    }

    next();
  } catch (error) {
    console.error("Register Validation Error:", error.message);
    return response.status(500).json({
      success: false,
      message: "Validation failed",
    });
  }
};

// ==========================================
// LOGIN VALIDATION MIDDLEWARE
// ==========================================
export const validateLogin = (request, response, next) => {
  try {
    const { isValid, errors } = validateLoginData(request.body);

    if (!isValid) {
      return response.status(400).json({
        success: false,
        message: "Login validation failed",
        errors,
      });
    }

    next();
  } catch (error) {
    console.error("Login Validation Error:", error.message);
    return response.status(500).json({
      success: false,
      message: "Validation failed",
    });
  }
};

// ==========================================
// EVENT VALIDATION MIDDLEWARE
// ==========================================
export const validateEvent = (request, response, next) => {
  console.log("SERVER RECEIVED DATA:", request.body); // This should no longer be empty
  console.log("DEBUG: Middleware received req.body:", request.body);
  // Add these lines to see what the validator is "seeing"
  console.log("--- VALIDATOR DEBUG ---");
  console.log("Request Body:", request.body);
  console.log("Total Seats Type:", typeof request.body.total_seats);
  console.log("Base Price Type:", typeof request.body.base_price);
  try {
    const { isValid, errors } = validateEventData(request.body);

    if (!isValid) {
      return response.status(400).json({
        success: false,
        message: "Event validation failed",
        errors,
      });
    }

    const currentDate = new Date();
    const selectedDate = new Date(request.body.event_date);

    if (selectedDate < currentDate) {
      return response.status(400).json({
        success: false,
        message: "Event date cannot be in the past",
      });
    }

    next();
  } catch (error) {
    console.error("Event Validation Error:", error.message);
    return response.status(500).json({
      success: false,
      message: "Validation failed",
    });
  }
};

// ==========================================
// BOOKING VALIDATION MIDDLEWARE
// ==========================================
export const validateBooking = (request, response, next) => {
  console.log("DEBUG: Booking Middleware Received:", request.body);
  try {
    const { isValid, errors } = validateBookingData(request.body);

    if (!isValid) {
      return response
        .status(400)
        .json({ success: false, message: "Booking validation failed", errors });
    }

    next();
  } catch (error) {
    console.error("Booking Validation Error:", error.message);
    return response.status(500).json({
      success: false,
      message: "Validation failed",
    });
  }
};

// ==========================================
// PARAM ID VALIDATION
// ==========================================
export const validateIdParam = (request, response, next) => {
  try {
    const { id } = request.params;
    console.log("DEBUG: Request Params ID is:", request.params.id);

    // 1. Check if ID is missing or explicitly 'undefined'
    if (!id || id === "undefined" || id === "null") {
      return response.status(400).json({
        success: false,
        message: "ID parameter is missing or invalid",
      });
    }

    // 2. Validate that it's a number (keep your logic but make it safer)
    if (isNaN(Number(id))) {
      return response.status(400).json({
        success: false,
        message: "Invalid ID format: ID must be a number",
      });
    }

    next();
  } catch (error) {
    console.error("ID Validation Error:", error.message);
    return response.status(500).json({
      success: false,
      message: "Validation failed",
    });
  }
};

// ==========================================
// OPTIONAL PAGINATION VALIDATION
// ==========================================
export const validatePagination = (request, response, next) => {
  try {
    let { page, limit } = request.query;

    page = page || 1;
    limit = limit || 10;

    if (isNaN(Number(page)) || isNaN(Number(limit))) {
      return response.status(400).json({
        success: false,
        message: "Page and limit must be numbers",
      });
    }

    if (Number(page) <= 0 || Number(limit) <= 0) {
      return response.status(400).json({
        success: false,
        message: "Page and limit must be greater than 0",
      });
    }

    next();
  } catch (error) {
    console.error("Pagination Validation Error:", error.message);
    return response.status(500).json({
      success: false,
      message: "Validation failed",
    });
  }
};
