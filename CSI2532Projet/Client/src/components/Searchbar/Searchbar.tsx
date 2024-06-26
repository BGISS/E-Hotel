import { useState } from "react";
import "./Searchbar.css";
import { FaSearch, FaCalendar } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

interface SearchBarParam {
  numberPeople: number;
  roomSize: number | null;
  hotelChain: string;
  category: number | null;
}

interface ChambreData {
  nom_hôtel: string;
  num_chambre: number;
  prix: number;
  capacité: number;
}

const api = axios.create({
  baseURL: `http://localhost:3000`,
});
function validateInput(input: any) {
  if (input === null || input === 0 || input === "") {
    return false;
  }
  return true;
}
const SearchBar = ({
  numberPeople,
  roomSize,
  hotelChain,
  category,
}: SearchBarParam) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [chambreData, setChambreData] = useState<ChambreData[] | null>(null);

  //onclick for search
  const handleClick = async (
    numberPeople: number,
    roomSize: number | null,
    hotelChain: string,
    category: number | null,
    checkInDate: string,
    checkOutDate: string,
    minPrice: number | null,
    maxPrice: number | null
  ) => {
    if (
      !validateInput(checkInDate) ||
      !validateInput(checkOutDate) ||
      !validateInput(minPrice) ||
      !validateInput(maxPrice)
    ) {
      toast.error("Please fill all the required fields!");
      return;
    }
    try {
      const response = await api.get("/searchRooms", {
        params: {
          numberPeople,
          roomSize,
          hotelChain,
          category,
          checkInDate,
          checkOutDate,
          minPrice,
          maxPrice,
        },
      });
      setChambreData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    chambreData,
    checkInDate,
    checkOutDate,
    renderRooms: (
      <>
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
            value={minPrice !== null ? minPrice : ""}
            onChange={(e) => setMinPrice(parseFloat(e.target.value))}
            placeholder="Min Price"
          />
          <div className="vertical-bar"></div>
          <input
            className="max-price"
            type="number"
            value={maxPrice !== null ? maxPrice : ""}
            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
            placeholder="Max Price"
          />
        </div>
        <button
          className="search-button"
          onClick={() =>
            handleClick(
              numberPeople,
              roomSize,
              hotelChain,
              category,
              checkInDate,
              checkOutDate,
              minPrice,
              maxPrice
            )
          }
        >
          <FaSearch className="search-icon" size={30} />
          <ToastContainer position="top-right"></ToastContainer>
        </button>
      </>
    ),
  };
};

export default SearchBar;
