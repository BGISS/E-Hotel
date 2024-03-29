import "./ReservationCard.css";
interface ReservationCardParam {
  nom: string;
  start_date: string;
  end_date: string;
  room_num: number;
  onTransformClick: (reservation: any) => void;
}

function ReservationCard({
  nom,
  start_date,
  end_date,
  room_num,
  onTransformClick,
}: ReservationCardParam) {
  return (
    <>
      <div className="card-reservation">
        <div className="text-reservation">
          <p>Name: {nom}</p>
          <p>Start date: {start_date}</p>
          <p>End date: {end_date}</p>
          <p>Room: {room_num}</p>
        </div>
        <div className="button-div">
          <button className="transformButton" onClick={onTransformClick}>
            {" "}
            Transform
          </button>
        </div>
      </div>
    </>
  );
}
export default ReservationCard;
