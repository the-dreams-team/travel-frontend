import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import NewTrip from './pages/NewTrip';
import EditTrip from './pages/EditTrip';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import IndividualTripView from './pages/IndividualTripView'
import UserTrips from './pages/UserTrips';
import FavoriteTrips from './components/FavoriteTrips';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import FlightPage from './pages/FlightPage'
import Signout from './pages/Signout'

// import Heart from "../../src/images/icons/hearts/heart.jpg";


function App() {

  const navigate = useNavigate()

  const [trips, setTrips] = useState([])


  // this will be the logged in user 
  const [user, setUser] = useState()

  const [ticketFinder, setTicketFinder] = useState()
  const [flightToken, setFlightToken] = useState()

  function saveUser() {
    const userToken = localStorage.getItem('traveltoken');
    const userObject = JSON.parse(atob(userToken.split('.')[1])).user;
    console.log(userObject)
    setUser(userObject)
  }

  function checkToken() {
    const userToken = localStorage.getItem('traveltoken')
    if(userToken !== null) {
    const userObject = JSON.parse(atob(userToken.split('.')[1])).user;
    setUser(userObject);
    }
    getTrips()
  }
  
  function getTrips() {
    const token = localStorage.getItem('traveltoken');
    const instance = axios.create({
      headers: {
        'Authorization': token
      }
    })

      instance.get(' https://trip-commander-back.herokuapp.com/trips')
      .then(res => {
        if(res.data.msg ==='you need to log in'){
          
        } else {
          setTrips(res.data)
        }
      })
  }



  useEffect(()=>{
      console.log('useeffect ran')
      checkToken()
      
  }, [])





//trips && console.log(trips)


//updates the trips array after the user deletes a trip and the db is updated
const updateTripsState = (id) => {
  setTrips(trips.filter(trips => trips._id !== id))
}

//updates the trip.favorite after the user clicks on favorite and the db is updated
  const updateFavorite = (id) => {
    const newState = trips.map(trip => {
      if(trip._id === id){
        console.log('before update',trip.favorite)
        return {...trip, favorite: !trip.favorite}
      }
      return trip
    })
    setTrips(newState)
  }

 const editTrip = (id) => {

   setTrips(trips.filter(trips._id !== id))

 }



  return (

    <div className= "mainBg">
  
      {/* <Nav /> */}
      <Nav className="z-auto"/>
      <Routes>
        <Route path='/' element={<Home UserTrips= {trips} user={user} />}/>
        <Route path='/usertrips' element={<UserTrips alltrips={trips} updateState={updateTripsState} updateFavorite={updateFavorite}/>} />
        <Route path='/login' element={<Login saveUser={saveUser}/>} />
        <Route path='/newtrip' element={<NewTrip dateAdapter={AdapterMoment} ticketFinder={ticketFinder} setTicketFinder={setTicketFinder} setFlightToken={setFlightToken} />} />
        <Route path='/signup' element={<SignUp saveUser = {saveUser} />} />
        <Route path='/signout' element={<Signout />} />
        <Route path='/profile' element={<Profile user={user} setUser={setUser} />} />
        <Route path='/trip/:id' element={<IndividualTripView setTrips={setTrips} trips={trips} /> } />
        <Route path='/trip/flights' element={<FlightPage user={user} trips={trips} ticketFinder={ticketFinder} flightToken={flightToken} />} />
        
      
      </Routes>
    </div>
  );
}
export default App;
