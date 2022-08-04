import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Flights = ({user, ticketFinder}) => {



  const [flights, setFlights] = useState([])


  const instance = axios.create({
    method: 'get',
  })
  
  instance.defaults.headers.common['Authorization'] = 'Bearer Rp1QzKHhGT1eCDtVT93P6k5zY2BU'
  
  
  const departIATA = ticketFinder.departureIata;
  const arrivalIATA = ticketFinder.arrivalIata;
  const departDate = ticketFinder.departureDate;
  const returnDate = ticketFinder.returnDate;
  const numAdults = ticketFinder.numberPassengers;
  
  
  
  
  
  const findFlights = () => {
    instance(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departIATA}&destinationLocationCode=${arrivalIATA}&departureDate=${departDate}&returnDate=${returnDate}&adults=${numAdults}&nonStop=false&currencyCode=USD&max=5`)
    .then(res => {
      console.log(res.data)
      setFlights(res.data)
    })
  }

  useEffect(() => {
    findFlights()
  }, [])


  return (
    <div className='bg-white' >
      <h1 className='bg-white' >Check your Console</h1>
      <div className='ml-12'>
        {flights.data?.map(flight => {
          return (<>
            <div>
              <h1>Flight {flight.id}</h1>
              <h3>Total Price: {flight.price.total}</h3><br/>
              <h2>Departure Flight...</h2><br/>
              <h3>Total Flight Time:{flight.itineraries[0].duration}</h3><br/>
              <h3>Depart Time:{flight.itineraries[0].segments[0].departure.at}</h3><br/>
              <h3>Arrival Time:{flight.itineraries[0].segments[0].arrival.at}</h3><br/>
              <h2>Return Flight...</h2><br/>
              <h3>Total Flight Time:{flight.itineraries[1].duration}</h3><br/>
              <h3>Depart Time:{flight.itineraries[1].segments[0].departure.at}</h3><br/>
              <h3>Arrival Time:{flight.itineraries[1].segments[0].arrival.at}</h3><br/>
           </div>
          
          </>)
          
          })}  
      </div> 
      

    </div>
  )
}

export default Flights