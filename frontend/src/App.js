import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/home";
import Destination from "./components/destination";


const App = () => {
  

  return (
    <div>
     <Home/>
     <Destination/>
    </div>
  );
  
};

export default App;
