// Importing required packages
import { useState } from "react";

import { FaSearch, FaTimes } from "react-icons/fa";

// Importing CSS
import "./index.css";

// ==========================================
// CATEGORY OPTIONS
// ==========================================

const categoryOptions = [
  "All",

  "Music",

  "Technology",

  "Business",

  "Sports",

  "Education",

  "Entertainment",

  "Workshop",

  "Conference",
];

// ==========================================
// SEARCH BAR COMPONENT
// ==========================================

const SearchBar = ({
  onSearch,

  onFilter,

  loading = false,
}) => {
  // ==========================================
  // STATES
  // ==========================================

  const [searchInput, setSearchInput] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  // ==========================================
  // HANDLE SEARCH
  // ==========================================

  const onSubmitSearch = (event) => {
    event.preventDefault();

    onSearch(searchInput);
  };

  // ==========================================
  // HANDLE CATEGORY CHANGE
  // ==========================================

  const onChangeCategory = (event) => {
    const category = event.target.value;

    setSelectedCategory(category);

    onFilter(category);
  };

  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const clearSearch = () => {
    setSearchInput("");

    onSearch("");
  };

  // ==========================================
  // COMPONENT UI
  // ==========================================

  return (
    <div className="searchbar-container">
      {/* ======================================
          SEARCH FORM
      ====================================== */}

      <form className="search-form" onSubmit={onSubmitSearch}>
        {/* Search Input */}
        <div className="search-input-container">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />

          {/* Clear Button */}
          {searchInput && (
            <button
              type="button"
              className="clear-button"
              onClick={clearSearch}
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Search Button */}
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* ======================================
          CATEGORY FILTER
      ====================================== */}

      <div className="filter-container">
        <select
          className="category-select"
          value={selectedCategory}
          onChange={onChangeCategory}
        >
          {categoryOptions.map((eachCategory) => (
            <option key={eachCategory} value={eachCategory}>
              {eachCategory}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// ==========================================
// EXPORTING COMPONENT
// ==========================================

export default SearchBar;
