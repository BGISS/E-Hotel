import "./Login.css";
import hotel from "./assets/hotel.jpg"

function Login() {
  return (
    <>
      <div className="page">
        <div className="img-container">
          <img src= {hotel} alt="hotel by seaside" className ="img"/>
        </div>
        <div className="login-container">
          <p className="login-text">Log In</p>
          <div className="radio-group">
          

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
