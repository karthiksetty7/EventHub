// ==========================================
// EMAIL VALIDATION
// ==========================================

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

// ==========================================
// PASSWORD VALIDATION
// ==========================================

export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,

      message: "Password is required",
    };
  }

  if (password.length < 6) {
    return {
      isValid: false,

      message: "Password must contain at least 6 characters",
    };
  }

  return {
    isValid: true,

    message: "",
  };
};

// ==========================================
// REGISTER FORM VALIDATION
// ==========================================

export const validateRegisterForm = (formData) => {
  const errors = {};

  const { name, email, password, role } = formData;

  // Name validation
  if (!name?.trim()) {
    errors.name = "Name is required";
  } else if (name.trim().length < 3) {
    errors.name = "Name must contain at least 3 characters";
  }

  // Email validation
  if (!email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Invalid email address";
  }

  // Password validation
  const passwordValidation = validatePassword(password);

  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }

  // Role validation
  if (!role) {
    errors.role = "Please select a role";
  }

  return {
    isValid: Object.keys(errors).length === 0,

    errors,
  };
};

// ==========================================
// LOGIN FORM VALIDATION
// ==========================================

export const validateLoginForm = (formData) => {
  const errors = {};

  const { email, password } = formData;

  // Email validation
  if (!email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Invalid email address";
  }

  // Password validation
  if (!password?.trim()) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,

    errors,
  };
};

// ==========================================
// EVENT FORM VALIDATION
// ==========================================

export const validateEventForm = (formData) => {
  const errors = {};

  const {
    title,
    description,
    category,
    location,
    event_date,
    event_time,
    total_seats,
    base_price,
  } = formData;

  // Title validation
  if (!title?.trim()) {
    errors.title = "Event title is required";
  } else if (title.trim().length < 5) {
    errors.title = "Title must contain at least 5 characters";
  }

  // Description validation
  if (!description?.trim()) {
    errors.description = "Description is required";
  } else if (description.trim().length < 20) {
    errors.description = "Description must contain at least 20 characters";
  }

  // Category validation
  if (!category) {
    errors.category = "Category is required";
  }

  // Location validation
  if (!location?.trim()) {
    errors.location = "Location is required";
  }

  // Date validation
  if (!event_date) {
    errors.event_date = "Event date is required";
  } else {
    const selectedDate = new Date(event_date);

    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      errors.event_date = "Event date cannot be in the past";
    }
  }

  // Time validation
  if (!event_time) {
    errors.event_time = "Event time is required";
  }

  // Seat validation
  if (!total_seats) {
    errors.total_seats = "Total seats are required";
  } else if (Number(total_seats) <= 0) {
    errors.total_seats = "Seats must be greater than 0";
  }

  // Price validation
  if (!base_price) {
    errors.base_price = "Ticket price is required";
  } else if (Number(base_price) < 0) {
    errors.base_price = "Price cannot be negative";
  }

  return {
    isValid: Object.keys(errors).length === 0,

    errors,
  };
};

// ==========================================
// BOOKING VALIDATION
// ==========================================

export const validateBookingForm = (formData) => {
  const errors = {};

  const { seat_number, attendee_name, attendee_email } = formData;

  // Seat validation
  if (!seat_number) {
    errors.seat_number = "Please select a seat";
  }

  // Name validation
  if (!attendee_name?.trim()) {
    errors.attendee_name = "Attendee name is required";
  }

  // Email validation
  if (!attendee_email?.trim()) {
    errors.attendee_email = "Attendee email is required";
  } else if (!validateEmail(attendee_email)) {
    errors.attendee_email = "Invalid attendee email";
  }

  return {
    isValid: Object.keys(errors).length === 0,

    errors,
  };
};

// ==========================================
// IMAGE FILE VALIDATION
// ==========================================

export const validateImageFile = (file) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  const maxSize = 5 * 1024 * 1024;

  if (!file) {
    return {
      isValid: false,

      message: "Please select an image",
    };
  }

  // File type validation
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,

      message: "Only JPG, PNG and WEBP images are allowed",
    };
  }

  // File size validation
  if (file.size > maxSize) {
    return {
      isValid: false,

      message: "Image size must be less than 5MB",
    };
  }

  return {
    isValid: true,

    message: "",
  };
};

// ==========================================
// SEARCH VALIDATION
// ==========================================

export const validateSearch = (searchText) => {
  if (!searchText) {
    return true;
  }

  return searchText.trim().length >= 2;
};
