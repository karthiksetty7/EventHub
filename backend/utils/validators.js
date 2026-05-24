export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

export const validateRole = (role) => {
  const allowedRoles = ["admin", "organizer", "attendee"];
  return allowedRoles.includes(role);
};

export const validateEventData = (eventData) => {
  const errors = [];
  const {
    title,
    description,
    category,
    location,
    event_date,
    event_time,
    total_seats,
    base_price,
  } = eventData;

  if (!title || title.trim() === "") errors.push("Event title is required");
  if (!description || description.trim() === "")
    errors.push("Event description is required");
  if (!category || category.trim() === "")
    errors.push("Event category is required");
  if (!location || location.trim() === "")
    errors.push("Event location is required");
  if (!event_date || event_date.trim() === "")
    errors.push("Event date is required");
  if (!event_time || event_time.trim() === "")
    errors.push("Event time is required");

  const seats = Number(total_seats);
  const price = Number(base_price);

  if (isNaN(seats) || seats <= 0)
    errors.push("Total seats must be a number greater than 0");
  if (isNaN(price) || price <= 0)
    errors.push("Base ticket price must be a number greater than 0");

  return { isValid: errors.length === 0, errors };
};

export const validateBookingData = (bookingData) => {
  const errors = [];
  const { event_id, seat_number } = bookingData;

  if (!event_id) errors.push("Event ID is required");

  if (!seat_number) {
    errors.push("Seat number is required");
  } else if (Array.isArray(seat_number)) {
    if (
      seat_number.length === 0 ||
      seat_number.some((s) => !s || String(s).trim() === "")
    ) {
      errors.push("Seat numbers cannot be empty");
    }
  } else if (
    typeof seat_number !== "string" &&
    typeof seat_number !== "number"
  ) {
    errors.push("Invalid seat number format");
  } else if (String(seat_number).trim() === "") {
    errors.push("Seat number cannot be empty");
  }

  return { isValid: errors.length === 0, errors };
};

export const validateLoginData = (loginData) => {
  const errors = [];
  const { email, password } = loginData;

  if (!email || email.trim() === "") errors.push("Email is required");
  else if (!validateEmail(email)) errors.push("Invalid email format");

  if (!password || password.trim() === "") errors.push("Password is required");

  return { isValid: errors.length === 0, errors };
};

export const validateRegisterData = (registerData) => {
  const errors = [];
  const { name, email, password, role } = registerData;

  if (!name || name.trim() === "") errors.push("Name is required");
  if (!email || email.trim() === "") errors.push("Email is required");
  else if (!validateEmail(email)) errors.push("Invalid email format");

  if (!password || password.trim() === "") errors.push("Password is required");
  else if (!validatePassword(password)) {
    errors.push(
      "Password must contain uppercase, lowercase, number and minimum 6 characters",
    );
  }

  if (!role || !validateRole(role)) {
    errors.push("Role must be admin, organizer or attendee");
  }

  return { isValid: errors.length === 0, errors };
};
