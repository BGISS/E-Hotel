import { useState } from "react";
import "./Modal.css";

function Modal(props: { values: (string | number)[]; keys: string[] }) {
  const [inputs, setInputs] = useState<any[]>([]);

  const handleInputs = (index: number, event: any) => {
    var newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const display = props.values.map((item, index) => {
    return (
      <>
        <p key={index}>{props.keys[index]}</p>
        <input
          value={String(item)}
          type={typeof item === "number" ? "number" : "text"}
          onChange={() => handleInputs(index, event)}
          placeholder={String(item)}
        />
      </>
    );
  });
  return (
    <>
      <div className="edit-container">{display}</div>
    </>
  );
}

export default Modal;
