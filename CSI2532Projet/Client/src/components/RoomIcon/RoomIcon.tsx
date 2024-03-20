interface RoomIconParam {
    image: string;
    hotelName:string;
    roomNumber: string;
    price: number;
    numberPeople:number;
  }

function RoomIcon({image,hotelName,roomNumber,price,numberPeople}:RoomIconParam){
    return (
        <div className="icon" onClick={()=>handleClick()}>
            <img className="roomImage" src={image}/>
        
            <div className="text">
                <p className="hotelName">{hotelName}</p>
                <p className="roomNumber">{roomNumber}</p>
                <p className="price">{price}</p>
                <p className="numberPeople">{numberPeople}</p>
            </div>
        </div>
    );
}
