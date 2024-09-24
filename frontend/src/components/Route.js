import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import MyFlights from "../pages/MyFlights"



const RoutePage = () => {
    return (
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/myflights" exact element={<MyFlights/>} />


      </Routes>
    );
  };
  export default RoutePage;