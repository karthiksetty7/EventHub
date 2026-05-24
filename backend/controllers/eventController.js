import cloudinary from "../config/cloudinary.js";

import {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByOrganizer,
  updateEvent,
  deleteEvent,
  updateDynamicPricing,
  getUpcomingEvents,
} from "../models/eventModel.js";

// ==========================================
// CREATE EVENT CONTROLLER
// ==========================================
export const createNewEvent = async (req, res) => {
  try {
    const organizer_id = req.user.id;

    const {
      title,
      description,
      category,
      location,
      event_date,
      event_time,
      total_seats,
      base_price,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================
    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !event_date ||
      !event_time ||
      !total_seats ||
      !base_price
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (Number(total_seats) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total seats must be greater than zero",
      });
    }

    if (Number(base_price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Base price cannot be negative",
      });
    }

    let image_url = null;

    // ==========================================
    // CLOUDINARY IMAGE UPLOAD
    // ==========================================
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "event-images",
        });

        image_url = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }
    }

    // ==========================================
    // EVENT DATA
    // ==========================================
    const eventData = {
      ...req.body,
      organizer_id,
      image_url,
      current_price: base_price,
      available_seats: total_seats,
    };

    // ==========================================
    // CREATE EVENT
    // ==========================================
    const newEvent = await createEvent(eventData);

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================
    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error("Create Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

// ==========================================
// UPDATE EVENT CONTROLLER
// ==========================================
export const updateSingleEvent = async (request, response) => {
  try {
    const { id } = request.params;

    const organizerId = request.user.id;

    // ==========================================
    // CHECK EVENT
    // ==========================================
    const existingEvent = await getEventById(id);

    if (!existingEvent) {
      return response.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // ==========================================
    // AUTHORIZATION
    // ==========================================
    if (existingEvent.organizer_id !== organizerId) {
      return response.status(403).json({
        success: false,
        message: "You can only update your own events",
      });
    }

    let image_url = existingEvent.image_url;

    // ==========================================
    // IMAGE UPLOAD
    // ==========================================
    if (request.file) {
      try {
        const result = await cloudinary.uploader.upload(request.file.path, {
          folder: "event-images",
        });

        image_url = result.secure_url;
      } catch (uploadError) {
        return response.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }
    }

    // ==========================================
    // UPDATED DATA
    // ==========================================
    const updatedData = {
      title: request.body.title || existingEvent.title,
      description: request.body.description || existingEvent.description,
      category: request.body.category || existingEvent.category,
      location: request.body.location || existingEvent.location,
      event_date: request.body.event_date || existingEvent.event_date,
      event_time: request.body.event_time || existingEvent.event_time,
      total_seats:
        Number(request.body.total_seats) || existingEvent.total_seats,
      base_price: Number(request.body.base_price) || existingEvent.base_price,
      current_price: existingEvent.current_price,
      image_url,
      status: request.body.status || existingEvent.status,
    };

    // ==========================================
    // UPDATE EVENT
    // ==========================================
    await updateEvent(id, updatedData);

    return response.status(200).json({
      success: true,
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error("Update Event Error:", error);

    return response.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

// ==========================================
// FETCH UPCOMING EVENTS
// ==========================================
export const fetchUpcomingEvents = async (request, response) => {
  try {
    const events = await getUpcomingEvents();

    return response.status(200).json({
      success: true,
      total: events.length,
      events,
    });
  } catch (error) {
    console.error("Fetch Upcoming Events Error:", error);

    return response.status(500).json({
      success: false,
      message: "Failed to fetch upcoming events",
    });
  }
};

// ==========================================
// FETCH ALL EVENTS
// ==========================================
export const fetchAllEvents = async (request, response) => {
  try {
    const { search, category, event_date } = request.query;

    const events = await getAllEvents({
      search,
      category,
      event_date,
    });

    return response.status(200).json({
      success: true,
      total: events.length,
      events,
    });
  } catch (error) {
    console.error("Fetch Events Error:", error);

    return response.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

// ==========================================
// FETCH SINGLE EVENT
// ==========================================
export const fetchSingleEvent = async (request, response) => {
  try {
    const { id } = request.params;

    const event = await getEventById(id);

    if (!event) {
      return response.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return response.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("Fetch Single Event Error:", error);

    return response.status(500).json({
      success: false,
      message: "Failed to fetch event details",
    });
  }
};

// ==========================================
// FETCH ORGANIZER EVENTS
// ==========================================
export const fetchOrganizerEvents = async (request, response) => {
  try {
    const organizerId = request.user.id;

    const events = await getEventsByOrganizer(organizerId);

    return response.status(200).json({
      success: true,
      total: events.length,
      events,
    });
  } catch (error) {
    console.error("Organizer Events Error:", error);

    return response.status(500).json({
      success: false,
      message: "Failed to fetch organizer events",
    });
  }
};

// ==========================================
// DELETE EVENT
// ==========================================
export const deleteSingleEvent = async (request, response) => {
  try {
    const { id } = request.params;

    const organizerId = request.user.id;

    const existingEvent = await getEventById(id);

    if (!existingEvent) {
      return response.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (existingEvent.organizer_id !== organizerId) {
      return response.status(403).json({
        success: false,
        message: "You can only delete your own events",
      });
    }

    await deleteEvent(id);

    return response.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);

    return response.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};

// ==========================================
// UPDATE DYNAMIC EVENT PRICING
// ==========================================
export const updateEventPricing = async (
  eventId,
  availableSeats,
  totalSeats,
  basePrice,
) => {
  try {
    const bookedPercentage = ((totalSeats - availableSeats) / totalSeats) * 100;

    let updatedPrice = Number(basePrice);

    if (bookedPercentage >= 70) {
      updatedPrice = Number(basePrice) + Number(basePrice) * 0.2;
    } else if (bookedPercentage >= 40) {
      updatedPrice = Number(basePrice) + Number(basePrice) * 0.1;
    }

    await updateDynamicPricing(eventId, updatedPrice);
  } catch (error) {
    console.error("Dynamic Pricing Error:", error);
  }
};
