import { useState } from "react";
import "./PopUp.css";
import image from "../../assets/mdi_account-cash.png";
interface PopUpProps {
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ onClose }) => {
  const [payment, setPayment] = useState("");
  return (
    <div className="popup-container" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Insert payment</h2>
        <img className="pop-up-image" src={image}></img>
        <input
          className="pop-up-input"
          type="number"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        ></input>
      </div>
    </div>
  );
};

export default PopUp;
