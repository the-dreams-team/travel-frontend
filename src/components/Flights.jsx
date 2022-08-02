import React from 'react';
import axios from 'axios';

const Flights = ({formData, setFormData}) => {

  const exampleFlightModel = {
    "currencyCode": "USD",
    "originDestinations": [
      {
        "id": "1",
        "originLocationCode": "RIO",
        "destinationLocationCode": "MAD",
        "departureDateTimeRange": {
          "date": "2022-11-01"
        }
      },
      {
        "id": "2",
        "originLocationCode": "MAD",
        "destinationLocationCode": "RIO",
        "departureDateTimeRange": {
          "date": "2022-11-05"
        }
      }
    ],
    "travelers": [
      {
        "id": "1",
        "travelerType": "ADULT"
      },
      {
        "id": "2",
        "travelerType": "CHILD"
      }
    ],
    "sources": [
      "GDS"
    ]
  }









  return (
    <div>

      



    </div>
  )
}

export default Flights