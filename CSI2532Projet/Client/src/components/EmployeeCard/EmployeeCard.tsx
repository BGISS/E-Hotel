import "./EmployeeCard.css";

interface EmployeeCardParam {
  icon: string;
  text: string;
}
function EmployeeCard({ icon, text }: EmployeeCardParam) {
  return (
    <div className="card-emp">
      <div className="icon">
        <img className="image" src={icon} alt="Employee icon"></img>
      </div>
      <p>{text}</p>
    </div>
  );
}
export default EmployeeCard;
