import "./Login.css";
import RowRadioGroup from "./components/RowRadioGroup/RowRadioGroup"
import hotel from "./assets/hotel.jpg"
import arrow from "./assets/maki_arrow.png"
import { createTheme, ThemeProvider } from '@mui/material';
import { TextField } from '@mui/material'
import { useState} from 'react' 
import { ClassNames } from "@emotion/react";


const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
},});

function Login() {
  const [fieldValue, setfieldValue] = useState('') 

  return (
    <>
      <div className="page">
        <div className="img-container">
          <img src= {hotel} alt="hotel by seaside" className ="img"/>
        </div>
        <div className="login-container">
          <p className="login-text">Log In</p>
          <div className="radiogroup">
            <ThemeProvider theme={theme}>
              <RowRadioGroup></RowRadioGroup>
            </ThemeProvider>
          </div>
          <p className="enter-NAS">Enter your NAS</p>
          <div className="button-field-container">
              <TextField id="NAS-input" label="NAS" variant="outlined" onChange={(e) => setfieldValue(e.target.value)}/>
            <button className="go-button"><img src={arrow} alt="my image" onClick = {() => console.log(fieldValue)} className="arrow"/></button>
          </div>
        </div>
      </div>
    </>
  );
}



export default Login;
