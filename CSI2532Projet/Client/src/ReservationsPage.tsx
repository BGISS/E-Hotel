import ReservationCard from "./components/ReservationCard/ReservationCard";
import image from "./assets/Reservation.jpeg";
import "./ReservationPage.css";
import { Key, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import PopUp from "./components/PopUp/PopUp";
import { render } from "react-dom";

function ReservationsPage() {
  interface ReservationData {
    nom_client: string;
    date_reserver: string;
    end_date: string;
    num_chambre: number;
    nom_hôtel: string;
    nas_employee: number;
    nas_client: number;
    reservation_id: number;
  }
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [backendData, setBackendData] = useState<ReservationData[] | null>(
    null
  );
  useEffect(() => {
    showReservations();
  }, []);

  const handleTransformClick = (reservation: ReservationData) => {
    setSelectedReservation(reservation);
    setIsOpen(!isOpen);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };
  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });
  const handleOnSubmit = async (
    payment: number,
    date_reserver: string,
    end_date: string,
    num_chambre: number,
    reservation_id: number,
    nas_client: number,
    nas_employee: number,
    nom_hôtel: string
  ) => {
    if (selectedReservation) {
      console.log(payment, nas_client, nom_hôtel);
      try {
        const response = await api.post("/transform", {
          reservation_id,
          date_reserver,
          end_date,
          num_chambre,
          nom_hôtel,
          payment,
          nas_employee,
          nas_client,
        });
      } catch (error) {
        console.error("Error inserting payment", error);
      }
    } else {
      console.error("No selected reservation to submit.");
    }
  };

  const showReservations = async () => {
    try {
      const response = await api.get("/reservations");
      console.log(response.data);
      setBackendData(response.data);
    } catch (error) {
      console.error("Error fetching Reservation");
    }
  };

  return (
    <>
      <div className="image-div">
        <img className="reservation-image" src={image}></img>
      </div>
      <div className="cards-reserv">
        {backendData &&
          backendData.map(
            (
              reservation: {
                nom_client: string;
                date_reserver: string;
                end_date: string;
                num_chambre: number;
                nom_hôtel: string;
                nas_employee: number;
                nas_client: number;
                reservation_id: number;
              },
              index: Key | null | undefined
            ) => (
              <ReservationCard
                key={index}
                nom={reservation.nom_client}
                start_date={reservation.date_reserver.slice(0, 10)}
                end_date={reservation.end_date.slice(0, 10)}
                room_num={reservation.num_chambre}
                onTransformClick={() => handleTransformClick(reservation)}
              />
            )
          )}
        {selectedReservation && isOpen && (
          <PopUp
            onClose={handleClosePopup}
            onSubmit={handleOnSubmit}
            reservation={selectedReservation}
          ></PopUp>
        )}
      </div>
    </>
  );
}
export default ReservationsPage;
