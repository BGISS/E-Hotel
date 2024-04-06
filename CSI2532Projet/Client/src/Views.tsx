import { Key, useState } from "react";
import "./Views.css";
import RoomCapacityCard from "./components/RoomCapacityCard/RoomCapacityCard";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Views() {
  interface ViewData {
    nom_hôtel: string;
    num_chambre: number;
    capacité: number;
  }
  interface CityData {
    count: number;
  }

  const [citycolor, setCityColor] = useState<string>("#000000");
  const [roomColor, setRoomColor] = useState<string>("#000000");
  const [cityVisible, setCityVisible] = useState(false);
  const [city, setCity] = useState("");
  const [hotel, setHotel] = useState("");
  const [roomVisible, setRoomVisible] = useState(false);
  const [numrooms, setnumrooms] = useState<CityData | null>(null);
  const [ViewData, setViewData] = useState<ViewData[] | null>(null);

  function validateInput(input: any) {
    if (input === null || input === 0 || input === "") {
      return false;
    }
    return true;
  }

  const handleClick = (
    setColor: React.Dispatch<React.SetStateAction<string>>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    changeColor(setColor);
    setCityVisible(false);
    setRoomVisible(false);
    setVisible(true);
  };

  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });

  const handleCityClick = async () => {
    if (!validateInput(city)) {
      toast.error("Fill in the field before searching!");
      return;
    }
    try {
      const response = await api.get("/getroomsbycity", {
        params: {
          city,
        },
      });
      setnumrooms(response.data[0]);
    } catch (error) {
      console.error("Error finding number of rooms");
    }
  };

  const handleHotelClick = async () => {
    if (!validateInput(hotel)) {
      toast.error("Fill in the field before searching!");
      return;
    }
    try {
      const response = await api.get("/getcapacity", {
        params: {
          hotel,
        },
      });
      setViewData(response.data);
    } catch (error) {
      console.error("Error finding capacity of rooms in hotel");
    }
  };

  const changeColor = (
    setColor: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setCityColor("#000000");
    setRoomColor("#000000");
    setColor("#E9CB29");
  };
  return (
    <>
      <div className="views-container">
        <div className="views-options">
          <div className="views-city">
            <p
              className="city-color"
              style={{ color: citycolor }}
              onClick={() => handleClick(setCityColor, setCityVisible)}
            >
              View number of rooms per city
            </p>
          </div>
          <div className="views-room">
            <p
              className="room-color"
              style={{ color: roomColor }}
              onClick={() => handleClick(setRoomColor, setRoomVisible)}
            >
              View the capacity of each room in a specific hotel
            </p>
          </div>
        </div>
        {cityVisible && (
          <div className="city-choice">
            <p className="city-text">Choose a city</p>
            <input
              className="city-input"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <div className="searchCity" onClick={handleCityClick}>
              Search
            </div>
            {numrooms && <p>{numrooms.count}</p>}
          </div>
        )}
        {roomVisible && (
          <div className="city-choice">
            <p className="city-text">Choose a hotel</p>
            <input
              className="city-input"
              type="text"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
            ></input>
            <div className="searchHotel" onClick={handleHotelClick}>
              Search
            </div>
            {ViewData &&
              ViewData.map(
                (
                  hotel: {
                    nom_hôtel: string;
                    num_chambre: number;
                    capacité: number;
                  },
                  index: Key | null | undefined
                ) => (
                  <RoomCapacityCard
                    key={index}
                    roomNum={hotel.num_chambre}
                    peopleNum={hotel.capacité}
                  ></RoomCapacityCard>
                )
              )}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
export default Views;
