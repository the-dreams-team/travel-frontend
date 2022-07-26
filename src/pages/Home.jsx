import React from 'react'
import Trip from '../components/Trip'
import Calendar from 'react-calendar'
const Home = ({alltrips}) => {
  return (
    <div>
        
    <h1   style={{textAlign: 'center'}}>
      Welcome to the Trip Planner 
    </h1>
        <Trip alltrips={alltrips}/>
     
    </div>
  )
}

export default Home
