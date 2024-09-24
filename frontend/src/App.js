import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutePage from "./components/Route";
import Navbar from "./components/Navbar";


const App = () => {
  

  return (
    <div>
       <Router>
        <Navbar/>
        <div className="content">
          <RoutePage />
        </div>
       
      </Router>
     
    </div>
  );
  
};

export default App;
