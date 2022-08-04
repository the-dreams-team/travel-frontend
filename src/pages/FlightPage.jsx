import React from 'react';
import Flights from '../components/Flights';

const flightPages = ({user, ticketFinder, flightToken}) => {
  return (
    <div>
      <Flights user={user} ticketFinder={ticketFinder} flightToken={flightToken} />
    </div>
  )
}

export default flightPages