import Image from "./assets/image location.jpeg";
import "./LocationPage.css";
import LocationCard from "./components/LocationCard/LocationCard";
import CreateLocation from "./components/CreateLocation/CreateLocation";
import { useState } from "react";
function LocationPage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleTransformClick = () => {
    setIsOpen(!isOpen);
  };
  const handleClosePopup = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="image-div">
        <img className="location-image" src={Image} />
      </div>
      <div className="cards">
        <LocationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
        ></LocationCard>
        <LocationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
        ></LocationCard>
        <LocationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
        ></LocationCard>
        <LocationCard
          nom={"Brian Dookie"}
          start_date={"2024-03-12"}
          end_date={"2024-03-15"}
          room_num={3}
        ></LocationCard>
      </div>
      <button className="location-button" onClick={handleTransformClick}>
        Create Leasing
      </button>
      {isOpen && <CreateLocation onClose={handleClosePopup}></CreateLocation>}
    </>
  );
}
export default LocationPage;
