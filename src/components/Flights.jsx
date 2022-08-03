import React, { useState } from 'react';
import axios from 'axios';

const Flights = ({formData, setFormData, user}) => {



  const [flights, setFlights] = useState([])


  const instance = axios.create({
    method: 'get',
  })
  
  instance.defaults.headers.common['Authorization'] = 'Bearer rmuUjGjkz5quQ8ip04h8w8sI6TW5'
  
  
  const departIATA = '';
  const arrivalIATA = '';
  const departDate = '';
  const returnDate = '';
  const numAdults = '';
  
  
  
  
  
  const findFlights = () => {
    instance(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departIATA}&destinationLocationCode=${arrivalIATA}&departureDate=${departDate}&returnDate=${returnDate}&adults=${numAdults}&nonStop=true&currencyCode=USD&max=5`)
    .then(res => {
      console.log(res.data)
    })
  }





  return (
    <div>
       
       
       
        <ul>



            <li>
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              </li>   




        </ul>
      



    </div>
  )
}

export default Flights