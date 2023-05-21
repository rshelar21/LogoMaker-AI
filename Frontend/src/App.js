import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import FetchWords from "./pages/FetchWords";
import GenerateImages from "./pages/GenerateImages";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<FetchWords />} />
          <Route path="/generate-images" element={<GenerateImages />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
