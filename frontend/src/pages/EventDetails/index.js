import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTag,
  FaUsers,
} from "react-icons/fa";

import * as eventApi from "../../api/eventApi";
import * as bookingApi from "../../api/bookingApi";

import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";

import "./index.css";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [bookedSeatsCount, setBookedSeatsCount] = useState(0);

  const getEventDetails = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      // FETCH EVENT DETAILS
      const response = await eventApi.getEventById(id);

      if (response && response.success) {
        const event = response.event;

        // FETCH BOOKED SEATS
        const bookingResponse = await bookingApi.getBookedSeats(id);

        const bookedSeats = bookingResponse?.bookings || [];

        // STORE TOTAL BOOKED SEATS
        setBookedSeatsCount(bookedSeats.length);

        // STORE EVENT DATA
        setEventData(event);

        // IMAGE PREVIEW
        setSelectedImage(
          event.image_url ||
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
        );
      } else {
        setErrorMessage(response.message || "Event not found");
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to fetch event details",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getEventDetails();
  }, [getEventDetails]);

  // LOADING
  if (loading) return <Loader />;

  // ERROR
  if (errorMessage) {
    return <div className="event-error-container">{errorMessage}</div>;
  }

  // NO EVENT
  if (!eventData) {
    return (
      <EmptyState title="Event Not Found" description="Event not available" />
    );
  }

  // EVENT DATA
  const {
    title,
    description,
    category,
    location,
    event_date,
    event_time,
    total_seats,
    base_price,
    organizer_name,
  } = eventData;

  // DYNAMIC AVAILABLE SEATS
  const calculatedAvailableSeats = total_seats - bookedSeatsCount;

  return (
    <div className="event-details-page">
      <div className="event-details-container">
        {/* IMAGE SECTION */}
        <div className="event-image-section">
          <div className="main-event-image-container">
            <img src={selectedImage} alt={title} className="main-event-image" />
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="event-content-section">
          <div className="event-category-badge">{category}</div>

          <h1 className="event-title">{title}</h1>

          <p className="event-description">{description}</p>

          {/* EVENT META */}
          <div className="event-meta-container">
            <div className="event-meta-item">
              <FaCalendarAlt className="meta-icon" />
              <span>{event_date}</span>
            </div>

            <div className="event-meta-item">
              <FaClock className="meta-icon" />
              <span>{event_time}</span>
            </div>

            <div className="event-meta-item">
              <FaMapMarkerAlt className="meta-icon" />
              <span>{location}</span>
            </div>

            <div className="event-meta-item">
              <FaUsers className="meta-icon" />
              <span>
                {calculatedAvailableSeats}/{total_seats} seats available
              </span>
            </div>

            <div className="event-meta-item">
              <FaTag className="meta-icon" />
              <span>₹{base_price}</span>
            </div>
          </div>

          {/* ORGANIZER */}
          <div className="organizer-container">
            <h3>Organizer</h3>
            <p>{organizer_name}</p>
          </div>

          {/* BOOK BUTTON */}
          <button
            className="book-now-button"
            onClick={() => navigate(`/booking/${id}`)}
            disabled={calculatedAvailableSeats === 0}
          >
            {calculatedAvailableSeats === 0 ? "Sold Out" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
