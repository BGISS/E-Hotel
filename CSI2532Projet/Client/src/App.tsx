import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerSearchPage from "./CustomerSearchPage";
import EmployeePage from "./EmployeePage";
import ReservationsPage from "./ReservationsPage";
import LocationPage from "./LocationPage";
import Login from "./Login";
import DeletePage from "./DeletePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DeletePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
