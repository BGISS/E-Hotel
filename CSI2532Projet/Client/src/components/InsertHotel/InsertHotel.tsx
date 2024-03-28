import { useState } from "react";
import "./InsertHotel.css"
import axios from "axios";

function InsertHotel(){
    const [hotelChain, setHotelChain] = useState("");
    const [numStars, setNumStars] = useState(0);
    const [numTel, setNumTel] = useState(0);
    const [email, setEmail] = useState("");
    const [hotel, setHotel] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [streetNum, setStreetNum] = useState(0);
    
    const api = axios.create({
        baseURL: `http://localhost:3000`
    })

    const handleClick = () =>{
        try {
            const response = api.get("/inserthotel",{
                params:{
                    hotel,
                    hotelChain,
                    email,
                    numStars,
                    numTel,
                    city,
                    postal,
                    streetNum,
                    country,
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
                    <label htmlFor="lastName">Hotel Chain:</label>
                    <input className='last'
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={hotelChain}
                    onChange={(e) => setHotelChain(e.target.value)}
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
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input className='email'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Number of Stars:</label>
                    <input className='first'
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={numStars}
                    onChange={(e) => setNumStars(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Telephone Number:</label>
                    <input className='first'
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={numTel}
                    onChange={(e) => setNumTel(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Country:</label>
                    <input className='last'
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">City:</label>
                    <input className='last'
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={city}
                    onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Street Number:</label>
                    <input className='last'
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={streetNum}
                    onChange={(e) => setStreetNum(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Postal Code:</label>
                    <input className='last'
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    />
                </div>
                <div className='submit'  onClick={handleClick}>
                    Insert
                </div>
          </div>
        </>
    )
}
export default InsertHotel