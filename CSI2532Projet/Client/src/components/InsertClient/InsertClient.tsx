import './InsertClient.css'
import React, { useState } from "react";
import axios from "axios";

function InsertClient(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    //const [email, setEmail] = useState("");
    const [nas_client, setClientNas] = useState(0);
    const [date, setRegistration] = useState("");

    const api = axios.create({
        baseURL: `http://localhost:3000`
    })

    const handleClick = () =>{
        try {
            const response = api.get("/createClient",{
                params:{
                    firstName,
                    lastName,
                    //email,
                    nas_client,
                    date,
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
                {/* <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input className='email'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div> */}
                <div className='submit' onClick={handleClick}>
                    Insert
                </div>
          </div>
        </>
    )
}
export default InsertClient;