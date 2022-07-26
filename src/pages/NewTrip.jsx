import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from 'react'
import Calendar from 'react-calendar'


const NewTrip = ({ addTrip }) => {


  const StyledForm = styled.div`
    margin: 20px;

`

  const initialState = {

    tripName: '',
    departureDate: '',
    returnDate: '',
    departureCity: "",
    arrivalCity: "",
    ticketPrice: "String", 
    numberPassengers: "String",
    airlineType: "String",
    flightId: "String"

  }

  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialState)

  //handle change
  const handleChange = (e) => {
    console.log(e.target)
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    axios.post('http://localhost:3020/trips', formData)
    .then(res => {

    })

    .then(res => {
      setFormData(initialState)()
      addTrip(res.data)
      navigate('/')

    })

  }
  return (

    <StyledForm onSubmit={handleSubmit}>
      
      <h1> Create a new trip! </h1>
        
        {/* //adding the name of the trip here  */}
        
        <div>
            <label htmlFor='name'> Name  </label>
            <input id='name' name='name' type='text' onChange = {handleChange} />   
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

          {/* // ticket price */}

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




        <input type='submit' value='Create New Trip' />

</StyledForm>

  )
  }

export default NewTrip