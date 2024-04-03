import axios from "axios";
import "./ReserveRoomPopUp.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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
  checkOutDate,
}: RoomReserveParam) {
  console.log("from reserve", checkInDate, " ", checkOutDate);

  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });
  const [NAS, setNAS] = useState(0);
  const [nas_employee, setNas_employee] = useState(0);

  const reserve = async () => {
    console.log("clicked");
    var nas_employee;
    try {
      const response = await api.get("/ReservePopUp");
      const arr = response.data;
      console.log(arr);
      for (const item of arr) {
        console.log(item);
        if (item.reservation_id === null) {
          nas_employee = item.nas_employee;
          setNas_employee(nas_employee);
          break;
        } else {
          const randomIndex = Math.floor(Math.random() * arr.length);
          nas_employee = arr[randomIndex].nas_employee;
          setNas_employee(nas_employee);
        }
      }
    } catch (error) {
      console.error("Reserve pop-up", error);
    }
    try {
      await api.get("/createReservation", {
        params: {
          checkInDate,
          checkOutDate,
          num_chambre,
          nom_hôtel,
          NAS,
          nas_employee,
        },
      });
    } catch (error) {}
    toast.success("Created Reservation!");
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
        <button className="reserve-btn" onClick={reserve}>
          Reserve
        </button>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}
export default ReserveRoomPopUp;
