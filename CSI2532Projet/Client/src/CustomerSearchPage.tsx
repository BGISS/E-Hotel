import "./CustomerSearchPage.css";
import SearchBar from "./components/Searchbar/Searchbar";
import RoomIcon from "./components/RoomIcon/RoomIcon";
import filterIcon from "./assets/filter.png";


function CustomerSearchPage(){
    return (
        <>
          <body>
            <div className="headerEhotel">
                <p className="eHotel">E-Hotel</p>
                <p className="bookingMadeEasy">Booking made easy</p>
            </div>
            <div className="search">
              <SearchBar></SearchBar>
            </div>
            <button className="filters">
              <img src={filterIcon}></img>
              <p>Filters</p>
            </button>
            <div className="img-container"></div>
            <div className="transparent-film"></div>
            <div className="login-container"></div>
            <RoomIcon
            image="data:image/jpeg;base64,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"
            hotelName="Azure Resort"
            roomNumber={Number(29)}
            price={Number(145)}
            numberPeople={Number(2)}
            ></RoomIcon>
          </body>
        </>
      );
}
export default CustomerSearchPage;