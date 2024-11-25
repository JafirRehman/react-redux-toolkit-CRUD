import React from "react";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Displayusers from "./components/Displayusers";
import { Update } from "./components/Update";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route exact path="/showallusers" element={<Displayusers />} />
          <Route exact path="/updateuser/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
