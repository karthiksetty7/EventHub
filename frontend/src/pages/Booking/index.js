import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import {
  FaTicketAlt,
  FaChair,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import * as eventApi from "../../api/eventApi";
import * as bookingApi from "../../api/bookingApi";

import Loader from "../../components/Loader";
import SeatSelector from "../../components/SeatSelector";
import Modal from "../../components/Modal";

import "./index.css";

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [eventData, setEventData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const getEventDetails = useCallback(async () => {
    try {
      setLoading(true);

      // 1. Fetch Event Details
      const response = await eventApi.getEventById(id);
      console.log("Event Details Response:", response);
      setEventData(response.event || response);

      // 2. Fetch Booked Seats
      const bookingsResponse = await bookingApi.getBookedSeats(id);
      console.log("Bookings Response:", bookingsResponse);

      const seatNumbers = (bookingsResponse.bookings || []).map((b) =>
        Number(b.seat_number),
      );
      setBookedSeats(seatNumbers);
    } catch (error) {
      // THIS LOG WILL SHOW YOU THE EXACT ERROR
      console.error("FULL ERROR DETAILS:", error);
      setErrorMessage(error.message || "Failed to load details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getEventDetails();
  }, [getEventDetails]);

  const onSeatSelect = (seatNumbers) => {
    setSelectedSeats(seatNumbers);
  };

  const activePrice = eventData
    ? eventData.current_price || eventData.base_price || 0
    : 0;
  const totalPrice = selectedSeats.length * activePrice;

  const onConfirmBooking = async () => {
    const jwtToken = Cookies.get("jwt_token");
    if (!jwtToken) {
      navigate("/login");
      return;
    }

    if (selectedSeats.length === 0) {
      setErrorMessage("Please select at least one seat");
      return;
    }

    try {
      setBookingLoading(true);
      setErrorMessage("");

      await Promise.all(
        selectedSeats.map((seat) =>
          bookingApi.createBooking({
            event_id: id,
            seat_number: seat,
          }),
        ),
      );
      setBookingSuccess(true);
      setSelectedSeats([]);

      // Navigate after 1 second
      setTimeout(() => {
        navigate("/my-bookings");
      }, 1000);
    } catch (error) {
      setErrorMessage(error?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!eventData) return <div className="error">Event not found.</div>;

  const { title, image_url, event_date, location } = eventData;

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-left-section">
          <div className="booking-image-container">
            <img
              src={
                image_url ||
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
              }
              alt={title}
              className="booking-event-image"
            />
          </div>

          <div className="booking-event-info">
            <h1>{title}</h1>
            <div className="booking-meta-item">
              <FaCalendarAlt className="booking-icon" />
              <p>{event_date}</p>
            </div>
            <div className="booking-meta-item">
              <FaMapMarkerAlt className="booking-icon" />
              <p>{location}</p>
            </div>
          </div>

          <div className="seat-selection-container">
            <h2>Select Your Seats</h2>
            <SeatSelector
              totalSeats={eventData?.total_seats}
              selectedSeats={selectedSeats}
              onSeatSelect={onSeatSelect}
              bookedSeats={bookedSeats}
            />
          </div>
        </div>

        <div className="booking-summary-section">
          <h2>Booking Summary</h2>
          <div className="summary-card">
            <div className="summary-row">
              <div className="summary-label">
                <FaChair className="summary-icon" /> <span>Selected Seats</span>
              </div>
              <p>{selectedSeats.length ? selectedSeats.join(", ") : "None"}</p>
            </div>
            <div className="summary-row">
              <div className="summary-label">
                <FaTicketAlt className="summary-icon" />{" "}
                <span>Ticket Count</span>
              </div>
              <p>{selectedSeats.length}</p>
            </div>
            <div className="summary-row">
              <div className="summary-label">
                <FaMoneyBillWave className="summary-icon" />{" "}
                <span>Price Per Ticket</span>
              </div>
              <p>₹{activePrice}</p>
            </div>
            <div className="summary-divider" />
            <div className="summary-total">
              <h3>Total Amount</h3>
              <h2>₹{totalPrice}</h2>
            </div>
          </div>

          {errorMessage && (
            <div className="booking-error-message">{errorMessage}</div>
          )}

          <button
            className="confirm-booking-button"
            disabled={bookingLoading}
            onClick={onConfirmBooking}
          >
            {bookingLoading ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </div>

      {bookingSuccess && (
        <Modal
          title="Booking Successful"
          description="Your tickets have been booked successfully."
          buttonText="Redirecting..."
          onClose={() => setBookingSuccess(false)}
        />
      )}
    </div>
  );
};

export default Booking;
