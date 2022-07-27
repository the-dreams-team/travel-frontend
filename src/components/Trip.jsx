import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Trip = ({ alltrips, updateState })=> {
  console.log(alltrips);

  const deleteTrip = (id) => {
    axios.delete(`http://localhost:3020/trips/${id}`)
    .then((res) => {
      console.log(res);
      updateState(id);
    });
  };
  


  return (
    <div>
      {alltrips.map((trip) => {
        return (
          <>
            <div className="mt-6 flex items-center flex-col container mx-auto columns-3 bg-slate-100 w-80 h-auto">
              <div>
                  <div>
                  <button onClick={()=> deleteTrip(trip._id)}
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent
                    text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    X
                  </button>
                  </div>
                <h2>TripName</h2>
                <div className="tripTitle font-medium items-center"> {trip.tripName} </div>
              </div>

              <div>
                <h3>TripItinerary</h3>
                <div>
                  <div className="cities font-medium">
                    {trip.departureCity} - {trip.arrivalCity}
                  </div>
                  <div className="dates font-medium">
                    {trip.departureDate} - {trip.returnDate}
                  </div>

                  <div className="dates font-medium">
                    {trip.flightId} - {trip.airlineType}
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent 
                    text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                  <Link to={`/trip/${trip._id}`} ><button>Show More</button></Link>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Trip;
