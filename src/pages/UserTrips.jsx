import React from "react";
import { useNavigate } from 'react-router-dom'
import Trip from "../components/Trip";
const UserTrips = ({ alltrips, updateState, updateFavorite }) => {

  const navigate = useNavigate()

  const token = localStorage.getItem('traveltoken')
  if(token === null || token === undefined){
    navigate('/login')
  }

  return (
    <div className="h-screen userTripsBG">
    <div className=" ">
      <>
        <Trip
          alltrips={alltrips}
          updateState={updateState}
          updateFavorite={updateFavorite}
        />
      </>
    </div>
    </div>
  );
};

export default UserTrips;
