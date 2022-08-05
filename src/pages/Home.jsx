import React from "react";
import Trip from "../components/Trip";
import { Link } from "react-router-dom";
import ExplainPage from "../components/ExplainPage";
import FavoriteTrips from "../components/FavoriteTrips";
import Heart from "../../src/images/icons/hearts/heart.jpg";
const Home = ({ UserTrips, user}) => {




  return (


    
    <div className="flex flex-wrap gap-10 items-center justify-center  min-h-screen">
    
      <ExplainPage user={user} />
        <div className="h-full w-full flex items-center justify-center ">
        
              <FavoriteTrips className="flex flex-wrap border-radius: 6px" UserTrips = {UserTrips}/>
        </div>
    </div>
  );
};

export default Home;
