import axiosInstance from "../services/axiosInstance";

// ==========================================
// COMMON ERROR HANDLER
// ==========================================
const handleApiError = (error, defaultMessage = "Something went wrong") => {
  const customError = new Error(
    error?.response?.data?.message || error?.message || defaultMessage,
  );

  customError.status = error?.response?.status || 500;

  customError.success = false;

  throw customError;
};

// ==========================================
// UPDATE EVENT
// ==========================================
export const updateEvent = async (eventId, formData) => {
  try {
    const response = await axiosInstance.put(`/events/${eventId}`, formData);

    return response.data;
  } catch (error) {
    handleApiError(error, "Event update failed");
  }
};

// ==========================================
// GET ALL EVENTS
// ==========================================
export const getAllEvents = async (queryParams) => {
  try {
    const response = await axiosInstance.get("/events", {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch events");
  }
};

// ==========================================
// GET SINGLE EVENT
// ==========================================
export const getEventById = async (eventId) => {
  try {
    const response = await axiosInstance.get(`/events/${eventId}`);

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch event details");
  }
};

// ==========================================
// CREATE EVENT
// ==========================================
export const createEvent = async (formData) => {
  try {
    const response = await axiosInstance.post("/events", formData);

    return response.data;
  } catch (error) {
    handleApiError(error, "Event creation failed");
  }
};

// ==========================================
// DELETE EVENT
// ==========================================
export const deleteEvent = async (eventId) => {
  try {
    const response = await axiosInstance.delete(`/events/${eventId}`);

    return response.data;
  } catch (error) {
    console.error("API Delete Error:", error);

    handleApiError(error, "Event deletion failed");
  }
};

// ==========================================
// GET ORGANIZER EVENTS
// ==========================================
export const getOrganizerEvents = async () => {
  try {
    const response = await axiosInstance.get("/events/organizer/my-events");

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch organizer events");
  }
};

// ==========================================
// SEARCH EVENTS
// ==========================================
export const searchEvents = async (searchQuery) => {
  try {
    const response = await axiosInstance.get("/events/search", {
      params: {
        keyword: searchQuery,
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Event search failed");
  }
};

// ==========================================
// FILTER EVENTS BY CATEGORY
// ==========================================
export const filterEventsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get("/events/category", {
      params: { category },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to filter events");
  }
};

// ==========================================
// GET UPCOMING EVENTS
// ==========================================
export const getUpcomingEvents = async () => {
  try {
    const response = await axiosInstance.get("/events/upcoming");

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch upcoming events");
  }
};
