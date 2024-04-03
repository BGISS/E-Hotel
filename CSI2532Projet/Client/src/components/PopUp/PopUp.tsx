import { useState } from "react";
import "./PopUp.css";
import image from "../../assets/mdi_account-cash.png";
interface PopUpProps {
  onClose: () => void;
  onSubmit: (
    payment: number,
    date_reserver: string,
    end_date: string,
    num_chambre: number,
    reservation_id: number,
    nas_client: number,
    nas_employee: number,
    nom_hotel: string
  ) => void;
  reservation: {
    nom_client: string;
    date_reserver: string;
    end_date: string;
    num_chambre: number;
    reservation_id: number;
    nas_client: number;
    nas_employee: number;
    nom_hôtel: string;
  };
}

const PopUp: React.FC<PopUpProps> = ({ onClose, onSubmit, reservation }) => {
  const [payment, setPayment] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = () => {
    console.log("clicked");
    setDisabled(true);
    // Call onSubmit with the necessary parameters
    onSubmit(
      payment,
      reservation.date_reserver,
      reservation.end_date,
      reservation.num_chambre,
      reservation.reservation_id,
      reservation.nas_client,
      reservation.nas_employee,
      reservation.nom_hôtel
    );
  };
  return (
    <div className="popup-container" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Insert payment</h2>
        <img className="pop-up-image" src={image}></img>
        <input
          className="pop-up-input"
          type="number"
          value={payment}
          onChange={(e) => setPayment(parseFloat(e.target.value))}
        ></input>
        <button className="submit" onClick={handleSubmit} disabled={disabled}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PopUp;
