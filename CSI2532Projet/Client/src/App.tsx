import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
