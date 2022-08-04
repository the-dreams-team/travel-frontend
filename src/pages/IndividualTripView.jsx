import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PencilIcon as PencilIconSolid } from "@heroicons/react/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const IndividualTripView = ({ trip }) => {
  let navigate = useNavigate();

const initialState = {
    tripName: trip?.tripName
}
  const { id } = useParams();
  const [trips, setTrips] = useState(false);
  const [update, setUpdate] = useState(false)

  const [tripName, setTripName] = useState(initialState);

  const handleChange = (e) => {
    setTripName({...tripName, [e.target.id]: e.target.value})
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3020/trips/${id}`, tripName).then((res) => {
      navigate("/");
    });
  };

  useEffect(() => {
    fetch(`http://localhost:3020/trips/${id}`)
      .then((res) => res.json(trips))
      .then((trip) => {
        console.log(trip);
        setTrips(trip);
      });
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="mt-6 flex items-center flex-col container mx-auto columns-3 bg-slate-100 w-80 h-auto rounded-md p-4">
        <h1> {trips?.tripName} </h1>
        <p> {trips?.date} </p>
        <p> {trips?.dateArrival} </p>
        <p> {trips?.departureCity} </p>
        <p> {trips?.arrivalCity} </p>
        <p> {trips?.ticketPrice} </p>
        <p> {trips?.numberPassengers} </p>
        <p> {trips?.airlineType} </p>
        <p> {trips?.flightId} </p>
        <div className="p-2">
        <button
          type="button"
          onClick={() => setUpdate(!update)}
          className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm
           text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-indigo-500"
        >
          <PencilIconSolid className="h-6 w-6" aria-hidden="true" />
        </button>
        </div>
      </div>
      <div className="w-full flex justify-center ">
      <div className="w-fit bg-gray-700 ">
      <div className=" text-center object-center p-2  ">
        {update && <form onSubmit={handleSubmit}><input className="p-2 rounded " type='text' placeholder={trips?.tripName} id='tripName' onChange={handleChange} /> <button
        type="button submit"
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-white shadow-sm text-sm font-medium rounded-md  bg-indigo-500 hover:bg-yellow-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update Trip Name
           </button></form>}
      </div>
    </div>
    </div>
    </div>
  );
};

export default IndividualTripView;
