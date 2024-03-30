import './RoomCapacityCard.css'
import React, { useState } from "react";
import axios from "axios";

interface CapacitycardParams{
    roomNum: number;
    peopleNum: number;
}

function RoomCapacityCard(
    {roomNum,peopleNum,}:CapacitycardParams
){
    return(
        <>
            <div className='roomcapacitycard'>
                <p className='roomNum'>Room {roomNum}</p>
                <p className='peopleNum'>{peopleNum} people</p>
            </div>
        </>
    );
}

export default RoomCapacityCard;