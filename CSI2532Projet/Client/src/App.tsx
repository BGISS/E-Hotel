import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerSearchPage from "./CustomerSearchPage";
import EmployeePage from "./EmployeePage";
import ReservationsPage from "./ReservationsPage";
import LocationPage from "./LocationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerSearchPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
