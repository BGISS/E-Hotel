import axios from "axios";
import "./DeleteCard.css";
import { FaTimes } from "react-icons/fa";

interface CardData {
  name: string;
  primaryKey: any;
  tableName: string;
  onDeleteSuccess: () => void;
}
[];
function DeleteCard({
  name,
  primaryKey,
  tableName,
  onDeleteSuccess,
}: CardData) {
  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });
  const handleOnClick = async (
    name: string,
    primaryKey: any,
    tableName: string
  ) => {
    var condition = "";
    if (tableName === "Client") {
      condition = "nas=" + primaryKey;
    } else if (tableName === "Employé") {
      condition = "nas=" + primaryKey;
    } else if (tableName === "Hôtel") {
      condition = "nom_hôtel= " + `'${primaryKey}'`;
    } else if (tableName === "ChaîneHôtelière") {
      condition = "nom_chaîne= " + `'${primaryKey}'`;
    } else if (tableName === "Chambre") {
      condition = "num_chambre=" + primaryKey + " AND nom_hôtel=" + `'${name}'`;
    }
    console.log(tableName);

    try {
      const response = api.get("/delete", {
        params: {
          tableName,
          condition,
        },
      });
      onDeleteSuccess();
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
            onClick={() => handleOnClick(name, primaryKey, tableName)}
          >
            <FaTimes className="delete-icon" size={30}></FaTimes>
          </button>
        </div>
      </div>
    </>
  );
}
export default DeleteCard;
