import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutePage from "./components/Route";


const App = () => {
  

  return (
    <div>
       <Router>
      
        <div className="content">
          <RoutePage />
        </div>
       
      </Router>
     
    </div>
  );
  
};

export default App;
