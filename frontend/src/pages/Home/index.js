// Importing required packages
import { useEffect, useState } from "react";

// Importing API
import * as eventApi from "../../api/eventApi";

// Importing components
import EventCard from "../../components/EventCard";

import Loader from "../../components/Loader";

import SearchBar from "../../components/SearchBar";

import EmptyState from "../../components/EmptyState";

// Importing CSS
import "./index.css";

// ==========================================
// CATEGORY OPTIONS
// ==========================================

const categoryOptions = [
  "All",
  "Music",
  "Technology",
  "Sports",
  "Education",
  "Business",
  "Comedy",
  "Workshop",
];

// ==========================================
// HOME PAGE COMPONENT
// ==========================================

const Home = () => {
  // ==========================================
  // STATES
  // ==========================================

  const [eventsList, setEventsList] = useState([]);

  const [filteredEvents, setFilteredEvents] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // ==========================================
  // PAGINATION CONFIG
  // ==========================================

  const eventsPerPage = 8;

  // ==========================================
  // FETCH EVENTS
  // ==========================================

  const getAllEvents = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await eventApi.getAllEvents();

      // Fix: Access 'response' directly, not 'response.data'
      if (response && response.success) {
        const events = response.events || [];
        setEventsList(events);
        setFilteredEvents(events);
      } else {
        setErrorMessage(response.message || "Failed to fetch events");
      }
    } catch (error) {
      // Improved error logging to see the real issue in Console (F12)
      console.error("Home fetch error:", error);
      setErrorMessage(error.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL API CALL
  // ==========================================

  useEffect(() => {
    getAllEvents();
  }, []);

  // ==========================================
  // FILTER EVENTS
  // ==========================================

  useEffect(() => {
    let updatedEvents = [...eventsList];

    // ======================================
    // SEARCH FILTER
    // ======================================

    if (searchInput) {
      updatedEvents = updatedEvents.filter((eachEvent) =>
        eachEvent.title?.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }

    // ======================================
    // CATEGORY FILTER
    // ======================================

    if (selectedCategory !== "All") {
      updatedEvents = updatedEvents.filter(
        (eachEvent) => eachEvent.category === selectedCategory,
      );
    }

    setFilteredEvents(updatedEvents);

    setCurrentPage(1);
  }, [searchInput, selectedCategory, eventsList]);

  // ==========================================
  // PAGINATION LOGIC
  // ==========================================

  const lastIndex = currentPage * eventsPerPage;

  const firstIndex = lastIndex - eventsPerPage;

  const currentEvents = filteredEvents.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // ==========================================
  // HANDLE PAGE CHANGE
  // ==========================================

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((previous) => previous + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((previous) => previous - 1);
    }
  };

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
    <div className="home-page">
      {/* ======================================
          HERO SECTION
      ====================================== */}

      <div className="home-hero-section">
        <div className="hero-content">
          <h1>Discover Amazing Events Near You</h1>

          <p>
            Book tickets for concerts, workshops, sports, conferences, and more
            with ease.
          </p>
        </div>
      </div>

      {/* ======================================
          FILTER SECTION
      ====================================== */}

      <div className="filter-section">
        {/* Search Bar */}
        <SearchBar
          onSearch={setSearchInput}
          onFilter={setSelectedCategory}
          loading={loading}
        />

        {/* Category Filters */}
        <div className="category-container">
          {categoryOptions.map((eachCategory) => (
            <button
              type="button"
              key={eachCategory}
              className={`category-button ${
                selectedCategory === eachCategory ? "active-category" : ""
              }`}
              onClick={() => setSelectedCategory(eachCategory)}
            >
              {eachCategory}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {errorMessage && <div className="home-error-message">{errorMessage}</div>}

      {/* ======================================
          EVENTS SECTION
      ====================================== */}

      {filteredEvents.length === 0 ? (
        <EmptyState
          title="No Events Found"
          description="Try changing your search or category filters."
        />
      ) : (
        <>
          {/* Events Grid */}
          <div className="events-grid">
            {currentEvents.map((eachEvent) => (
              <EventCard key={eachEvent.id} eventDetails={eachEvent} />
            ))}
          </div>

          {/* ==================================
              PAGINATION
          ================================== */}

          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                type="button"
                className="pagination-button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <p className="page-indicator">
                Page {currentPage} of {totalPages}
              </p>

              <button
                type="button"
                className="pagination-button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ==========================================
// EXPORTING COMPONENT
// ==========================================

export default Home;
