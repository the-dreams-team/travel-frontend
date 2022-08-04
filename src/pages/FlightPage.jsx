import React from 'react';
import Flights from '../components/Flights';

const flightPages = ({user, ticketFinder}) => {
  return (
    <div>
      <Flights user={user} ticketFinder={ticketFinder} />
    </div>
  )
}

export default flightPages