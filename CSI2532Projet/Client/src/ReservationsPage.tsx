import ReservationCard from "./components/ReservationCard/ReservationCard";
import image from "./assets/Reservation.jpeg";
import "./ReservationPage.css";
import { useState } from "react";
import PopUp from "./components/PopUp/PopUp";
function ReservationsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleTransformClick = () => {
    setIsOpen(!isOpen);
  };
  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="image-div">
        <img className="reservation-image" src={image}></img>
      </div>
      <div className="cards">
        <ReservationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
          onTransformClick={handleTransformClick}
        ></ReservationCard>
        <ReservationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
          onTransformClick={handleTransformClick}
        ></ReservationCard>
        <ReservationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
          onTransformClick={handleTransformClick}
        ></ReservationCard>
        <ReservationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
          onTransformClick={handleTransformClick}
        ></ReservationCard>
        {isOpen && <PopUp onClose={handleClosePopup}></PopUp>}
      </div>
    </>
  );
}
export default ReservationsPage;
