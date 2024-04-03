import "./InsertRoom.css";
import React, { Key, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
interface HotelData {
  nom_hôtel: string;
}
function InsertRoom() {
  const [numRoom, setNumRoom] = useState(0);
  const [price, setPrice] = useState(0);
  const [view, setView] = useState("");
  const [superficie, setSuperficie] = useState(0);
  const [hote, setHote] = useState<HotelData[] | null>(null);
  const [capacity, setCapacity] = useState(0);
  const [hotel, setHotel] = useState("");
  const [commodity, setcommodity] = useState("");
  const [dommages, setDommages] = useState<boolean>(false);

  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });

  function validateInput(input: any) {
    if (input === null || input === 0 || input === "") {
      return false;
    }
    return true;
  }
  const getHotels = async () => {
    try {
      const response = await api.get("/getHotels");
      setHote(response.data);
    } catch (error) {
      console.error("Error Fetching Hotel");
    }
  };
  const handleClick = async () => {
    if (
      !validateInput(numRoom) ||
      !validateInput(price) ||
      !validateInput(view) ||
      !validateInput(superficie) ||
      !validateInput(capacity) ||
      !validateInput(hotel) ||
      !validateInput(dommages)
    ) {
      toast.error("Fill in the previous inputs before pressing!");
      return;
    }
    try {
      const u = await api.get("/getHotel", {
        params: {
          hotel,
        },
      });

      if (u.data[0] != undefined) {
        const r = await api.get("/getRoom", {
          params: {
            hotel,
            numRoom,
          },
        });
        if (r.data[0] === undefined) {
          const response = await api.get("/insertRoom", {
            params: {
              numRoom,
              price,
              view,
              superficie,
              capacity,
              hotel,
              dommages,
              commodity,
            },
          });
          toast.success("Request Successful!");
        } else {
          toast.error("This room number is already in use");
        }
      } else {
        toast.error("This hotel name does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = (event: { target: { checked: any } }) => {
    setDommages(event.target.checked);
  };
  console.log(dommages);
  return (
    <>
      <div className="containerForm">
        <div className="form-group">
          <label htmlFor="hotel">Hotel Name:</label>
          <select
            className="email"
            onChange={(e) => setHotel(e.target.value)}
            onClick={() => getHotels()}
          >
            {hote &&
              hote.map(
                (
                  hotel: {
                    nom_hôtel: string;
                  },
                  index: Key | null | undefined
                ) => (
                  <option key={index} value={hotel.nom_hôtel}>
                    {hotel.nom_hôtel}
                  </option>
                )
              )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="numRoom">Room number:</label>
          <input
            className="first"
            type="number"
            value={numRoom}
            onChange={(e) => setNumRoom(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Room capacity:</label>
          <input
            className="last"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            className="last"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomsize">Room size: </label>
          <input
            className="NAS"
            type="number"
            value={superficie}
            onChange={(e) => setSuperficie(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">View:</label>
          <input
            className="email"
            type="text"
            value={view}
            onChange={(e) => setView(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="commodite">Commodity:</label>
          <input
            className="email"
            type="text"
            value={commodity}
            onChange={(e) => setcommodity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">Is there damages to the room?</label>
          <input
            className="checkbox"
            type="checkbox"
            checked={dommages}
            onChange={(e) => handleCheck(e)}
          />
        </div>
        <div className="submit" onClick={handleClick}>
          Insert
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
export default InsertRoom;
