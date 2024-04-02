import { Key, useState } from "react";
import "./Createlocation.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface CreateLocationProps {
  onClose: () => void;
}
//Interface to process data from database
interface ChambreData {
  num_chambre: number;
}

const CreateLocation: React.FC<CreateLocationProps> = ({ onClose }) => {
  //All the variables needded for the queries
  const [isExistingClient, setIsExistingClient] = useState(false);
  const [roomNum, setRoomNum] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [locationId, setLocationId] = useState(0);
  const [registration, setRegistration] = useState("");
  const [chambreData, setChambreData] = useState<ChambreData[] | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [clientNas, setClientNas] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const [payment, setPayment] = useState(0);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [streetNum, setStreetNum] = useState(0);
  const [streetName, setStreetName] = useState("");
  //Checks whether the customer exists
  const handleDropdownChange = (e: { target: { value: string } }) => {
    setIsExistingClient(e.target.value === "yes");
  };
  //Sets the room number to the one selected
  const handleRoomDropdown = (e: { target: { value: string } }) => {
    const roomNumber: number = parseInt(e.target.value);
    setRoomNum(roomNumber);
  };
  //Checks if the input is correct
  function validateInput(input: any) {
    if (input === null || input === 0 || input === "") {
      return false;
    }
    return true;
  }
  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });
  //Shows the available rooms when clicked
  const handleClick = async (
    checkInDate: string,
    checkOutDate: string,
    hotelName: string,
    minPrice: number | null,
    maxPrice: number | null
  ) => {
    if (
      !validateInput(checkInDate) ||
      !validateInput(checkOutDate) ||
      !validateInput(hotelName) ||
      !validateInput(maxPrice) ||
      !validateInput(minPrice)
    ) {
      toast.error("Fill in the previous inputs before pressing!");
      return;
    }
    try {
      const response = await api.get("/getRoomNum", {
        params: {
          checkInDate,
          checkOutDate,
          hotelName,
          minPrice,
          maxPrice,
        },
      });
      setChambreData(response.data);
    } catch (error) {
      console.error("Error fetching information");
    }
  };
  const handleSubmit = async (
    firstName: string,
    lastName: string,
    registration: string,
    payment: number,
    country: string,
    city: string,
    postal: string,
    streetNum: number,
    date_reserver: string,
    end_date: string,
    num_chambre: number,
    nas_client: number,
    nas_employee: number,
    nom_hôtel: string,
    location_id: number,
    streetName: string
  ) => {
    if (
      !validateInput(payment) ||
      !validateInput(date_reserver) ||
      !validateInput(end_date) ||
      !validateInput(num_chambre) ||
      !validateInput(nas_client) ||
      !validateInput(nas_employee) ||
      !validateInput(nom_hôtel)
      //!validateInput(locationId)
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    //Adds a new client
    if (!isExistingClient) {
      if (
        !validateInput(firstName) ||
        !validateInput(lastName) ||
        !validateInput(registration) ||
        !validateInput(city) ||
        !validateInput(country) ||
        !validateInput(postal) ||
        !validateInput(streetNum) ||
        !validateInput(streetName)
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }
      try {
        const data = await api.get("/createClient", {
          params: {
            firstName,
            lastName,
            nas_client,
            registration,
          },
        });
      } catch (error) {
        console.error("ERROR", error);
      }
      try {
        const data = await api.get("/createClientAddress", {
          params: {
            country,
            city,
            streetNum,
            streetName,
            postal,
            nas_client,
          },
        });
        console.log("kok", data);
      } catch (error) {
        console.error("ERROR", error);
      }
    }
    //Create the leasing
    console.log(nas_employee);
    await api.get("/createLocation", {
      params: {
        date_reserver,
        end_date,
        num_chambre,
        nom_hôtel,
        payment,
        nas_employee,
        nas_client,
      },
    });
    toast.success("Request Successful!");
  };

  return (
    <div className="container-form" onClick={onClose}>
      <div className="content-form" onClick={(e) => e.stopPropagation()}>
        <h2>Leasing Form</h2>
        <form>
          <div className="form-group-lease">
            <label htmlFor="existingClient">Are you an existing client?</label>
            <select
              id="existingClient"
              name="existingClient"
              className="select-location"
              onChange={handleDropdownChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {!isExistingClient && (
            <>
              <div className="form-group-lease">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group-lease">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group-lease">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                />
              </div>
              <div className="form-group-lease">
                <label htmlFor="date">Country:</label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="form-group-lease">
                <label htmlFor="date">City:</label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group-lease">
                <label htmlFor="date">Postal Code:</label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                />
              </div>
              <div className="form-group-lease">
                <label htmlFor="date">Street num:</label>
                <input
                  type="number"
                  id="date"
                  name="date"
                  value={streetNum}
                  onChange={(e) => setStreetNum(parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group-lease">
                <label htmlFor="date">Street Name:</label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="form-group-lease">
            <label htmlFor="locationId">Location ID:</label>
            <input
              type="number"
              id="locationId"
              name="locationId"
              value={locationId}
              onChange={(e) => setLocationId(parseFloat(e.target.value))}
            />
          </div>
          <div className="form-group-lease">
            <label htmlFor="hotelName">Hotel Name:</label>
            <input
              type="text"
              id="hotelName"
              name="hotelName"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
            />
          </div>
          <div className="form-group-lease">
            <label htmlFor="clientNas">Client NAS:</label>
            <input
              type="number"
              id="clientNas"
              name="clientNas"
              value={clientNas}
              onChange={(e) => setClientNas(parseFloat(e.target.value))}
            />
          </div>
          <div className="form-group-lease">
            <label htmlFor="employeeId">Employee ID:</label>
            <input
              type="number"
              id="employeeId"
              name="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(parseFloat(e.target.value))}
            />
          </div>
          <div className="form-group-lease">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </div>
          <div className="form-group-lease">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
          <div className="form-group-lease">
            <label htmlFor="minPrice">Min Price:</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={minPrice !== null ? minPrice : ""}
              onChange={(e) => setMinPrice(parseFloat(e.target.value))}
            />
          </div>
          <div className="form-group-lease">
            <label htmlFor="maxPrice">Max Price:</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={maxPrice !== null ? maxPrice : ""}
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
            />
          </div>
          <div className="form-group-lease">
            <label htmlFor="roomNum">Room Number:</label>
            <select
              className="select-location"
              id="selectRoom"
              onChange={handleRoomDropdown}
              onClick={() =>
                handleClick(
                  checkInDate,
                  checkOutDate,
                  hotelName,
                  minPrice,
                  maxPrice
                )
              }
            >
              {chambreData &&
                chambreData.map(
                  (
                    chambre: {
                      num_chambre: number;
                    },
                    index: Key | null | undefined
                  ) => (
                    <option key={index} value={chambre.num_chambre}>
                      {chambre.num_chambre}
                    </option>
                  )
                )}
            </select>
          </div>
          <div className="form-group-lease">
            <label htmlFor="payment">Payment:</label>
            <input
              type="number"
              id="payment"
              name="payment"
              value={payment}
              onChange={(e) => setPayment(parseFloat(e.target.value))}
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(
                firstName,
                lastName,
                registration,
                payment,
                country,
                city,
                postal,
                streetNum,
                checkInDate,
                checkOutDate,
                roomNum,
                clientNas,
                employeeId,
                hotelName,
                locationId,
                streetName
              );
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default CreateLocation;
