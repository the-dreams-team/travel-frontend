import React from "react";
import Trip from "../components/Trip";
import { Link } from "react-router-dom";
import ExplainPage from "../components/ExplainPage";
import FavoriteTrips from "../components/FavoriteTrips";
import Heart from "../../src/images/icons/hearts/heart.jpg";
const Home = ({ UserTrips}) => {




  return (


    
    <div className="flex flex-wrap  gap-10 items-center justify-center  min-h-screen">
    
      <ExplainPage/>
      <FavoriteTrips className="flex flex-row flex-column flex-column-sm" UserTrips = {UserTrips}/>

    

      
    </div>
  );
};

export default Home;
