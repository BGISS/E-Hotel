import Image from "./assets/image location.jpeg";
import "./LocationPage.css";
import LocationCard from "./components/LocationCard/LocationCard";
function LocationPage() {
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
      <button className="location-button">Create Leasing</button>
    </>
  );
}
export default LocationPage;
