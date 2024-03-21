import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import CustomerSearchPage from "./CustomerSearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<CustomerSearchPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
