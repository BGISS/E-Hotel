import './Insert.css';
import React, { useState } from "react";
import InsertClient from "./components/InsertClient/InsertClient";
import InsertEmployee from "./components/InsertEmployee/InsertEmployee";
import InsertHotel from './components/InsertHotel/InsertHotel';
import InsertHotelChain from './components/InsertHotelChain/InsertHotelChain';
import InsertRoom from './components/InsertRoom/InsertRoom';



function Insert(){

    const [clientscolor, setclientscolor] = useState<string>("#000000");
    const [employeescolor, setemployeescolor] = useState<string>("#000000");
    const [chainscolor, setchainscolor] = useState<string>("#000000");
    const [hotelscolor, sethotelscolor] = useState<string>("#000000");
    const [roomscolor, setroomscolor] = useState<string>("#000000");

    const [clientVisible, setClientVisible] = useState(false);
    const [employeeVisible, setEmployeeVisible] = useState(false);
    const [chainsVisible, setChainsVisible] = useState(false);
    const [hotelsVisible, setHotelsVisible] = useState(false);
    const [roomVisible, setRoomVisible] = useState(false);

    

    const handleClick = (setColor: React.Dispatch<React.SetStateAction<string>>,setVisible: React.Dispatch<React.SetStateAction<boolean>>)=>{
        changeColor(setColor)
        setClientVisible(false)
        setEmployeeVisible(false)
        setChainsVisible(false)
        setHotelsVisible(false)
        setRoomVisible(false)
        setVisible(true)
    }

    const changeColor = (setColor: React.Dispatch<React.SetStateAction<string>>)=>{
        setclientscolor("#000000")
        setchainscolor("#000000")
        sethotelscolor("#000000")
        setemployeescolor("#000000")
        setroomscolor("#000000")
        setColor("#E9CB29")

    }
    
    return(
        <>
            <div className='container'>
                <div className='optionstext'>
                    <div className='Clients'>
                        <p className='clientstext'
                        style={{color:clientscolor}}
                        onClick={() =>
                            handleClick(setclientscolor,setClientVisible)
                          }>Clients</p>
                    </div>
                    <div className='Employees'>
                        <p className='employeestext'
                        style={{color:employeescolor}}
                        onClick={() =>
                            handleClick(setemployeescolor,setEmployeeVisible)
                          }>Employees</p>
                    </div>
                    <div className='chains'>
                        <p className='chainstext'
                        style={{color:chainscolor}}
                        onClick={() =>
                            handleClick(setchainscolor,setChainsVisible)
                          }>Hotel chains</p>
                    </div>
                    <div className='hotels'>
                        <p className='hotelstext'
                        style={{color:hotelscolor}}
                        onClick={() =>
                            handleClick(sethotelscolor,setHotelsVisible)
                          }>Hotels</p>
                    </div>
                    <div className='rooms'>
                        <p className='roomstext'
                        style={{color:roomscolor}}
                        onClick={() =>
                            handleClick(setroomscolor,setRoomVisible)
                          }>Rooms</p>
                    </div>
                </div>
                <div className='Form'>
                    {clientVisible && <InsertClient></InsertClient>}
                    {employeeVisible && <InsertEmployee></InsertEmployee>}
                    {chainsVisible && <InsertHotelChain></InsertHotelChain>}
                    {hotelsVisible && <InsertHotel></InsertHotel>}
                    {roomVisible && <InsertRoom></InsertRoom>}
                    
                </div>
            </div>
        </>
    );
}
export default Insert;