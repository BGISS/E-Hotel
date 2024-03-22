import ReservationCard from "./components/ReservationCard/ReservationCard";
import image from "./assets/Reservation.jpeg";
import "./ReservationPage.css";
function ReservationsPage() {
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
        ></ReservationCard>
        <ReservationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
        ></ReservationCard>
        <ReservationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
        ></ReservationCard>
        <ReservationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
        ></ReservationCard>
      </div>
    </>
  );
}
export default ReservationsPage;
