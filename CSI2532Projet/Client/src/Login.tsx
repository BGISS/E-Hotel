import "./Login.css";
import RowRadioGroup from "./components/RowRadioGroup/RowRadioGroup"
import hotel from "./assets/hotel.jpg"
import arrow from "./assets/maki_arrow.png"
import { createTheme, ThemeProvider } from '@mui/material';
import { TextField } from '@mui/material'
import { useState} from 'react' 
import axios from "axios";



const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
},});

interface ApiResponse{
  rowCount: number;
}

function Login() {
  const [NAS, setNAS] = useState('') 
  const [radioVal, setRadioVal] = useState('')
  const [backendData, setBackendData] = useState<ApiResponse | null>(null)

  const api = axios.create({
    baseURL: `http://localhost:3000`
  })
  const fetchUsers = async () => {
    try {
      const response = await api.get(`/getUser?NAS=${NAS}&radioVal=${radioVal}`)
      console.log(response.data)
      setBackendData(response.data)
      if(backendData?.rowCount == 0){
        console.log("Check whether Employee or Client has been correctly selected. Check whether NAS has been correctly entered.")
      }
      else{
        console.log(`Received ${backendData?.rowCount}`)
      }

    } catch (error) {
      console.error(error)
    }
    console.log(backendData?.rowCount)
  };


  const handleClick = () => {
    fetchUsers()
    console.log(backendData?.rowCount)
  }

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
              <RowRadioGroup getValue = {radioVal => setRadioVal(radioVal)}></RowRadioGroup>
            </ThemeProvider>
          </div>
          <p className="enter-NAS">Enter your NAS</p>
          <div className="button-field-container">
            <TextField id="NAS-input" label="NAS" variant="outlined" onChange={(e) => setNAS(e.target.value)}/>
            <button className="go-button"><img src={arrow} alt="my image" onClick = {handleClick} className="arrow"/></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
