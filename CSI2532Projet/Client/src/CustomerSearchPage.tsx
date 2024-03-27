import "./CustomerSearchPage.css";
import SearchBar from "./components/Searchbar/Searchbar";
import RoomIcon from "./components/RoomIcon/RoomIcon";
import filterIcon from "./assets/filter.png";
import FilterPopUp from "./components/FilterPopUp/FilterPopUp";
import ResortImage from "./assets/searchpageimage.jpeg";
import React, { Key, useState } from "react";

function CustomerSearchPage() {
  interface ChambreData {
    capacité: number;
    nom_hôtel: string;
    num_chambre: number;
    prix: number;
  }
  const [isVisible, setIsVisible] = useState(false);

  const handleClickFilters = () => {
    setIsVisible(true);
  };

  const handleClickX = () => {
    setIsVisible(false);
  };
  const { numberPeople, roomSize, hotelChain, category, render } =
    FilterPopUp();
  const { chambreData, renderRooms } = SearchBar({
    numberPeople,
    roomSize,
    hotelChain,
    category,
  });

  return (
    <>
      <body>
        {isVisible && <div className="popup">{render}</div>}
        {isVisible && (
          <div className="darkenBackground" onClick={handleClickX}></div>
        )}
        <div className="headerEhotel">
          <p className="eHotel">E-Hotel</p>
          <p className="bookingMadeEasy">Booking made easy</p>
        </div>
        <div className="search">{renderRooms}</div>
        <div className="filterDiv">
          <button className="filters" onClick={handleClickFilters}>
            <img className="filterIcon" src={filterIcon}></img>
            <p className="filterText">Filters</p>
          </button>
        </div>
        <div className="img-container"></div>
        <div className="transparent-film"></div>
        <div className="login-container"></div>

        <div className="roomCardsContainer">
          {chambreData &&
            chambreData.map(
              (
                chambre: {
                  capacité: number;
                  nom_hôtel: string;
                  num_chambre: number;
                  prix: number;
                },
                index: Key | null | undefined
              ) => (
                <RoomIcon
                  key={index}
                  image={ResortImage}
                  hotelName={chambre.nom_hôtel}
                  roomNumber={chambre.num_chambre}
                  price={chambre.prix}
                  numberPeople={chambre.capacité}
                ></RoomIcon>
              )
            )}
        </div>
      </body>
    </>
  );
}
export default CustomerSearchPage;
