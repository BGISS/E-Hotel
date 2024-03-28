import { Key, useState } from "react";
import DeleteCard from "./components/DeleteCard/DeleteCard";
import "./DeletePage.css";
import axios from "axios";
import UpdateCard from "./components/UpdateCard/UpdateCardClient";
interface ClientData {
  nom_client: string;
  prénom_client: string;
  nas: number;
  dâte_enregistrement: string;
}
interface EmployeeData {
  nom: string;
  prénom: string;
  nas: number;
}
interface HotelData {
  nom_hôtel: string;
  nom_chaîne: string;
}
interface RoomData {
  num_chambre: number;
  nom_hôtel: string;
}
function UpdatePage() {
  const [clientData, setClientData] = useState<ClientData[] | null>(null);
  const [employeeData, setEmployeeData] = useState<EmployeeData[] | null>(null);
  const [HotelData, setHotelData] = useState<HotelData[] | null>(null);
  const [RoomData, setRoomData] = useState<RoomData[] | null>(null);
  const [clientscolor, setclientscolor] = useState<string>("#000000");
  const [employeescolor, setemployeescolor] = useState<string>("#000000");
  const [chainscolor, setchainscolor] = useState<string>("#000000");
  const [hotelscolor, sethotelscolor] = useState<string>("#000000");
  const [roomscolor, setroomscolor] = useState<string>("#000000");

  const [clientVisible, setClientVisible] = useState(false);
  const [employeeVisible, setEmployeeVisible] = useState(false);
  const [chainsVisible, setChainsVisible] = useState(false);
  const [hotelsVisible, setHotelsVisible] = useState(false);
  const [roomVisible, setRoomVisible] = useState(false);

  const handleClick = (
    setColor: React.Dispatch<React.SetStateAction<string>>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    changeColor(setColor);
    setClientVisible(false);
    setEmployeeVisible(false);
    setChainsVisible(false);
    setHotelsVisible(false);
    setRoomVisible(false);
    setVisible(true);
  };

  const changeColor = (
    setColor: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setclientscolor("#000000");
    setchainscolor("#000000");
    sethotelscolor("#000000");
    setemployeescolor("#000000");
    setroomscolor("#000000");
    setColor("#E9CB29");
  };
  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });
  const getClients = async () => {
    try {
      const response = await api.get("/getClients");
      setClientData(response.data);
    } catch (error) {
      console.error("Error Fetching Client");
    }
  };
  const getEmployees = async () => {
    try {
      const response = await api.get("/getEmployee");
      setEmployeeData(response.data);
    } catch (error) {
      console.error("Error Fetching Employee");
    }
  };
  const getHotels = async () => {
    try {
      const response = await api.get("/getHotels");
      setHotelData(response.data);
    } catch (error) {
      console.error("Error Fetching Hotel");
    }
  };
  const getRooms = async () => {
    try {
      const response = await api.get("/getRoom");
      setRoomData(response.data);
    } catch (error) {
      console.error("Error Fetching Room");
    }
  };

  return (
    <>
      <div className="delete-container">
        <div className="select-options">
          <div className="optionstext">
            <div className="Clients">
              <p
                className="clientstext"
                style={{ color: clientscolor }}
                onClick={() => {
                  handleClick(setclientscolor, setClientVisible);
                  getClients();
                }}
              >
                Clients
              </p>
            </div>
            <div className="Employees">
              <p
                className="employeestext"
                style={{ color: employeescolor }}
                onClick={() => {
                  handleClick(setemployeescolor, setEmployeeVisible);
                  getEmployees();
                }}
              >
                Employees
              </p>
            </div>
            <div className="chains">
              <p
                className="chainstext"
                style={{ color: chainscolor }}
                onClick={() => handleClick(setchainscolor, setChainsVisible)}
              >
                Hotel chains
              </p>
            </div>
            <div className="hotels">
              <p
                className="hotelstext"
                style={{ color: hotelscolor }}
                onClick={() => {
                  handleClick(sethotelscolor, setHotelsVisible);
                  getHotels();
                }}
              >
                Hotels
              </p>
            </div>
            <div className="rooms">
              <p
                className="roomstext"
                style={{ color: roomscolor }}
                onClick={() => {
                  handleClick(setroomscolor, setRoomVisible);
                  getRooms();
                }}
              >
                Rooms
              </p>
            </div>
          </div>
        </div>
        <div className="delete-cards">
          {clientVisible &&
            clientData &&
            clientData.map(
              (
                client: {
                  nom_client: string;
                  prénom_client: string;
                  nas: number;
                  dâte_enregistrement: string;
                },
                index: Key | null | undefined
              ) => (
                <UpdateCard
                  key={index}
                  name={`${client.prénom_client} ${client.nom_client}`}
                  NAS={client.nas}
                  date={client.dâte_enregistrement.substring(0, 10)}
                ></UpdateCard>
              )
            )}
          {employeeVisible &&
            employeeData &&
            employeeData.map(
              (
                employee: {
                  nom: string;
                  prénom: string;
                  nas: number;
                },
                index: Key | null | undefined
              ) => (
                <DeleteCard
                  key={index}
                  name={employee.nom + " " + employee.prénom}
                  primaryKey={employee.nas}
                  tableName="Employé"
                ></DeleteCard>
              )
            )}
          {hotelsVisible &&
            HotelData &&
            HotelData.map(
              (
                hotel: {
                  nom_hôtel: string;
                  nom_chaîne: string;
                },
                index: Key | null | undefined
              ) => (
                <DeleteCard
                  key={index}
                  name={hotel.nom_hôtel}
                  primaryKey={hotel.nom_hôtel}
                  tableName="Hôtel"
                ></DeleteCard>
              )
            )}
          {roomVisible &&
            RoomData &&
            RoomData.map(
              (
                room: {
                  num_chambre: number;
                  nom_hôtel: string;
                },
                index: Key | null | undefined
              ) => (
                <DeleteCard
                  key={index}
                  name={room.nom_hôtel}
                  primaryKey={room.num_chambre}
                  tableName="Chambre"
                ></DeleteCard>
              )
            )}
          {/* <DeleteCard name="kok" primaryKey={0}></DeleteCard>
          <DeleteCard name="kok" primaryKey={0}></DeleteCard>
          <DeleteCard name="kok" primaryKey={0}></DeleteCard>
          <DeleteCard name="kok" primaryKey={0}></DeleteCard>
          <DeleteCard name="kok" primaryKey={0}></DeleteCard>
          <DeleteCard name="kok" primaryKey={0}></DeleteCard>
          <DeleteCard name="kok" primaryKey={0}></DeleteCard>
          <DeleteCard name="kok" primaryKey={0}></DeleteCard> */}
        </div>
      </div>
    </>
  );
}
export default UpdatePage;
