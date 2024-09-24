import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Destination from "../pages/destination";



const RoutePage = () => {
    return (
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/destination" exact element={<Destination/>} />


      </Routes>
    );
  };
  export default RoutePage;