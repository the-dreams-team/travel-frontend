import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFlightToken = () => {

  const [flightToke, setToken] = useState()

  const formInfo = new URLSearchParams();
  formInfo.append('grant_type', 'client_credentials');
  formInfo.append('client_id', 'oArnoQQYhAoQ4dRLGm0YAWlRyqVAjwtk');
  formInfo.append('client_secret', 'cnGXPMckKAQEhAOv');

  useEffect(() => {

    const flightInstance = axios.create()
    flightInstance.post('https://api.amadeus.com/v1/security/oauth2/token', formInfo)
    .then(res => {
      setToken(res.data.access_token)
    })
  }, [])

  return flightToke
}