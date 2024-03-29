import './InsertClient.css'
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


function InsertClient(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nas_client, setClientNas] = useState(0);
    const [date, setRegistration] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [streetNum, setStreetNum] = useState(0);
  

    function validateInput(input: any) {
        if (input === null || input === 0 || input === "") {
          return false;
        }
        return true;
      }

    const api = axios.create({
        baseURL: `http://localhost:3000`
    })

    const handleClick = () =>{
        if (
            !validateInput(firstName) ||
            !validateInput(lastName) ||
            !validateInput(nas_client) ||
            !validateInput(date) ||
            !validateInput(country) ||
            !validateInput(city) ||
            !validateInput(postal) ||
            !validateInput(streetNum) 
          ) {
            toast.error("Fill in the previous inputs before pressing!");
            return;
          }
        try {
            const response = api.get("/createClient",{
                params:{
                    firstName,
                    lastName,
                    nas_client,
                    date,
                },
            });
            const r = api.get("/createClientAddress",{
                params:{
                    country,
                    city,
                    streetNum,
                    postal,
                    nas_client,
                },
            });
            toast.success("Request Successful!");
        } catch (error) {
            console.log(error);
        }
        try {
            
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
                    <label htmlFor="date">Date:</label>
                    <input className='dateInput'
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setRegistration(e.target.value)}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="clientNas">Client NAS:</label>
                <input className='NAS'
                type="number"
                id="clientNas"
                name="clientNas"
                value={nas_client}
                onChange={(e) => setClientNas(parseFloat(e.target.value))}
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
                <div className='submit' onClick={handleClick}>
                    Insert
                </div>
          </div>
          <ToastContainer position="top-right" />
        </>
    )
}
export default InsertClient;