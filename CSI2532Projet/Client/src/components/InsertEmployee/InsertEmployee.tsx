import './InsertEmployee.css'
import React, { useState } from "react";
import axios from "axios";

function InsertEmployee(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeNas, setemployeeNas] = useState(0);
    const [id, setid] = useState("");
    const [hotel, setHotel] = useState("");

    const api = axios.create({
        baseURL: `http://localhost:3000`
    })

    const handleClick = () =>{
        try {
            const response = api.get("/insertemployee",{
                params:{
                    firstName,
                    lastName,
                    id,
                    employeeNas,
                    hotel,
                },
            });
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
        </>
    )
}
export default InsertEmployee;