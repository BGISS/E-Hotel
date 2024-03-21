import { Link } from "react-router-dom";
import "./RoomIcon.css";
import personIcon from "../../assets/Person.png";

interface RoomIconParam {
    image: string;
    hotelName:string;
    roomNumber: number;
    price: number;
    numberPeople:number;
  }

function RoomIcon({image,hotelName,roomNumber,price,numberPeople}:RoomIconParam){
    return (
        
            <div className="icon">
                <img className="roomImage" src={image} />
                <div className="text">
                    <p className="hotelName">{hotelName}</p>
                    <p className="roomNumber">{"Room "+roomNumber}</p>
                    <p className="price">{"$"+price}</p>
                    <div className="people">
                        <p className="numberPeople">{numberPeople}</p>
                        <img className="personIcon" src={personIcon}></img>
                    </div>
                </div>
            </div>

    );
}
export default RoomIcon;

