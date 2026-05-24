import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa"; // Added FaClock
import { MdPeople } from "react-icons/md";
import { formatDate, formatCurrency } from "../../utils/helpers";
import "./index.css";

const EventCard = ({ eventDetails }) => {
  if (!eventDetails) return null;

  const {
    id,
    title,
    description,
    category,
    location,
    event_date,
    event_time,
    image_url,
    calculated_available_seats, // Updated name
    total_seats,
    base_price,
  } = eventDetails;

  // Use the new calculated field for your logic
  const isSoldOut = calculated_available_seats <= 0;

  return (
    <div className="event-card">
      <div className="event-image-container">
        <img src={image_url} alt={title} className="event-image" />
        <span className="event-category">{category}</span>
        {isSoldOut && <span className="sold-out-badge">Sold Out</span>}
      </div>

      <div className="event-content">
        <h2 className="event-title">{title}</h2>
        <p className="event-description">{description}</p>

        <div className="event-details">
          <div className="event-detail-item">
            <FaCalendarAlt />
            <span>{formatDate(event_date)}</span>
          </div>
          <div className="event-detail-item">
            <FaClock /> {/* Changed to FaClock */}
            <span>{event_time}</span>
          </div>
          <div className="event-detail-item">
            <FaMapMarkerAlt />
            <span>{location}</span>
          </div>
          <div className="event-detail-item">
            <MdPeople />
            {/* Display the calculated seats */}
            <span>
              {calculated_available_seats}/{total_seats} Seats
            </span>
          </div>
        </div>

        <div className="event-footer">
          <div className="event-price">{formatCurrency(base_price)}</div>
          <Link
            to={`/events/${id}`}
            className={`view-button ${isSoldOut ? "disabled-button" : ""}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
