import "./LocationCard.css";
interface LocationCardParam {
  nom: string;
  start_date: string;
  end_date: string;
  room_num: number;
}
function LocationCard({
  nom,
  start_date,
  end_date,
  room_num,
}: LocationCardParam) {
  return (
    <>
      <div className="card-lease">
        <div className="text-lease">
          <p>Name: {nom}</p>
          <p>Start date: {start_date}</p>
          <p>End date: {end_date}</p>
          <p>Room: {room_num}</p>
        </div>
      </div>
    </>
  );
}
export default LocationCard;
