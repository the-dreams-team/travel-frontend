import React from 'react';
import Flights from '../components/Flights';

const flightPages = ({user}) => {
  return (
    <div>
      <Flights user = {user}/>
    </div>
  )
}

export default flightPages