import { useState } from "react";
import "./InsertHotel.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function InsertHotel() {
  const [hotelChain, setHotelChain] = useState("");
  const [numStars, setNumStars] = useState(0);
  const [numTel, setNumTel] = useState(0);
  const [numClients, setNumClients] = useState(0);
  const [numRooms, setNumRooms] = useState(0);
  const [email, setEmail] = useState("");
  const [hotel, setHotel] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [streetNum, setStreetNum] = useState(0);

  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });

  function validateInput(input: any) {
    if (input === null || input === 0 || input === "") {
      return false;
    }
    return true;
  }


  const handleClick = async() => {

    if (
      !validateInput(hotel) ||
      !validateInput(hotelChain) ||
      !validateInput(numStars) ||
      !validateInput(numTel) ||
      !validateInput(country) ||
      !validateInput(city) ||
      !validateInput(postal) ||
      !validateInput(streetNum) ||
      !validateInput(numClients) ||
      !validateInput(numRooms) ||
      !validateInput(email) 
    ) {
      toast.error("Fill in the previous inputs before pressing!");
      return;
    }

    try {
      const u = await api.get("/getUser",{
        params:{
            hotel,
        },
      });

      if (u.data[0]===undefined){
        const response = await api.get("/insertHotel", {
          params: {
            hotel,
            hotelChain,
            email,
            numStars,
            numTel,
            city,
            postal,
            streetNum,
            country,
            numRooms,
            numClients,
          },
        });
        toast.success("Request Successful!");
      } else {
        toast.error("This hotel name is already in use!")
    }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="containerForm">
        <div className="form-group">
          <label htmlFor="lastName">Hotel Chain:</label>
          <input
            className="last"
            type="text"
            id="lastName"
            name="lastName"
            value={hotelChain}
            onChange={(e) => setHotelChain(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hotel">Hotel Name:</label>
          <input
            className="email"
            type="text"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Number of Stars:</label>
          <input
            className="first"
            type="text"
            id="firstName"
            name="firstName"
            value={numStars}
            onChange={(e) => setNumStars(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Telephone Number:</label>
          <input
            className="first"
            type="text"
            id="firstName"
            name="firstName"
            value={numTel}
            onChange={(e) => setNumTel(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Country:</label>
          <input
            className="last"
            type="text"
            id="lastName"
            name="lastName"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">City:</label>
          <input
            className="last"
            type="text"
            id="lastName"
            name="lastName"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Street Number:</label>
          <input
            className="last"
            type="number"
            id="lastName"
            name="lastName"
            value={streetNum}
            onChange={(e) => setStreetNum(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Number of rooms:</label>
          <input
            className="last"
            type="number"
            value={numRooms}
            onChange={(e) => setNumRooms(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Number of clients:</label>
          <input
            className="last"
            type="number"
            value={numClients}
            onChange={(e) => setNumClients(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Postal Code:</label>
          <input
            className="last"
            type="text"
            id="lastName"
            name="lastName"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
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
export default InsertHotel;
