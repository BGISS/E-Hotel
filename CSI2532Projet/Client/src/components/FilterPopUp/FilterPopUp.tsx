import React, { useState } from "react";
import "./FilterPopUp.css";

function FilterPopUp() {
  //for the buttons to change color when clicked
  const [colorAny, setColorAny] = useState<string>("#FFFFFF");
  const [colorAnyText, setColorAnyText] = useState<string>("#000000");
  const [colorOne, setColorOne] = useState<string>("#FFFFFF");
  const [colorOneText, setColorOneText] = useState<string>("#000000");
  const [colorTwo, setColorTwo] = useState<string>("#FFFFFF");
  const [colorTwoText, setColorTwoText] = useState<string>("#000000");
  const [colorThree, setColorThree] = useState<string>("#FFFFFF");
  const [colorThreeText, setColorThreeText] = useState<string>("#000000");
  const [colorFour, setColorFour] = useState<string>("#FFFFFF");
  const [colorFourText, setColorFourText] = useState<string>("#000000");
  const [colorFive, setColorFive] = useState<string>("#FFFFFF");
  const [colorFiveText, setColorFiveText] = useState<string>("#000000");
  const [c, setC] = useState<string>("#FFFFFF");

  //declaring all the variables needed for the sql requests

  //number of people per room
  const [numberPeople, setNumberPeople] = useState(-1);

  //room size
  const [roomSize, setRoomSize] = useState<number | null>(null);

  //hotel chain
  const [hotelChain, setHotelChain] = useState("");

  //hotel category
  const [category, setCategory] = useState<number | null>(null);

  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setHotelChain(event.target.value);
  };

  const handleClick = (
    setColor: React.Dispatch<React.SetStateAction<string>>,
    setColorText: React.Dispatch<React.SetStateAction<string>>,
    color: string,
    num: number
  ) => {
    setC(color);
    setNumberPeople(num);
    setColorAny("#FFFFFF");
    setColorAnyText("#000000");
    setColorOne("#FFFFFF");
    setColorOneText("#000000");
    setColorTwo("#FFFFFF");
    setColorTwoText("#000000");
    setColorThree("#FFFFFF");
    setColorThreeText("#000000");
    setColorFour("#FFFFFF");
    setColorFourText("#000000");
    setColorFive("#FFFFFF");
    setColorFiveText("#000000");

    if (c == "#FFFFFF") {
      setColor("#000000");
      setColorText("#FFFFFF");
    } else {
      setNumberPeople(-1);
      setColor("#FFFFFF");
      setColorText("#000000");
    }
  };

  return {
    numberPeople,
    roomSize,
    hotelChain,
    category,
    render: (
      <div className="filterContainer">
        <div className="filterNavBar">
          <p className="filter">Filters</p>
        </div>
        <div className="line"></div>
        <p className="Capacity">Room capacity</p>
        <p className="Max">Maximum number of people</p>
        <div className="buttonsContainer">
          <div
            className="Any"
            style={{
              backgroundColor: colorAny,
            }}
            onClick={() =>
              handleClick(setColorAny, setColorAnyText, colorAny, -1)
            }
          >
            <p
              className="anytext"
              style={{
                color: colorAnyText,
              }}
            >
              Any
            </p>
          </div>
          <div
            className="one"
            style={{
              backgroundColor: colorOne,
            }}
            onClick={() =>
              handleClick(setColorOne, setColorOneText, colorOne, 1)
            }
          >
            <p
              className="onetext"
              style={{
                color: colorOneText,
              }}
            >
              1
            </p>
          </div>
          <div
            className="two"
            style={{
              backgroundColor: colorTwo,
            }}
            onClick={() =>
              handleClick(setColorTwo, setColorTwoText, colorTwo, 2)
            }
          >
            <p
              className="twotext"
              style={{
                color: colorTwoText,
              }}
            >
              2
            </p>
          </div>
          <div
            className="three"
            style={{
              backgroundColor: colorThree,
            }}
            onClick={() =>
              handleClick(setColorThree, setColorThreeText, colorThree, 3)
            }
          >
            <p
              className="threetext"
              style={{
                color: colorThreeText,
              }}
            >
              3
            </p>
          </div>
          <div
            className="four"
            style={{
              backgroundColor: colorFour,
            }}
            onClick={() =>
              handleClick(setColorFour, setColorFourText, colorFour, 4)
            }
          >
            <p
              className="fourtext"
              style={{
                color: colorFourText,
              }}
            >
              4
            </p>
          </div>
          <div
            className="five"
            style={{
              backgroundColor: colorFive,
            }}
            onClick={() =>
              handleClick(setColorFive, setColorFiveText, colorFive, 5)
            }
          >
            <p
              className="fivetext"
              style={{
                color: colorFiveText,
              }}
            >
              5+
            </p>
          </div>
        </div>
        <div className="line"></div>
        <p className="Chain">Hotel chain</p>
        <select
          className="dropdown"
          value={hotelChain}
          onChange={handleSelectChange}
        >
          <option value="name">Enter the name of a hotel chain</option>
          <option value="Azure">Azure</option>
          <option value="Tamassa">Tamassa</option>
          <option value="DodoLaLodge">DodoLaLodge</option>
          <option value="Maritim">Maritim</option>
        </select>
        <div className="line"></div>

        <p className="RoomSize">Room size</p>
        <input
          className="size"
          type="number"
          value={roomSize !== null ? roomSize : ""}
          onChange={(e) => setRoomSize(parseFloat(e.target.value))}
          placeholder="Enter the size of the desired room"
        />
        <div className="line"></div>
        <p className="Category">Hotel category</p>
        <input
          className="categoryInput"
          type="text"
          value={category !== null ? category : ""}
          onChange={(e) => setCategory(parseFloat(e.target.value))}
          placeholder="Enter the number of stars"
        />
      </div>
    ),
  };
}
export default FilterPopUp;
