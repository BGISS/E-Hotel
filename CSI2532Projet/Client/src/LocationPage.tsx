import Image from "./assets/Sunset.jpeg";
import "./LocationPage.css";
import LocationCard from "./components/LocationCard/LocationCard";
import axios from "axios";
import CreateLocation from "./components/CreateLocation/CreateLocation";
import { Key, useEffect, useState } from "react";
function LocationPage() {
  const [isOpen, setIsOpen] = useState(false);
  interface ReservationData {
    nom_client: string;
    date_reserver: string;
    end_date: string;
    num_chambre: number;
  }

  useEffect(() => {
    showLocations();
  }, []);
  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });
  const [backendData, setBackendData] = useState<ReservationData[] | null>(
    null
  );
  const handleTransformClick = () => {
    setIsOpen(!isOpen);
  };
  const handleClosePopup = () => {
    setIsOpen(false);
  };
  const showLocations = async () => {
    try {
      const response = await api.get("/locations");
      console.log(response.data);
      setBackendData(response.data);
    } catch (error) {
      console.error("Error fetching Reservation");
    }
  };
  return (
    <>
      <div className="image-div">
        <img className="location-image" src={Image} />
      </div>
      <div className="cards-location">
        {backendData &&
          backendData.map(
            (
              reservation: {
                nom_client: string;
                date_reserver: string;
                end_date: string;
                num_chambre: number;
              },
              index: Key | null | undefined
            ) => (
              <LocationCard
                key={index}
                nom={reservation.nom_client}
                start_date={reservation.date_reserver.slice(0, 10)}
                end_date={reservation.end_date.slice(0, 10)}
                room_num={reservation.num_chambre}
              />
            )
          )}
      </div>
      <button className="location-button" onClick={handleTransformClick}>
        Create Leasing
      </button>
      {isOpen && <CreateLocation onClose={handleClosePopup}></CreateLocation>}
    </>
  );
}
export default LocationPage;
