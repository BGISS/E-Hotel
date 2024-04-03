import "./InsertEmployee.css";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function InsertEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeNas, setemployeeNas] = useState(0);
  const [role, setrole] = useState("");
  const [hotel, setHotel] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [streetNum, setStreetNum] = useState(0);

  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });

  function validateInput(input: any) {
    if (input === null || input === 0 || input === "") {
      return false;
    }
    return true;
  }

  const handleClick = async () => {
    if (
      !validateInput(firstName) ||
      !validateInput(lastName) ||
      !validateInput(employeeNas) ||
      !validateInput(role) ||
      !validateInput(hotel) ||
      !validateInput(country) ||
      !validateInput(city) ||
      !validateInput(postal) ||
      !validateInput(streetNum)
    ) {
      toast.error("Fill in the previous inputs before pressing!");
      return;
    }
    const radioVal = "employé";
    var NAS = employeeNas;
    try {
      const u = await api.get("/getUser", {
        params: {
          NAS,
          radioVal,
        },
      });
      if (u.data[0] === undefined) {
        console.log("NAS: ");
        console.log(employeeNas);
        const response = await api.get("/insertEmployee", {
          params: {
            firstName,
            lastName,
            role,
            employeeNas,
            hotel,
          },
        });
        const r = await api.get("/createEmployeeAddress", {
          params: {
            country,
            city,
            streetNum,
            postal,
            employeeNas,
          },
        });
        toast.success("Request Successful!");
      } else {
        toast.error("There already exists an employee with that NAS!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="containerForm">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            className="first"
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            className="last"
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientNas">Employee NAS</label>
          <input
            className="NAS"
            type="number"
            id="clientNas"
            name="clientNas"
            value={employeeNas}
            onChange={(e) => setemployeeNas(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">Employee role:</label>
          <input
            className="email"
            type="text"
            value={role}
            onChange={(e) => setrole(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hotel">Hotel Name:</label>
          <input
            className="email"
            type="text"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Country:</label>
          <input
            className="last"
            type="text"
            id="lastName"
            name="lastName"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">City:</label>
          <input
            className="last"
            type="text"
            id="lastName"
            name="lastName"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Street Number:</label>
          <input
            className="last"
            type="number"
            id="lastName"
            name="lastName"
            value={streetNum}
            onChange={(e) => setStreetNum(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Postal Code:</label>
          <input
            className="last"
            type="text"
            id="lastName"
            name="lastName"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
          />
        </div>
        <div className="submit" onClick={handleClick}>
          Insert
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
export default InsertEmployee;
