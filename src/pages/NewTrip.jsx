import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from 'react'
import Calendar from 'react-calendar'
import { autocomplete } from 'air-port-codes-node';






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
    ticketPrice: "", 
    numberPassengers: "",
    airlineType: "",
    flightId: ""
    
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
      setFormData(initialState)()
      addTrip(res.data)
      navigate('/')
      
    })
    
  }
  
  
  const apca = autocomplete({
    key : '7fbeaa6941', 
    secret : 'xxxxxxxxxxxxxxx', // Your API Secret Key: use this if you are not connecting from a web server
    limit : 15
  });
  
  let term = 'New Yo';
  apca.request(term);
  
  
  return (
    
    
    
    
    <StyledForm onSubmit={handleSubmit}>
     
        <div>
          <section>
            <div className="newTripTitle"> </div>
            <h1> Create a new trip! </h1>
          </section>
        </div>
        
        {/* //adding the name of the trip here  */}
        
        <div>
            <label htmlFor='name'> Name  </label>
            <input id='name' name='name' type='text' value={formData.tripName} onChange = {handleChange} />   
        </div>

        {/* //for our departure date */}


        {/* <div>
          <Apca />
        </div> */}





        <div>
             <label htmlFor='date'> Departure Date </label>
             <input id='date' name='date' type='text' value={formData.departureDate}  onChange={handleChange} />   
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
              <label htmlFor='returndate'> Arrival Date </label>            
              <input id='dateArrival' name='dateArrival' type='text' value={formData.dateArrival} onChange={handleChange} />  
          </div>

          {/* //departure city  */}

          <div>
            <label htmlFor='departureCity'> Departure City </label>
            <input id='departureCity' name='departureCity' type='text' value={formData.departureCity} onChange={handleChange} />  
          </div>

            {/* //arrival city  */}

          <div>
            <label htmlFor='arrivalCity'> Arrival City </label>
            <input id='arrivalCity' name='arrivalCity' type='text' value={formData.arrivalCity}onChange = {handleChange} />  
          </div>

          {/* // ticket price */}

        <div>
          <label htmlFor='ticketPrice'> Ticket Price </label>
          <input id='ticketPrice' name='ticketPrice' type='text' value={formData.ticketPrice} onChange = {handleChange} />  
        </div>

        {/* //number of passengers */}

        <div>
          <label htmlFor='numberPasssengers'> Number of Passengers </label>
          <input id='numberPasssengers' name='numberPasssengers' type='text' value={formData.numberPassengers} onChange = {handleChange} />  
        </div>

        {/* //name of airline */}


        <div>
          <label htmlFor='airlineType'> Airline Type </label>
          <input id='airlineType' name='airlineType' type='text' value={formData.airlineType} onChange = {handleChange} />  
        </div>


        {/* //flight id */}

        <div>
          <label htmlFor='flightId'> Flight # </label>
          <input id='flightId' name='flightId' type='text' value ={formData.flightId} onChange = {handleChange} />  
        </div>
        
        {/* <input type='submit' value='Create New Trip' /> */}
        <button
        type="button"
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        Create New Trip
        </button>
  


  </StyledForm>

  )
  }

export default NewTrip












