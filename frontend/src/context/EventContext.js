import { createContext, useEffect, useState, useCallback } from "react";
import {
  getAllEvents,
  getUpcomingEvents,
  searchEvents,
  filterEventsByCategory,
} from "../api/eventApi";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async (queryParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllEvents(queryParams);
      setEvents(response.events || []);
      return response;
    } catch (error) {
      setError(error.message || "Failed to fetch events");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // FIXED: Added parameter check to prevent "Invalid ID" error
  const fetchUpcomingEvents = useCallback(async (userId) => {
    // Only attempt to fetch if we have a valid ID
    if (!userId) return;

    try {
      const response = await getUpcomingEvents(userId); // Ensure we pass the ID
      setUpcomingEvents(response.events || []);
      return response;
    } catch (error) {
      console.error("Upcoming Events Error:", error);
      setError("Failed to fetch upcoming events");
    }
  }, []);

  const searchEventList = useCallback(async (keyword) => {
    try {
      setLoading(true);
      setSearchText(keyword);
      const response = await searchEvents(keyword);
      setEvents(response.events || []);
      return response;
    } catch (error) {
      setError(error.message || "Search failed");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const filterEvents = useCallback(
    async (category) => {
      try {
        setLoading(true);
        setSelectedCategory(category);
        if (category === "All") {
          return fetchEvents();
        }
        const response = await filterEventsByCategory(category);
        setEvents(response.events || []);
        return response;
      } catch (error) {
        setError(error.message || "Filter failed");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchEvents],
  );

  const addEvent = useCallback((newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  }, []);

  const updateEvent = useCallback((updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  }, []);

  const removeEvent = useCallback((eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  const resetFilters = useCallback(() => {
    setSearchText("");
    setSelectedCategory("All");
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();

    // NOTE: If your app requires a logged-in user ID to fetch upcoming events,
    // you must retrieve it from your auth state/localStorage here.
    // Example: const userId = localStorage.getItem('userId');
    // fetchUpcomingEvents(userId);
  }, [fetchEvents, fetchUpcomingEvents]);

  const contextValue = {
    events,
    upcomingEvents,
    loading,
    error,
    searchText,
    selectedCategory,
    fetchEvents,
    fetchUpcomingEvents,
    searchEventList,
    filterEvents,
    addEvent,
    updateEvent,
    removeEvent,
    resetFilters,
    setSearchText,
    setSelectedCategory,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
