
import React, { useState } from "react";

import { Link } from 'react-router-dom';
import Trip from "./Trip";

const FavoriteTrips = ({favoriteState, alltrips, updateFavorite}) => {



return (
    <div>
      {alltrips?.map((trip) => {
        return (
        <>



              {trip?.favorite && (<>
              
              <div className="tripTitle font-medium items-center">{trip?.name}</div>
              <div className="cities font-medium"> {trip?.departureCity} - {trip?.arrivalCity} </div>
              <div  className="dates font-medium" >{trip?.departureDate} - {trip?.returnDate}  </div>
              <div className="dates font-medium" > {trip?.flightId} - {trip?.airlineType}  </div>
              
          </>
              
          
              ) }
        </>
         )
      })}
      
      </div>
      )   
    }
export default FavoriteTrips