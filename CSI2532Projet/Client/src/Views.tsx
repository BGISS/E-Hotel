import { Key,useState } from "react";
import "./Views.css";
import RoomCapacityCard from "./components/RoomCapacityCard/RoomCapacityCard";
import axios from "axios";

interface HotelData{
  nom_hôtel: string;
  num_chambre: number;
  capacité: number;
}

function Views() {
  const [citycolor, setCityColor] = useState<string>("#000000");
  const [roomColor, setRoomColor] = useState<string>("#000000");
  const [cityVisible, setCityVisible] = useState(false);
  const [city, setCity] = useState("");
  const [hotel, setHotel] = useState("");
  const [roomVisible, setRoomVisible] = useState(false);
  const [numrooms, setnumrooms] = useState<number|null>(null);
  const [HotelData, setHotelData] = useState<HotelData[] | null>(null);

  

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

  const handleCityClick=async ()=>{
    try{
      const response = await api.get("/getroomsbycity",{
        params:{
          city,
        },
      });
      setnumrooms(response.data);
    } catch(error){
      console.error("Error finding number of rooms")
    }
  };

  const handleHotelClick=async()=>{
    try{
      const response = await api.get("/getcapacity",{
        params:{
          hotel,
        },
      });
      setHotelData(response.data);
    } catch(error){
      console.error("Error finding capacity of rooms in hotel")
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
            <div className="searchCity" onClick={handleCityClick}>Search</div>
            <p>{numrooms}</p>
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
            <div className="searchHotel" onClick={handleHotelClick}>Search</div>
            {HotelData && HotelData.map(
              (
                hotel: {
                  nom_hôtel: string;
                  num_chambre: number;
                  capacité: number;
                },
                index: number | null | undefined
              ) => (
                <RoomCapacityCard roomNum={hotel.num_chambre} peopleNum={hotel.capacité}></RoomCapacityCard>
              )
            )

            }
          </div>
          
        )}
      </div>
    </>
  );
}
export default Views;
