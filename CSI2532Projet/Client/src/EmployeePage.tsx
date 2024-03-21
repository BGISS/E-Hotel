import EmployeeCard from "./components/EmployeeCard/EmployeeCard";
import hotelIcon from "./assets/ic_round-hotel.png";
import locationIcon from "./assets/carbon_stay-inside.png";
import cashIcon from "./assets/mdi_account-cash.png";
function EmployeePage() {
  return (
    <>
      <EmployeeCard icon={hotelIcon} text={"Reservation"}></EmployeeCard>
      <EmployeeCard icon={locationIcon} text={"Locations"}></EmployeeCard>
      <EmployeeCard icon={cashIcon} text={"Inserer payment"}></EmployeeCard>
    </>
  );
}
