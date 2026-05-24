// Importing required packages
import { useEffect, useState } from "react";
import { FaChair, FaCheckCircle } from "react-icons/fa";

// Importing CSS
import "./index.css";

// ==========================================
// SEAT SELECTOR COMPONENT
// ==========================================

const SeatSelector = ({
  totalSeats,
  bookedSeats = [], // This should be an array of numbers (e.g., [1, 5, 10])
  onSeatSelect,
}) => {
  // ==========================================
  // STATES
  // ==========================================

  const [selectedSeats, setSelectedSeats] = useState([]);

  // ==========================================
  // GENERATING SEATS
  // ==========================================

  const generateSeats = () => {
    return Array.from({ length: totalSeats }, (_, index) => ({
      id: index + 1,
    }));
  };

  const seats = generateSeats();

  // ==========================================
  // HANDLE SEAT CLICK
  // ==========================================

  const onClickSeat = (seatId) => {
    // Prevent selecting if the seat is already in the bookedSeats array
    if (bookedSeats.includes(seatId)) {
      return;
    }

    let updatedSeats = [];

    // Remove seat if already selected
    if (selectedSeats.includes(seatId)) {
      updatedSeats = selectedSeats.filter((eachSeat) => eachSeat !== seatId);
    } else {
      // Add new seat
      updatedSeats = [...selectedSeats, seatId];
    }

    setSelectedSeats(updatedSeats);
  };

  // ==========================================
  // SEND SELECTED SEATS TO PARENT
  // ==========================================

  useEffect(() => {
    onSeatSelect(selectedSeats);
  }, [selectedSeats, onSeatSelect]);

  // ==========================================
  // GET SEAT CLASS
  // ==========================================

  const getSeatClassName = (seatId) => {
    const isBooked = bookedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    if (isBooked) {
      return "seat booked-seat";
    }

    if (isSelected) {
      return "seat selected-seat";
    }

    return "seat available-seat";
  };

  // ==========================================
  // COMPONENT UI
  // ==========================================

  return (
    <div className="seat-selector-container">
      <div className="seat-header">
        <h2>Select Your Seats</h2>
        <p>Choose available seats for booking</p>
      </div>

      {/* LEGENDS */}
      <div className="seat-legends">
        <div className="legend-item">
          <div className="legend available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend booked"></div>
          <span>Booked</span>
        </div>
      </div>

      {/* SCREEN */}
      <div className="screen-container">
        <div className="screen">Stage / Screen</div>
      </div>

      {/* SEAT GRID */}
      <div className="seat-grid">
        {seats.map((eachSeat) => {
          const isSelected = selectedSeats.includes(eachSeat.id);
          const isBooked = bookedSeats.includes(eachSeat.id);

          return (
            <button
              type="button"
              key={eachSeat.id}
              className={getSeatClassName(eachSeat.id)}
              onClick={() => onClickSeat(eachSeat.id)}
              disabled={isBooked} // Disable button if booked
            >
              {isSelected ? <FaCheckCircle /> : <FaChair />}
              <span>{eachSeat.id}</span>
            </button>
          );
        })}
      </div>

      {/* SELECTED SEATS DISPLAY */}
      <div className="selected-seats-container">
        <h3>Selected Seats</h3>
        {selectedSeats.length === 0 ? (
          <p className="empty-seat-text">No seats selected</p>
        ) : (
          <div className="selected-seats">
            {selectedSeats.map((eachSeat) => (
              <span key={eachSeat} className="selected-seat-badge">
                Seat {eachSeat}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelector;
