import { useState } from "react";
import image from "../../assets/mdi_account-cash.png";
import "./Createlocation.css";
interface CreateLocationProps {
  onClose: () => void;
}
const CreateLocation: React.FC<CreateLocationProps> = ({ onClose }) => {
  const [payment, setPayment] = useState("");
  return (
    <div className="container" onClick={onClose}>
      <div className="content" onClick={(e) => e.stopPropagation()}>
        <h2>Insert payment</h2>
        <img className="up-image" src={image}></img>
        <input
          className="up-input"
          type="number"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        ></input>
        <button className="button-loc">Create Leasing</button>
      </div>
    </div>
  );
};

export default CreateLocation;
