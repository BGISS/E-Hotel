import "./UpdateCardClient.css";
import Modal from "../Modal/Modal";
import { useState } from "react";

function UpdateCardClient(props: {
  values: (string | number)[];
  keys: string[];
  tableName: string;
}) {
  const [modal, setModal] = useState(false);

  const display = props.keys.map((item, index) => {
    function capitalize(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function removeCharacter(str: string, charToRemove: string): string {
      const regex = new RegExp(charToRemove, "g");
      return str.replace(regex, " ");
    }

    if (item === "dâte_enregistrement") {
      props.values[index] = props.values[index].toString().substring(0, 10);
      item = "dâte";
    }

    item = capitalize(item);
    item = removeCharacter(item, "_");

    return (
      <li key={index}>
        {item} : {props.values[index]}
      </li>
    );
  });

  return (
    <>
      <div className="card-container">
        <ul className="list">{display}</ul>
        <button className="edit-btn" onClick={() => setModal(!modal)}></button>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(!modal)}></div>
      )}

      {modal && (
        <Modal
          values={props.values}
          keys={props.keys}
          tableName={props.tableName}
        ></Modal>
      )}
    </>
  );
}

export default UpdateCardClient;
