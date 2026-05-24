// Importing required packages
import { useEffect, useState } from "react";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

// Importing API
import * as bookingApi from "../../api/bookingApi";

// Importing Components
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";

// Importing CSS
import "./index.css";

// ==========================================
// BOOKING HISTORY COMPONENT
// ==========================================

const BookingHistory = () => {
  // ==========================================
  // STATES
  // ==========================================

  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  const getBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingApi.getUserBookings();

      // Accessing the flat array of bookings returned by the API
      setBookingsList(response.bookings || response || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setErrorMessage("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL API CALL
  // ==========================================

  useEffect(() => {
    getBookings();
  }, []);

  // ==========================================
  // LOADING VIEW
  // ==========================================

  if (loading) {
    return <Loader />;
  }

  // ==========================================
  // COMPONENT UI
  // ==========================================

  return (
    <div className="booking-history-page">
      <div className="booking-history-header">
        <h1>My Booking History</h1>
        <p>View all your booked event tickets and booking details.</p>
      </div>

      {errorMessage && (
        <div className="booking-history-error">{errorMessage}</div>
      )}

      {bookingsList.length === 0 ? (
        <EmptyState
          title="No Bookings Found"
          description="You haven't booked any events yet."
        />
      ) : (
        <div className="booking-history-grid">
          {bookingsList.map((eachBooking) => {
            return (
              <div key={eachBooking.id} className="booking-history-card">
                {/* Event Image */}
                <div className="booking-card-image-container">
                  <img
                    src={
                      eachBooking.image_url ||
                      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={eachBooking.title}
                    className="booking-card-image"
                  />
                </div>

                <div className="booking-card-content">
                  {/* Event Title */}
                  <h2>{eachBooking.title || "Event"}</h2>

                  {/* Date */}
                  <div className="booking-detail-item">
                    <FaCalendarAlt className="booking-detail-icon" />
                    <p>{eachBooking.event_date || "N/A"}</p>
                  </div>

                  {/* Location */}
                  <div className="booking-detail-item">
                    <FaMapMarkerAlt className="booking-detail-icon" />
                    <p>{eachBooking.location || "N/A"}</p>
                  </div>

                  {/* Seat Number */}
                  <div className="booking-detail-item">
                    <FaTicketAlt className="booking-detail-icon" />
                    <p>Seat: {eachBooking.seat_number}</p>
                  </div>

                  {/* Price */}
                  <div className="booking-detail-item">
                    <FaMoneyBillWave className="booking-detail-icon" />
                    <p>Price: ₹{eachBooking.ticket_price || 0}</p>
                  </div>

                  {/* Booking Status */}
                  <div className="booking-status-container">
                    <span className="booking-status success-status">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
