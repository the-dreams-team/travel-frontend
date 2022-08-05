import React, { useState, useEffect} from 'react'
// import React, { useEffect } from 'react'
import axios from 'axios'
// import styled from 'styled-components'

import { useParams } from 'react-router'
import { useNavigate } from 'react-router'

//add the styled form like before (placeholder for now)
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
    axios.put(` https://trip-commander-back.herokuapp.com/trips/${id}` , formData )
    .then(res => {

        setFormData(initialState)
        EditTrip(res.data)
        navigate('/')
    })
}

useEffect(() => {
    axios.get(` https://trip-commander-back.herokuapp.com/trips/${id}`)
    .then(res => {
        setFormData(res.data)
    })
}, [])


return (

<form onSubmit={handleSubmit}>
      
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

</form>

)}


export default EditTrip

















