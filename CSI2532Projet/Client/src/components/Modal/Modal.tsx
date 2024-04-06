import axios from "axios";
import "./Modal.css";

function Modal(props: {
  values: (string | number)[];
  keys: string[];
  tableName: string;
}) {
  var initialValues = [...props.values];

  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });

  const handleInputs = (index: number, event: any) => {
    props.values[index] = event.target.value;
  };

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function removeCharacter(str: string, charToRemove: string): string {
    const regex = new RegExp(charToRemove, "g");
    return str.replace(regex, " ");
  }

  const display = props.values.map((item, index) => {
    var isPrimaryKey = false;
    var key = capitalize(props.keys[index]);
    key = removeCharacter(key, "_");

    if (index === 0 || (index === 1 && props.tableName === "chambre")) {
      isPrimaryKey = true;
    }
    var pClassName = `p ${index}`;

    return (
      <>
        <p className={pClassName}>{key}</p>
        <input
          className="input"
          key={index}
          type={typeof item === "number" ? "number" : "text"}
          onChange={() => handleInputs(index, event)}
          placeholder={String(item)}
          disabled={isPrimaryKey}
        />
      </>
    );
  });

  const saveChanges = async () => {
    var changed = false;
    const primaryKey = initialValues[0];
    var query = `UPDATE ${props.tableName} SET `;
    for (let i = 0; i < props.values.length; i++) {
      var item = props.values[i];
      if (item !== initialValues[i]) {
        if (typeof item === "number") {
          query = query + `${props.keys[i]} = ${item}, `;
          changed = true;
        } else {
          query = query + `${props.keys[i]} = '${item}', `;
          changed = true;
        }
      }
    }
    query = query.slice(0, -2) + ` WHERE ${props.keys[0]} = ${primaryKey}`;
    if (props.tableName === "chambre") {
      query = query + ` AND ${props.keys[1]} = ${initialValues[1]}`;
    }
    const encodedQuery = encodeURIComponent(query);
    console.log(changed);
    if (changed) {
      try {
        await api.get(`/update`, { params: { encodedQuery } });
      } catch (error) {
        console.error("Error updating ", error);
      }
    }
  };

  return (
    <>
      <div className="edit-container">
        {display}
        <button onClick={saveChanges} className="save-btn">
          Save
        </button>
      </div>
    </>
  );
}

export default Modal;
