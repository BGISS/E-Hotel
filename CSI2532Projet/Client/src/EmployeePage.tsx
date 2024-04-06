import EmployeeCard from "./components/EmployeeCard/EmployeeCard";
import hotelIcon from "./assets/ic_round-hotel.png";
import locationIcon from "./assets/carbon_stay-inside.png";
import cashIcon from "./assets/mdi_account-cash.png";
import hotelImage from "./assets/Employee image.jpeg";
import "./EmployeePage.css";
import { Link } from "react-router-dom";
function EmployeePage() {
  return (
    <>
      <div className="image-div">
        <img className="image-hotel" src={hotelImage}></img>
      </div>
      <div className="employee-cards">
        <Link to="/reservation">
          <EmployeeCard icon={hotelIcon} text={"Reservation"}></EmployeeCard>
        </Link>
        <Link to="/leasing">
          <EmployeeCard icon={locationIcon} text={"Leasings"}></EmployeeCard>
        </Link>
        <Link to="/">
          <EmployeeCard icon={cashIcon} text={"Log Out"}></EmployeeCard>
        </Link>
      </div>
    </>
  );
}

export default EmployeePage;
