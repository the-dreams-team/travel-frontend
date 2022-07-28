import React, { useState, useEffect} from 'react'
// import React, { useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'

//add the styled form like before (placeholder for now)
const StyledForm = styled.div`
margin: 20px;
h1 {
  background-color: blue;
  
}

`
//to edit our current trip
const EditTrip = ({ setTrips }) => {

    let { id } = useParams()
    let navigate = useNavigate()


    const initialState = {

        tripName: '',
        departureDate: '',
        returnDate: '',
        departureCity: "",
        arrivalCity: "",
        ticketPrice: "", 
        numberPassengers: "",
        airlineType: "",
        flightId: '',
        favorite: '',

    }

const [formData, setFormData] = useState(initialState)

const handleChange = (e) => {
    
    setFormData({...formData, [e.target.id] : e.target.value})

}

const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    axios.put(`http://localhost:8000/trips/${id}` , formData )
    .then(res => {

        setFormData(initialState)
        EditTrip(res.data)
        navigate('/')
    })
}

useEffect(() => {
    axios.get(`http://localhost:8000/trips/${id}`)
    .then(res => {
        setFormData(res.data)
    })
}, [])


return (

<StyledForm onSubmit={handleSubmit}>
      

<div>
  <section>
    <h1> Edit Current Trip </h1>
  </section>
</div>

  {/* //adding the name of the trip here  */}
  
  <div>
    <section>
      <label htmlFor='name'> Name  </label>
      <input id='name' name='name' type='text' onChange = {handleChange} />   
    </section>
  </div>

  {/* //for our departure date */}

  <div>
       <label htmlFor='date'> Departure Date </label>
       <input id='date' name='date' type='text' onChange = {handleChange} />   
  </div>

  {/* // for our arrival date */}
       {/* departure calendar */}
       <div class="containerCal">
  <Calendar />
  </div>
  {/* return calendar */}
  <div class="containerCal">
  <Calendar />
  </div>

  <div> 
      <label htmlFor='dateArrival'> Arrival Date </label>
      <input id='dateArrival' name='dateArrival' type='text' onChange = {handleChange} />  
  </div>

    {/* //departure city  */}

  <div>
     <label htmlFor='departureCity'> Departure City </label>
     <input id='departureCity' name='departureCity' type='text' onChange = {handleChange} />  
  </div>

      {/* //arrival city  */}

  <div>
    <label htmlFor='arrivalCity'> Arrival City </label>
    <input id='arrivalCity' name='arrivalCity' type='text' onChange = {handleChange} />  
  </div>


        {/* //for our ticket price */}

  <div>
    <label htmlFor='ticketPrice'> Ticket Price </label>
    <input id='ticketPrice' name='ticketPrice' type='text' onChange = {handleChange} />  
  </div>

        {/* //number of passengers */}

  <div>
    <label htmlFor='numberPasssengers'> Number of Passengers </label>
    <input id='numberPasssengers' name='numberPasssengers' type='text' onChange = {handleChange} />  
  </div>

        {/* //name of airline */}


  <div>
    <label htmlFor='airlineType'> Airline Type </label>
    <input id='airlineType' name='airlineType' type='text' onChange = {handleChange} />  
  </div>

      {/* //flight id */}

  <div>
    <label htmlFor='flightId'> Flight # </label>
    <input id='flightId' name='flightId' type='text' onChange = {handleChange} />  
  </div>



  <input type='submit' value='Edit Current Trip' />


  

</StyledForm>

)}


export default EditTrip

















