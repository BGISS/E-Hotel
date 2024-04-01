import "./Login.css";
import RowRadioGroup from "./components/RowRadioGroup/RowRadioGroup";
import hotel from "./assets/hotel.jpg";
import { createTheme, ThemeProvider } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

function Login() {
  const [NAS, setNAS] = useState("");
  const [radioVal, setRadioVal] = useState("Employee");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });

  const handleClick = async () => {
    try {
      const response = await api.get(
        `/getUser?NAS=${NAS}&radioVal=${radioVal}`
      );
      console.log("dc", response.data[0]);
      if (response.data[0] === undefined) {
        console.log("err");
        setError(
          "Check whether employee or client has been correctly selected. Check whether NAS has been properly entered."
        );
        setIsLoggedIn(false);
      } else {
        setError("");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="page">
        <div className="img-container">
          <img src={hotel} alt="hotel by seaside" className="img" />
        </div>
        <div className="login-container">
          <p className="login-text">Log In</p>
          <div className="radiogroup">
            <ThemeProvider theme={theme}>
              <RowRadioGroup
                getValue={(radioVal) => setRadioVal(radioVal)}
                setLoggedIn={setIsLoggedIn}
                setError={setError}
              ></RowRadioGroup>
            </ThemeProvider>
          </div>
          <p className="enter-NAS">Enter your NAS</p>
          <div className="button-field-container">
            <TextField
              id="NAS-input"
              label="NAS"
              variant="outlined"
              onChange={(e) => setNAS(e.target.value)}
            />
            {!isLoggedIn && (
              <button className="go-button" onClick={handleClick}>
                Validate
              </button>
            )}
            <p className="error-text">{error}</p>
          </div>
          {isLoggedIn && radioVal === "Client" && (
            <Link to="client">
              <button className="client-btn">Go</button>
            </Link>
          )}
          {isLoggedIn && radioVal === "Employee" && (
            <Link to="employee">
              <button className="emp-btn">Go</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
