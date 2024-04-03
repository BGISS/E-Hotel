import "./CustomerSearchPage.css";
import SearchBar from "./components/Searchbar/Searchbar";
import RoomIcon from "./components/RoomIcon/RoomIcon";
import filterIcon from "./assets/filter.png";
import FilterPopUp from "./components/FilterPopUp/FilterPopUp";
import ReservePopUp from "./components/ReserveRoomPopUp/ReserveRoomPopUp";
import ResortImage from "./assets/searchpageimage.jpeg";
import { Key, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CustomerSearchPage() {
  interface ChambreData {
    capacité: number;
    nom_hôtel: string;
    num_chambre: number;
    prix: number;
  }
  const [isVisible, setIsVisible] = useState(false);
  const [ReserveVisible, setReserveIsVisible] = useState(false);
  const [nom_hôtel, setNom] = useState("");
  const [num_chambre, setNum] = useState(0);
  const [prix, setPrix] = useState(0);
  const [capacité, setCap] = useState(0);

  const handleClickFilters = () => {
    setIsVisible(true);
  };

  const handleClickX = () => {
    setIsVisible(false);
  };
  const handleClickY = () => {
    setIsVisible(false);
    setReserveIsVisible(false);
  };
  const { numberPeople, roomSize, hotelChain, category, render } =
    FilterPopUp();
  const { chambreData, checkInDate, checkOutDate, renderRooms } = SearchBar({
    numberPeople,
    roomSize,
    hotelChain,
    category,
  });

  const handleRoomReserve = (
    nom_hôtel: string,
    num_chambre: number,
    prix: number,
    capacité: number
  ) => {
    setReserveIsVisible(true);
    document.body.classList.toggle("no-scroll");
    setCap(capacité);
    setNom(nom_hôtel);
    setNum(num_chambre);
    setPrix(prix);
  };

  return (
    <>
      <body>
        <Link to="/view-page">
          <button className="view-button"> See Views</button>
        </Link>
        {ReserveVisible && (
          <div className="popupreserve">
            <ReservePopUp
              nom_hôtel={nom_hôtel}
              num_chambre={num_chambre}
              prix={prix}
              capacité={capacité}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            ></ReservePopUp>
          </div>
        )}
        {ReserveVisible && (
          <div className="darkenBackground" onClick={handleClickY}></div>
        )}
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
                <div
                  className="roomCardClick"
                  onClick={() =>
                    handleRoomReserve(
                      chambre.nom_hôtel,
                      chambre.num_chambre,
                      chambre.prix,
                      chambre.capacité
                    )
                  }
                >
                  <RoomIcon
                    key={index}
                    image={ResortImage}
                    hotelName={chambre.nom_hôtel}
                    roomNumber={chambre.num_chambre}
                    price={chambre.prix}
                    numberPeople={chambre.capacité}
                  ></RoomIcon>
                </div>
              )
            )}
        </div>
      </body>
    </>
  );
}
export default CustomerSearchPage;
