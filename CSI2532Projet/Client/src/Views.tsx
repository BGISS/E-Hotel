import { useState } from "react";
import "./Views.css";
function Views() {
  const [citycolor, setCityColor] = useState<string>("#000000");
  const [roomColor, setRoomColor] = useState<string>("#000000");
  const [cityVisible, setCityVisible] = useState(false);
  const [city, setCity] = useState("");
  const [hotel, setHotel] = useState("");
  const [roomVisible, setRoomVisible] = useState(false);
  const handleClick = (
    setColor: React.Dispatch<React.SetStateAction<string>>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    changeColor(setColor);
    setCityVisible(false);
    setRoomVisible(false);
    setVisible(true);
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
          </div>
        )}
      </div>
    </>
  );
}
export default Views;
