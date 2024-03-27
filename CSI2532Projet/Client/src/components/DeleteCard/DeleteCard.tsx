import axios from "axios";
import "./DeleteCard.css";
import { FaTimes } from "react-icons/fa";
interface CardData {
  name: string;
  primaryKey: any;
}
[];
function DeleteCard({ name, primaryKey }: CardData) {
  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });
  const handleOnClick = async (name: string, primaryKey: any) => {
    var condition = "";
    if (name === "Client") {
      condition = "client_nas=";
    } else if (name === "Employé") {
      condition = "nas=";
    } else if (name === "Hôtel") {
      condition = "hôtel_name=";
    }
    condition = condition + primaryKey;

    try {
      const response = api.get("/delete", {
        params: {
          name,
          condition,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="delete-card">
        <div className="card-text">
          <p> {name}</p>
          <p>{primaryKey}</p>
        </div>
        <div className="card-button">
          <button
            className="delete-button"
            onClick={() => handleOnClick(name, primaryKey)}
          >
            <FaTimes className="delete-icon" size={30}></FaTimes>
          </button>
        </div>
      </div>
    </>
  );
}
export default DeleteCard;
