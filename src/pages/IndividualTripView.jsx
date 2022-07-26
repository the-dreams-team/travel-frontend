
import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const IndividualTripView = ({ trip }) => {

    const { id } = useParams()
    const [trips, setTrips] = useState()

    console.log(id);
    
    useEffect(() => {
        fetch(`http://localhost:3020/trips/${id}`)
        .then(res => res.json(trips))
        .then(trip => {
            console.log(trip);
            setTrips(trip)
    }
        )
        
    }, [])
    
    
    return (
        
        <div className="mt-6 flex items-center flex-col container mx-auto columns-3 bg-slate-100 w-80 h-auto">
            <h1> {trips?.tripName}  </h1>
            <p>  {trips?.date}  </p>
            <p>  {trips?.dateArrival}    </p>
            <p>  {trips?.departureCity}  </p>
            <p>  {trips?.arrivalCity}       </p>
            <p>  {trips?.ticketPrice}             </p>
            <p>  {trips?.numberPassengers} </p>
            <p>  {trips?.airlineType} </p>
            <p>  {trips?.flightId} </p> 
        </div>
  )
  
}

export default IndividualTripView

