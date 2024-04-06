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
import UpdatePage from "./UpdatePage";
import Views from "./Views";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="client" element={<CustomerSearchPage />}></Route>
        <Route path="employee" element={<EmployeePage />} />
        <Route path="reservation" element={<ReservationsPage />} />
        <Route path="leasing" element={<LocationPage />} />
        <Route path="admin" element={<ManageInfoOptions />} />
        <Route path="delete-info" element={<DeletePage />} />
        <Route path="update-info" element={<UpdatePage />} />
        <Route path="insert-info" element={<Insert />} />
        <Route path="view-page" element={<Views />} />
      </Routes>
    </Router>
  );
}

export default App;
