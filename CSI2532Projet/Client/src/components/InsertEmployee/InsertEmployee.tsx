import './InsertEmployee.css'
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function InsertEmployee(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeNas, setemployeeNas] = useState(0);
    const [id, setid] = useState("");
    const [hotel, setHotel] = useState("");

    const api = axios.create({
        baseURL: `http://localhost:3000`
    })

    function validateInput(input: any) {
        if (input === null || input === 0 || input === "") {
          return false;
        }
        return true;
      }

    const handleClick = () =>{

        if (
            !validateInput(firstName) ||
            !validateInput(lastName) ||
            !validateInput(employeeNas) ||
            !validateInput(id) ||
            !validateInput(hotel)
          ) {
            toast.error("Fill in the previous inputs before pressing!");
            return;
          }
        try {
            const response = api.get("/insertEmployee",{
                params:{
                    firstName,
                    lastName,
                    id,
                    employeeNas,
                    hotel,
                },
            });
            toast.success("Request Successful!");

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div className='containerForm'>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input className='first'
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input className='last'
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="clientNas">Employee NAS</label>
                <input className='NAS'
                type="number"
                id="clientNas"
                name="clientNas"
                value={employeeNas}
                onChange={(e) => setemployeeNas(parseFloat(e.target.value))}
                />
                </div>
                <div className="form-group">
                    <label htmlFor="id">Employee ID:</label>
                    <input className='email'
                    type="text"
                    value={id}
                    onChange={(e) => setid(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hotel">Hotel Name:</label>
                    <input className='email'
                    type="text"
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                    />
                </div>
                <div className='submit' onClick={handleClick}>
                    Insert
                </div>
          </div>
          <ToastContainer position="top-right" />
        </>
    )
}
export default InsertEmployee;