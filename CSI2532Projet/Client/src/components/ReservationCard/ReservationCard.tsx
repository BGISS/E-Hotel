import "./ReservationCard.css";
interface ReservationCardParam {
  nom: string;
  start_date: string;
  end_date: string;
  room_num: number;
}
function ReservationCard({
  nom,
  start_date,
  end_date,
  room_num,
}: ReservationCardParam) {
  return (
    <>
      <div className="card">
        <div className="text">
          <p>Name: {nom}</p>
          <p>Start date: {start_date}</p>
          <p>End date: {end_date}</p>
          <p>Room: {room_num}</p>
        </div>
        <div className="button-div">
          <button className="transformButton"> Transform</button>
        </div>
      </div>
    </>
  );
}
export default ReservationCard;
