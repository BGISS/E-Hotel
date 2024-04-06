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
  const [radioVal, setRadioVal] = useState("employé");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [text, setText] = useState("Enter your NAS");

  const api = axios.create({
    baseURL: `http://localhost:3000`,
  });

  const handleClick = async () => {
    if (radioVal === "Admin") {
      if (NAS === "adminpassword") {
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Check whether password has been correctly entered.");
      }
    } else {
      try {
        const response = await api.get(
          `/getUser?NAS=${NAS}&radioVal=${radioVal}`
        );
        console.log("dc", response.data[0]);
        if (response.data[0] === undefined) {
          console.log("err");
          setError(
            "Check whether employee, client or admin has been correctly selected. Check whether NAS or password has been properly entered."
          );
          setIsLoggedIn(false);
        } else {
          setError("");
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
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
                getValue={setRadioVal}
                setLoggedIn={setIsLoggedIn}
                setError={setError}
                setText={setText}
              ></RowRadioGroup>
            </ThemeProvider>
          </div>
          <p className="enter-NAS">{text}</p>
          <div className="button-field-container">
            <TextField
              id="NAS-input"
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
          {isLoggedIn && radioVal === "employé" && (
            <Link to="employee">
              <button className="emp-btn">Go</button>
            </Link>
          )}
          {isLoggedIn && radioVal === "Admin" && (
            <Link to="admin">
              <button className="admin-btn">Go</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
