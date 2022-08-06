import axios from 'axios';

const CancelToken = axios.CancelToken;

// gets data from the server with params we send
export const getAmadeusData = params => {
  //destructure 
  const { keyword = '', page = 0, city = true, airport = true } = params;
  
  //checking from subtype
  const subTypeCheck = city && airport ? 'CITY,AIRPORT' : city ? "CITY" : airport ? 'AIRPORT' : '';
  
  //makes sure we send at least one char (api requires this)
  const searchQuery = keyword ? keyword : 'a';


    const currentRequest = CancelToken.source();


  const userRequest= axios.get(
    `https://trip-commander-back.herokuapp.com/api/airports/?keyword=${searchQuery}&page=${page}&subType=${subTypeCheck}`,
    {
      cancelToken: currentRequest.token
    }
  )
  return { userRequest, currentRequest }
}