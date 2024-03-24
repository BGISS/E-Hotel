import { useState } from "react";
import "./Createlocation.css";
interface CreateLocationProps {
  onClose: () => void;
}
const CreateLocation: React.FC<CreateLocationProps> = ({ onClose }) => {
  const [isExistingClient, setIsExistingClient] = useState(false);

  const handleDropdownChange = (e: { target: { value: string } }) => {
    setIsExistingClient(e.target.value === "yes");
  };

  return (
    <div className="container" onClick={onClose}>
      <div className="content" onClick={(e) => e.stopPropagation()}>
        <h2>Leasing Form</h2>
        <form>
          <div className="form-group">
            <label htmlFor="existingClient">Are you an existing client?</label>
            <select
              id="existingClient"
              name="existingClient"
              onChange={handleDropdownChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {!isExistingClient && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="locationId">Location ID:</label>
            <input type="number" id="locationId" name="locationId" />
          </div>
          <div className="form-group">
            <label htmlFor="roomNum">Room Number:</label>
            <input type="number" id="roomNum" name="roomNum" />
          </div>
          <div className="form-group">
            <label htmlFor="hotelName">Hotel Name:</label>
            <input type="text" id="hotelName" name="hotelName" />
          </div>
          <div className="form-group">
            <label htmlFor="clientNas">Client NAS:</label>
            <input type="number" id="clientNas" name="clientNas" />
          </div>
          <div className="form-group">
            <label htmlFor="employeeId">Employee ID:</label>
            <input type="number" id="employeeId" name="employeeId" />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" name="startDate" />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" name="endDate" />
          </div>
          <div className="form-group">
            <label htmlFor="payment">Payment:</label>
            <input type="number" id="payment" name="payment" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateLocation;
