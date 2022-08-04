import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Flights = ({user, ticketFinder, flightToken}) => {
  
  
  
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  
  
  
  const instance = axios.create({
    method: 'get',
  })
  instance.defaults.headers.common['Authorization'] = `Bearer ${flightToken}`
  
  const departIATA = ticketFinder.departureIata;
  const arrivalIATA = ticketFinder.arrivalIata;
  const departDate = ticketFinder.departureDate;
  const returnDate = ticketFinder.returnDate;
  const numAdults = ticketFinder.numberPassengers;
    
  
  const findFlights = () => {
      instance(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departIATA}&destinationLocationCode=${arrivalIATA}&departureDate=${departDate}&returnDate=${returnDate}&adults=${numAdults}&nonStop=true&currencyCode=USD&max=5`)
      .then(res => {
        console.log(res.data)
        setFlights(res.data)
        setIsLoading(false)
      })
    
  }

  useEffect(() => {
    setIsLoading(true)
    findFlights()
    
  }, [])

  const usertoken = localStorage.getItem('traveltoken');
  const saveInstance = axios.create({
    headers: {
      'Authorization': usertoken
    }
  })

  const handleSave = (flightid) => {
    saveInstance.put(`http://localhost:3020/trips/${ticketFinder._id}`, )
  }


  return (
    <div className='bg-white h-full bg-opacity-30' >
      <h1 className='bg-white text-center' >{isLoading && 'Loading...'}</h1>
      <div className=''>
        {flights.data?.map(flight => {
          return (<>
            <div className='bg-slate-500 text-center m-12 mx-32 rounded-lg'>
              <h1 className='text-4xl m-6'><u>Flight {flight.id}</u></h1>
              <h3>Total Price: {flight.price.total}</h3><br/>
              <h2>Departure Flight...</h2><br/>
              <h3>Total Flight Time:{flight.itineraries[0].duration}</h3><br/>
              <h3>Depart Time:{flight.itineraries[0].segments[0].departure.at}</h3><br/>
              <h3>Arrival Time:{flight.itineraries[0].segments[0].arrival.at}</h3><br/>
              <h2>Return Flight...</h2><br/>
              <h3>Total Flight Time:{flight.itineraries[1].duration}</h3><br/>
              <h3>Depart Time:{flight.itineraries[1].segments[0].departure.at}</h3><br/>
              <h3>Arrival Time:{flight.itineraries[1].segments[0].arrival.at}</h3><br/>
              <div>
                <button className='bg-white rounded m-4'>Select Flight</button>
              </div>
           </div>
          
          </>)
          
          })}  
      </div> 
      

    </div>
  )
}

export default Flights