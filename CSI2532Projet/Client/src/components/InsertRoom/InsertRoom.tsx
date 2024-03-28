import './InsertRoom.css'
import React, { useState } from "react";
import axios from "axios";

function InsertRoom(){
    const [numRoom, setNumRoom] = useState(0);
    const [price, setPrice] = useState(0);
    const [view, setView] = useState("");
    const [superficie, setSuperficie] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [hotel, setHotel] = useState("");

    const api = axios.create({
        baseURL: `http://localhost:3000`
    })

    const handleClick = () =>{
        try {
            const response = api.get("/insertroom",{
                params:{
                    numRoom,
                    price,
                    view,
                    superficie,
                    capacity,
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
                    <label htmlFor="hotel">Hotel Name:</label>
                    <input className='email'
                    type="text"
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numRoom">Room number:</label>
                    <input className='first'
                    type="number"
                    value={numRoom}
                    onChange={(e) => setNumRoom(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Room capacity:</label>
                    <input className='last'
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input className='last'
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="roomsize">Room size: </label>
                <input className='NAS'
                type="number"
                value={superficie}
                onChange={(e) => setSuperficie(parseFloat(e.target.value))}
                />
                </div>
                <div className="form-group">
                    <label htmlFor="id">View:</label>
                    <input className='email'
                    type="text"
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                    />
                </div>
                <div className='submit' onClick={handleClick}>
                    Insert
                </div>
          </div>
        </>
    )
}
export default InsertRoom;