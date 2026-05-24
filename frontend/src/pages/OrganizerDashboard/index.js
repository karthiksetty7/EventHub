// Importing required packages
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

// Importing API
import * as eventApi from "../../api/eventApi";

// Importing Components
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import Modal from "../../components/Modal";

// Importing CSS
import "./index.css";

// ==========================================
// ORGANIZER DASHBOARD COMPONENT
// ==========================================

const OrganizerDashboard = () => {
  // ==========================================
  // STATES
  // ==========================================
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ==========================================
  // FETCH ORGANIZER EVENTS
  // Renamed to 'fetchEvents' to avoid conflict with eventApi.getOrganizerEvents
  // ==========================================
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      // API CALL
      const response = await eventApi.getOrganizerEvents();

      // SUCCESS RESPONSE
      // Note: eventApi returns response.data, so response.success is the correct path
      if (response && response.success) {
        setEventsList(response.events || []);
      } else {
        setErrorMessage(response.message || "Failed to fetch events");
      }
    } catch (error) {
      // ERROR HANDLING
      setErrorMessage(error.message || "Failed to fetch organizer events");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL API CALL
  // ==========================================
  useEffect(() => {
    fetchEvents();
  }, []);

  // ==========================================
  // HANDLE DELETE ACTIONS
  // ==========================================
  const onClickDelete = (eventId) => {
    setDeleteEventId(eventId);
    setShowDeleteModal(true);
  };

  const onConfirmDelete = async () => {
    try {
      setLoading(true); // Enable loading state
      await eventApi.deleteEvent(deleteEventId);

      // Update UI
      setEventsList((prev) => prev.filter((ev) => ev.id !== deleteEventId));

      // Close Modal
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false); // Disable loading state
    }
  };

  // ==========================================
  // DASHBOARD STATISTICS
  // ==========================================
  const totalEvents = eventsList.length;
  const totalRevenue = eventsList.reduce(
    (total, eachEvent) =>
      total +
      (eachEvent.base_price || 0) *
        ((eachEvent.total_seats || 0) - (eachEvent.available_seats || 0)),
    0,
  );

  const totalBookings = eventsList.reduce(
    (total, eachEvent) =>
      total + ((eachEvent.total_seats || 0) - (eachEvent.available_seats || 0)),
    0,
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="organizer-dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Organizer Dashboard</h1>
          <p>Manage your events, bookings, and analytics.</p>
        </div>
        <Link to="/organizer/create-event" className="create-event-button">
          <FaPlus /> Create Event
        </Link>
      </div>

      {errorMessage && (
        <div
          className="dashboard-error-message"
          style={{ color: "red", marginBottom: "10px" }}
        >
          {errorMessage}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-container blue-bg">
            <FaCalendarAlt />
          </div>
          <div>
            <h2>{totalEvents}</h2>
            <p>Total Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-container green-bg">
            <FaUsers />
          </div>
          <div>
            <h2>{totalBookings}</h2>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-container purple-bg">
            <FaMoneyBillWave />
          </div>
          <div>
            <h2>₹{totalRevenue}</h2>
            <p>Revenue</p>
          </div>
        </div>
      </div>

      <div className="organizer-events-section">
        <div className="events-header">
          <h2>Your Events</h2>
        </div>

        {eventsList.length === 0 ? (
          <EmptyState
            title="No Events Created"
            description="Start creating events to manage bookings and audiences."
          />
        ) : (
          <div className="organizer-events-grid">
            {eventsList.map((eachEvent) => (
              <div key={eachEvent.id} className="organizer-event-card">
                <div className="organizer-event-image-container">
                  <img
                    // CHANGE THIS:
                    src={
                      eachEvent.image_url ||
                      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={eachEvent.title}
                    className="organizer-event-image"
                  />
                </div>
                <div className="organizer-event-content">
                  <div className="event-category-badge">
                    {eachEvent.category}
                  </div>
                  <h3>{eachEvent.title}</h3>
                  <p className="event-date">{eachEvent.event_date}</p>
                  <div className="event-actions">
                    <Link
                      to={`/organizer/edit-event/${eachEvent.id}`}
                      className="edit-button"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => onClickDelete(eachEvent.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeleteModal && (
        // Change your Modal call in OrganizerDashboard.js to this:
        <Modal
          isOpen={showDeleteModal} // Pass the state explicitly
          title="Delete Event"
          description="Are you sure you want to delete this event?"
          confirmText="Delete"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={onConfirmDelete}
          loading={loading} // Pass loading state to disable button during delete
        />
      )}
    </div>
  );
};

export default OrganizerDashboard;
