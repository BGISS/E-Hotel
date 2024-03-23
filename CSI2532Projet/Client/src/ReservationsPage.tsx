import ReservationCard from "./components/ReservationCard/ReservationCard";
import image from "./assets/Reservation.jpeg";
import "./ReservationPage.css";
import { Key, useEffect, useState } from "react";
import axios from "axios";
import PopUp from "./components/PopUp/PopUp";
import { render } from "react-dom";

function ReservationsPage() {
  interface ReservationData {
    nom_hôtel: string;
    date_reserver: string;
    end_date: string;
    num_chambre: number;
  }

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Fetch reservation data when component mounts
    showReservations();
  }, []);

  const handleTransformClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };
  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });
  const [backendData, setBackendData] = useState<ReservationData[] | null>(
    null
  );
  const showReservations = async () => {
    try {
      const response = await api.get("/reservations");
      setBackendData(response.data);
    } catch (error) {
      console.error("Error fetching Reservation");
    }
  };
  showReservations();

  return (
    <>
      <div className="image-div">
        <img className="reservation-image" src={image}></img>
      </div>
      <div className="cards">
        {backendData &&
          backendData.map(
            (
              reservation: {
                nom_hôtel: string;
                date_reserver: string;
                end_date: string;
                num_chambre: number;
              },
              index: Key | null | undefined
            ) => (
              <ReservationCard
                key={index}
                nom={reservation.nom_hôtel}
                start_date={reservation.date_reserver}
                end_date={reservation.end_date}
                room_num={reservation.num_chambre}
                onTransformClick={handleTransformClick}
              />
            )
          )}
        {isOpen && <PopUp onClose={handleClosePopup}></PopUp>}
      </div>
    </>
  );
}
export default ReservationsPage;
