import { Link } from "react-router-dom";

interface RoomIconParam {
    image: string;
    hotelName:string;
    roomNumber: string;
    price: number;
    numberPeople:number;
  }

function RoomIcon({image,hotelName,roomNumber,price,numberPeople}:RoomIconParam){
    return (
        <Link to="/roomPage">
            <div className="icon">
                <img className="roomImage" src={image}/>
                <div className="text">
                    <p className="hotelName">{hotelName}</p>
                    <p className="roomNumber">{roomNumber}</p>
                    <p className="price">{price}</p>
                    <p className="numberPeople">{numberPeople}</p>
                </div>
            </div>
        </Link>
    );
}
