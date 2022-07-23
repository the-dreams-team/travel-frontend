import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from 'react'

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

        
</StyledForm>

  )
  }

export default NewTrip