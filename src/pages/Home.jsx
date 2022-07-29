import React from "react";
import Trip from "../components/Trip";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import ExplainPage from "../components/ExplainPage";
import FavoriteTrips from "../components/FavoriteTrips";
const Home = ({ alltrips, updateState }) => {

console.log(updateState)


  return (








    
    <div className="flex flex-wrap items-center min-h-screen">
    
      <ExplainPage/>

      <FavoriteTrips/>
    

      
    </div>
  );
};

export default Home;
