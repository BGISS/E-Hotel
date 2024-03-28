import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerSearchPage from "./CustomerSearchPage";
import EmployeePage from "./EmployeePage";
import ReservationsPage from "./ReservationsPage";
import LocationPage from "./LocationPage";
import Login from "./Login";
import DeletePage from "./DeletePage";
import ManageInfoOptions from "./ManageInfoOptions";
import Insert from "./Insert";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="client" element={<CustomerSearchPage />}></Route>
        <Route path="employee" element={<EmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
