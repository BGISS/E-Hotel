import { useState } from "react";
import DeleteCard from "./components/DeleteCard/DeleteCard";
import "./DeletePage.css";

function DeletePage() {
  const [isClient, setIsClient] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isHotel, setIsHotel] = useState(false);
  const [isRoom, setRoom] = useState(false);

  return (
    <>
      <div className="select-options"></div>
      <div className="delete-cards">
        {isClient && <DeleteCard name="kok" primaryKey={0}></DeleteCard>}
        {isEmployee && <DeleteCard name="kok" primaryKey={0}></DeleteCard>}
        {isHotel && <DeleteCard name="kok" primaryKey={0}></DeleteCard>}
        {isRoom && <DeleteCard name="kok" primaryKey={0}></DeleteCard>}
        <DeleteCard name="kok" primaryKey={0}></DeleteCard>
      </div>
    </>
  );
}
export default DeletePage;
