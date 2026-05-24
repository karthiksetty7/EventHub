import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import * as eventApi from "../../api/eventApi";
import "./index.css";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    event_date: "",
    event_time: "",
    total_seats: "",
    base_price: "",
  });

  const [eventImage, setEventImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const eventCategories = [
    "Music",
    "Technology",
    "Business",
    "Sports",
    "Education",
    "Festival",
    "Comedy",
    "Workshop",
    "Food",
    "Gaming",
  ];

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const onChangeImage = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setEventImage(uploadedFile);
      setImagePreview(URL.createObjectURL(uploadedFile));
    }
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      setLoading(true);

      const formDataToSend = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Append the image file specifically with the key 'image_url'
      if (eventImage) {
        formDataToSend.append("image_url", eventImage);
      }

      // Call the API with the ready-to-go FormData
      await eventApi.createEvent(formDataToSend);

      navigate("/organizer");
    } catch (error) {
      console.error("Error creating event:", error);
      setErrorMessage(error.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-header">
        <h1>Create New Event</h1>
        <p>Organize and publish your next successful event.</p>
      </div>

      <div className="create-event-form-container">
        <form className="create-event-form" onSubmit={onSubmitForm}>
          <div className="image-upload-section">
            <label>Event Banner</label>
            <div className="image-upload-container">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="image-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <FaImage />
                  <p>Upload Event Banner</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={onChangeImage}
                className="image-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="6"
              value={formData.description}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={onChangeInput}
              required
            >
              <option value="">Select Category</option>
              {eventCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="double-input-row">
            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={onChangeInput}
                required
              />
            </div>
            <div className="form-group">
              <label>Event Time</label>
              <input
                type="time"
                name="event_time"
                value={formData.event_time}
                onChange={onChangeInput}
                required
              />
            </div>
          </div>

          <div className="double-input-row">
            <div className="form-group">
              <label>Total Seats</label>
              <input
                type="number"
                name="total_seats"
                value={formData.total_seats}
                onChange={onChangeInput}
                required
              />
            </div>
            <div className="form-group">
              <label>Ticket Price</label>
              <input
                type="number"
                name="base_price"
                value={formData.base_price}
                onChange={onChangeInput}
                required
              />
            </div>
          </div>

          {errorMessage && (
            <div className="create-event-error-message">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="create-event-button"
            disabled={loading}
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
