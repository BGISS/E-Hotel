import EmployeeCard from "./components/EmployeeCard/EmployeeCard";
import hotelIcon from "./assets/ic_round-hotel.png";
import locationIcon from "./assets/carbon_stay-inside.png";
import cashIcon from "./assets/mdi_account-cash.png";
import hotelImage from "./assets/Employee image.jpeg";
import "./EmployeePage.css";
function EmployeePage() {
  return (
    <>
      <div className="image-div">
        <img className="image-hotel" src={hotelImage}></img>
      </div>
      <div className="cards">
        <EmployeeCard icon={hotelIcon} text={"Reservation"}></EmployeeCard>
        <EmployeeCard icon={locationIcon} text={"Leasings"}></EmployeeCard>
        <EmployeeCard icon={cashIcon} text={"Log Out"}></EmployeeCard>
      </div>
    </>
  );
}

export default EmployeePage;
