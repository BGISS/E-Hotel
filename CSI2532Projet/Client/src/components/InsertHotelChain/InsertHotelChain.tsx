import { useState } from "react";
import './InsertHotelChain.css'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


function InsertHotelChain(){
    const [hotelChain, setHotelChain] = useState("");
    const [numHotels, setNumStars] = useState(0);
    const [numTel, setNumTel] = useState(0);
    const [email, setEmail] = useState("");
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
            !validateInput(hotelChain) ||
            !validateInput(numHotels) ||
            !validateInput(numTel) ||
            !validateInput(email) ||
            !validateInput(country) ||
            !validateInput(city) ||
            !validateInput(postal) ||
            !validateInput(streetNum) 
          ) {
            toast.error("Fill in the previous inputs before pressing!");
            return;
          }

        try {
            const response = api.get("/insertHotelChain",{
                params:{
                    hotelChain,
                    numHotels,
                    email,
                    country,
                    city,
                    postal,
                    streetNum,
                    numTel,
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
                    type="number"
                    value={numHotels}
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
                    onChange={(e) => setCity(e.target.value)}
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
                <div className='submit' onClick={handleClick}>
                    Insert
                </div>
          </div>
          <ToastContainer position="top-right" />

        </>
    )
}
export default InsertHotelChain;