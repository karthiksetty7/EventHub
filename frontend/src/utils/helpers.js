// Importing constants
import { IMAGE_BASE_URL } from "./constants";

// ==========================================
// FORMAT DATE
// ==========================================

export const formatDate = (date) => {
  if (!date) {
    return "N/A";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ==========================================
// FORMAT TIME
// ==========================================

export const formatTime = (time) => {
  if (!time) {
    return "N/A";
  }

  const [hours, minutes] = time.split(":");

  const formattedTime = new Date();

  formattedTime.setHours(hours);
  formattedTime.setMinutes(minutes);

  return formattedTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// ==========================================
// FORMAT DATE & TIME
// ==========================================

export const formatDateTime = (date, time) => {
  return `${formatDate(date)} • ${formatTime(time)}`;
};

// ==========================================
// FORMAT CURRENCY
// ==========================================

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",

    currency: "INR",

    maximumFractionDigits: 0,
  }).format(amount || 0);
};

// ==========================================
// GENERATE IMAGE URL
// ==========================================

export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "/assets/default-event.jpg";
  }

  // If already full URL
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return `${IMAGE_BASE_URL}/${imagePath}`;
};

// ==========================================
// TRUNCATE TEXT
// ==========================================

export const truncateText = (text, maxLength = 100) => {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
};

// ==========================================
// CAPITALIZE FIRST LETTER
// ==========================================

export const capitalize = (text) => {
  if (!text) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};

// ==========================================
// GENERATE RANDOM COLORS
// ==========================================

export const generateRandomColor = () => {
  const colors = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#9333ea",
    "#f59e0b",
    "#0891b2",
    "#db2777",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
};

// ==========================================
// GET EVENT STATUS
// ==========================================

export const getEventStatus = (date) => {
  const currentDate = new Date();

  const eventDate = new Date(date);

  if (eventDate > currentDate) {
    return "Upcoming";
  }

  return "Completed";
};

// ==========================================
// CALCULATE AVAILABLE SEATS
// ==========================================

export const calculateAvailableSeats = (totalSeats, bookedSeats) => {
  return Number(totalSeats || 0) - Number(bookedSeats || 0);
};

// ==========================================
// FORMAT FILE SIZE
// ==========================================

export const formatFileSize = (size) => {
  if (!size) {
    return "0 Bytes";
  }

  const kb = 1024;
  const mb = kb * 1024;

  if (size < kb) {
    return `${size} Bytes`;
  }

  if (size < mb) {
    return `${(size / kb).toFixed(2)} KB`;
  }

  return `${(size / mb).toFixed(2)} MB`;
};

// ==========================================
// DEBOUNCE FUNCTION
// Optional Performance Feature
// ==========================================

export const debounce = (callback, delay = 500) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
