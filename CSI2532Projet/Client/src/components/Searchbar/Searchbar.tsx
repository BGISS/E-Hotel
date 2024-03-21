import { useState } from "react";
import "./Searchbar.css";
import { FaSearch, FaCalendar } from "react-icons/fa";
const SearchBar = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <div className="search-bar">
      <FaCalendar className="calendar-icon" size={30} />
      <input
        className="check-in"
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        placeholder="YYYY/MM/DD"
      />
      <div className="vertical-bar"></div>
      <input
        className="check-out"
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        placeholder="Check-out Date"
      />
      <div className="vertical-bar"></div>
      <input
        className="min-price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min Price"
      />
      <div className="vertical-bar"></div>
      <input
        className="max-price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price"
      />
      <button className="search-button">
        <FaSearch className="search-icon" size={30} />
      </button>
    </div>
  );
};

export default SearchBar;
