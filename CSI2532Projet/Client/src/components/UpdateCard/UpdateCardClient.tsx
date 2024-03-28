import "./UpdateCardClient.css";
import Modal from "../Modal/Modal";
import { useState } from "react";

function UpdateCard(props: { name: string; NAS: number; date: string }) {
  const [modal, setModal] = useState(false);
  const values = Object.values(props);
  const keys = Object.keys(props);
  const properties = ["Name: ", "NAS: ", "Date: "];
  const display = properties.map((item, index) => {
    return (
      <li key={index}>
        {item}
        {values[index]}
      </li>
    );
  });

  return (
    <>
      <div className="card-container">
        <ul className="list">{display}</ul>
        <button className="edit-btn" onClick={() => setModal(!modal)}></button>
      </div>
      {modal && <Modal values={values} keys={keys}></Modal>}
    </>
  );
}

export default UpdateCard;
