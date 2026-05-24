import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as eventApi from "../../api/eventApi";
import Loader from "../../components/Loader";

import "./index.css";

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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

  // ✅ FIXED: stable function (fixes useEffect warning)
  const getEventDetails = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await eventApi.getEventById(id);

      if (response.success) {
        const eventData = response.event;

        setFormData({
          title: eventData.title || "",
          description: eventData.description || "",
          category: eventData.category || "",
          location: eventData.location || "",
          event_date: eventData.event_date || "",
          event_time: eventData.event_time || "",
          total_seats: eventData.total_seats || "",
          base_price: eventData.base_price || "",
        });

        // Update how you set the image preview:
        setImagePreview(eventData.image_url || ""); // Updated from .image to .image_url
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

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const {
      title,
      description,
      category,
      location,
      event_date,
      event_time,
      total_seats,
      base_price,
    } = formData;

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
      setErrorMessage("All fields are required");
      return false;
    }

    if (title.trim().length < 5) {
      setErrorMessage("Title should be at least 5 characters");
      return false;
    }

    if (description.trim().length < 20) {
      setErrorMessage("Description should be at least 20 characters");
      return false;
    }

    if (Number(total_seats) <= 0) {
      setErrorMessage("Seats must be greater than 0");
      return false;
    }

    if (Number(base_price) <= 0) {
      setErrorMessage("Price must be greater than 0");
      return false;
    }

    return true;
  };

  // Inside EditEvent.jsx - onSubmitForm
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    try {
      setUpdateLoading(true);

      const form = new FormData();
      // Append all text fields
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      // Append the file if it exists
      if (eventImage) {
        form.append("image_url", eventImage);
      }

      // Call the updated API function
      const response = await eventApi.updateEvent(id, form);

      if (response.success) {
        navigate("/organizer");
      }
    } catch (error) {
      setErrorMessage(error?.message || "Failed to update event");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="edit-event-page">
      {/* ADDED: Header class */}
      <div className="edit-event-header">
        <h1>Edit Event</h1>
        <p>Update your event details below.</p>
      </div>

      {/* ADDED: Form container class */}
      <div className="edit-event-form-container">
        <form className="edit-event-form" onSubmit={onSubmitForm}>
          {/* WRAP INPUTS in .form-group */}
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={onChangeInput}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChangeInput}
            />
          </div>

          {/* ... Add other fields using the same <div className="form-group"> structure ... */}

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={onChangeInput}
            >
              <option value="">Select</option>
              {eventCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Use .double-input-row for side-by-side fields */}
          <div className="double-input-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="event_date" onChange={onChangeInput} />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" name="event_time" onChange={onChangeInput} />
            </div>
          </div>

          {/* Image Section */}
          <div className="image-upload-section">
            <label>Event Image</label>
            <div className="image-upload-container">
              <input
                type="file"
                className="image-input"
                onChange={onChangeImage}
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="image-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <span>Click to upload image</span>
                </div>
              )}
            </div>
          </div>

          {errorMessage && (
            <p className="edit-event-error-message">{errorMessage}</p>
          )}

          <button className="update-event-button" disabled={updateLoading}>
            {updateLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
