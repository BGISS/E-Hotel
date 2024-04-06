import { Key, useState } from "react";
import "./InsertHotel.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface Chaine {
  nom_chaîne: string;
}
function InsertHotel() {
  const [hotelChain, setHotelChain] = useState("");
  const [numStars, setNumStars] = useState(0);
  const [numTel, setNumTel] = useState(0);
  const [numClients, setNumClients] = useState(0);
  const [numRooms, setNumRooms] = useState(0);
  const [chaineData, setChaineData] = useState<Chaine[] | null>(null);
  const [email, setEmail] = useState("");
  const [hotel, setHotel] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [streetNum, setStreetNum] = useState(0);
  const [streetName, setStreetName] = useState("");

  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });

  function validateInput(input: any) {
    if (input === null || input === 0 || input === "") {
      return false;
    }
    return true;
  }

  const handleClick = async () => {
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
      !validateInput(email) ||
      !validateInput(streetName)
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

      if (u.data[0] === undefined) {
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
            streetName,
          },
        });
        toast.success("Request Successful!");
      } else {
        toast.error("This hotel name is already in use!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getChain = async () => {
    try {
      const response = await api.get("/getChain");
      setChaineData(response.data);
    } catch (error) {
      console.error("Error Fetching Chaine");
    }
  };

  return (
    <>
      <div className="containerForm">
        <div className="form-group">
          <label htmlFor="lastName">Hotel Chain:</label>
          <select
            className="last"
            onChange={(e) => setHotelChain(e.target.value)}
            onClick={() => getChain()}
          >
            <option value={""}>Select an option</option>

            {chaineData &&
              chaineData.map(
                (
                  chaine: {
                    nom_chaîne: string;
                  },
                  index: Key | null | undefined
                ) => (
                  <option key={index} value={chaine.nom_chaîne}>
                    {chaine.nom_chaîne}
                  </option>
                )
              )}
          </select>
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
            type="number"
            id="firstName"
            name="firstName"
            value={numStars}
            min={1}
            max={5}
            onChange={(e) => setNumStars(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Telephone Number:</label>
          <input
            className="first"
            type="number"
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
          <label htmlFor="lastName">Street Name:</label>
          <input
            className="last"
            type="text"
            id="lastName"
            name="lastName"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Number of rooms:</label>
          <input
            className="last"
            type="number"
            value={numRooms}
            min={1}
            onChange={(e) => setNumRooms(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Number of clients:</label>
          <input
            className="last"
            type="number"
            value={numClients}
            min={1}
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
