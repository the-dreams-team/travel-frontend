import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaPlaneArrival }  from 'react-icons/fa'
import { FaPlaneDeparture } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

const Flights = ({user, ticketFinder, flightToken}) => {
  
  const navigate = useNavigate()
  
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  
  
  //creates the axios instance with the authorization token from amadeus
  const instance = axios.create({
    method: 'get',
  })
  instance.defaults.headers.common['Authorization'] = `Bearer ${flightToken}`
  

  // adds the users inputed trip data into the url to find related flights
  const departIATA = ticketFinder.departureIata;
  const arrivalIATA = ticketFinder.arrivalIata;
  const departDate = ticketFinder.departureDate;
  const returnDate = ticketFinder.returnDate;
  const numAdults = ticketFinder.numberPassengers;
  
  // changes the users input into urlsearchparams so it is compatible with the amadeus api endpoint
  
  const tripInfo = {
    "currencyCode": "USD",
    "originDestinations": [
      {
        "id": "1",
        "originLocationCode": `${departIATA}`,
        "destinationLocationCode": `${arrivalIATA}`,
        "originRadius": "100",
        "destinationRadius": "100",
        "departureDateTimeRange": {
          "date": `${departDate}`,
          "time": "02:00:00"
        }
      },
      {
        "id": "2",
        "originLocationCode": `${arrivalIATA}`,
        "destinationLocationCode": `${departIATA}`,
        "originRadius": "100",
        "destinationRadius": "100",
        "departureDateTimeRange": {
          "date": `${returnDate}`,
          "time": "02:00:00"
        }
      }
    ],
    "travelers": [
      {
        "id": "1",
        "travelerType": "ADULT"
      }
    ],
    "sources": [
      "GDS"
    ],
    "searchCriteria": {
      "maxFlightOffers": 5,
      "flightFilters": {
        
      }
    }
  }

  const options = {
    method: 'POST',
    data: tripInfo,
    url: 'https://test.api.amadeus.com/v2/shopping/flight-offers'
  }



  // this is requesting the flights specific to what the user inputed in the create new trip page
  const findFlights = () => {
      instance(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departIATA}&destinationLocationCode=${arrivalIATA}&departureDate=${departDate}&returnDate=${returnDate}&adults=${numAdults}&nonStop=true&currencyCode=USD&max=5`)
      .then(res => {
        console.log(res.data)
        setFlights(res.data)
        setIsLoading(false)
      })
    
  }


  // this is requesting the flights specific to what the user inputed in the create new trip page
  const findTickets2 = () => {

    instance(options)
    .then(res => {
      console.log(res.data)
      setFlights(res.data)
      setIsLoading(false)
    })



  }


  useEffect(() => {
    setIsLoading(true)
    //findFlights()
    findTickets2()
    
  }, [])

  const usertoken = localStorage.getItem('traveltoken');
  const saveInstance = axios.create({
    headers: {
      'Authorization': usertoken
    }
  })

  const handleSave = (flightid) => {
    
    saveInstance.put(`https://trip-commander-back.herokuapp.com/trips/${ticketFinder._id}`, { flightObj: flightid}  )
    .then(res => console.log(res.data))
    navigate('/')
  }


  return (
    <div className=' h-full  bg-opacity-100 ' >
      <h1 className='bg-red-400 text-center' >{isLoading && 'Loading...'}</h1>
      <div className=' w-full flex justify-center items-center content-center object-center'>
       <div className=' w-12/12 flex flex-wrap justify-center items-center content-center object-center '>
        {flights.data?.map(flight => {
          return (<>
          
            <div className='bg-white bg-opacity-90 text-center m-4 rounded-lg w-5/12 p-2'>
              <h1 className='text-4xl m-6'><u>Flight {flight.id}</u></h1>
              <div className='flex justify-center'>
                <p>{flight.itineraries[0].segments[0].departure.iataCode}</p>-<p>{flight.itineraries[1].segments[0].departure.iataCode}</p>
              </div>
              <h3>Total Price: 💰{flight.price.total}</h3><br/>
              {/* depart flight */}
              <h2 className=  'flex px-6 py-2.5 bg-red-400 w-full text-white justify-center' >  <FaPlaneDeparture className='scale-150' /> </h2>
              <h3 className = 'inline-block px-6 py-2.5 bg-blue-300 w-full text-white' > Total Flight Time: {flight.itineraries[0].duration}</h3>
              {flight.itineraries[0].segments.length > 1 ? <div><h3 className = 'inline-block px-6 py-2.5 bg-blue-500 w-full text-white' >{flight.itineraries[0].segments[0].departure.iataCode} Depart Time: {moment(flight.itineraries[0].segments[0].departure.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/>
              <h3 className = 'inline-block px-6 py-2.5 bg-blue-300 w-full text-white' >{flight.itineraries[0].segments[0].arrival.iataCode} Arrival Time: {moment(flight.itineraries[0].segments[0].arrival.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/>
              <h3 className = 'inline-block px-6 py-2.5 bg-blue-500 w-full text-white' >{flight.itineraries[0].segments[1].departure.iataCode} Depart Time: {moment(flight.itineraries[0].segments[1].departure.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/>
              <h3 className = 'inline-block px-6 py-2.5 bg-blue-300 w-full text-white' >{flight.itineraries[0].segments[1].arrival.iataCode} Arrival Time: {moment(flight.itineraries[0].segments[1].arrival.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/></div> :  <div><h3 className = 'inline-block px-6 py-2.5 bg-blue-500 w-full text-white' >{flight.itineraries[0].segments[0].departure.iataCode} Depart Time: {moment(flight.itineraries[0].segments[0].departure.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/>
              <h3 className = 'inline-block px-6 py-2.5 bg-blue-300 w-full text-white' >{flight.itineraries[0].segments[0].arrival.iataCode} Arrival Time: {moment(flight.itineraries[0].segments[0].arrival.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/></div> }
              {/* return flight */}
              <h2 className = 'flex px-6 py-2.5 bg-red-400 text-white w-full justify-center mt-4 ' >  <FaPlaneArrival className='scale-150' />  </h2>
              <h3 className = 'inline-block px-6 py-2.5 bg-blue-500 w-full text-white'> Total Flight Time: {flight.itineraries[1].duration}</h3><br/>
              {flight.itineraries[1].segments.length > 1 ? <div><h3 className = 'inline-block px-6 py-2.5 bg-blue-300 w-full text-white'>{flight.itineraries[1].segments[0].departure.iataCode} Depart Time: {moment(flight.itineraries[1].segments[0].departure.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/>
              <h3 className ='inline-block px-6 py-2.5 bg-blue-500 w-full text-white'>{flight.itineraries[1].segments[0].arrival.iataCode} Arrival Time: {moment(flight.itineraries[1].segments[0].arrival.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/>
              <h3 className = 'inline-block px-6 py-2.5 bg-blue-300 w-full text-white'>{flight.itineraries[1].segments[1].departure.iataCode} Depart Time: {moment(flight.itineraries[1].segments[1].departure.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/>
              <h3 className ='inline-block px-6 py-2.5 bg-blue-500 w-full text-white'>{flight.itineraries[1].segments[1].arrival.iataCode} Arrival Time: {moment(flight.itineraries[1].segments[1].arrival.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/></div> : <div><h3 className = 'inline-block px-6 py-2.5 bg-blue-300 w-full text-white'>{flight.itineraries[1].segments[0].departure.iataCode} Depart Time: {moment(flight.itineraries[1].segments[0].departure.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/>
              <h3 className ='inline-block px-6 py-2.5 bg-blue-500 w-full text-white'>{flight.itineraries[1].segments[0].arrival.iataCode} Arrival Time: {moment(flight.itineraries[1].segments[0].arrival.at).format('YYYY-MM-DD hh:mm:ss a')}</h3><br/></div> }
       
              <div>
                <button onClick={() => handleSave(flight) } className='m-2 inline-block px-7 py-2.5 bg-red-400 text-white font-large text-s leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out padding: 10px'>Select Flight</button>
              </div>
           </div>
           
           {flights.meta.count === 0 ? <h1>please select different dates</h1> : null}
            
          </>)
          
          })}  
      </div> 
      
      </div>

    </div>
  )
}

export default Flights