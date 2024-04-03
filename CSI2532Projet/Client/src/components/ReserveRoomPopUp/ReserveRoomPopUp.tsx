import axios from "axios";
import "./ReserveRoomPopUp.css";
import { useState } from "react";

interface RoomReserveParam {
  nom_hôtel: string;
  num_chambre: number;
  prix: number;
  capacité: number;
  checkInDate: string;
  checkOutDate: string;
}

function ReserveRoomPopUp({
  nom_hôtel,
  num_chambre,
  prix,
  capacité,
  checkInDate,
  checkOutDate
}: RoomReserveParam ) {
  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });
  const [NAS, setNAS] = useState(0);
  const createReservation = async () => {
    try {
    } catch (error) {}
  };
  return (
    <>
      <div className="reserveRoomContainer">
        <div className="form-group">
          <label htmlFor="lastName">Enter your NAS to reserve this room</label>
          <input
            className="last"
            type="number"
            id="lastName"
            name="lastName"
            min={1}
            value={NAS}
            onChange={(e) => setNAS(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </>
  );
}
export default ReserveRoomPopUp;
