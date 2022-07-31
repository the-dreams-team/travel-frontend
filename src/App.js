import './App.css';
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import NewTrip from './pages/NewTrip';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import NavTest from './components/NavTest';
import IndividualTripView from './pages/IndividualTripView'
import UserTrips from './pages/UserTrips';
import FavoriteTrips from './components/FavoriteTrips';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// import Heart from "../../src/images/icons/hearts/heart.jpg";


function App() {

const [trips, setTrips] = useState([])

// this users state will be removed for production 
//const [users, setUsers] = useState()

// this will be the logged in user 
const [user, setUser] = useState()

function saveUser() {
  const userToken = localStorage.getItem('token');
  const userObject = JSON.parse(atob(userToken.split('.')[1])).user;
  console.log(userObject)
  setUser(userObject)

}

function checkToken() {
  const userToken = localStorage.getItem('token')
  if(userToken !== null) {
  const userObject = JSON.parse(atob(userToken.split('.')[1])).user;
  setUser(userObject);
  }
}


useEffect(()=>{
  fetch('http://localhost:3020/trips')
  .then(res => res.json())
  .then(trips=> setTrips(trips))
  checkToken()
}, [])

console.log(trips)




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






  return (

    <div className= "mainBg">
  
      {/* <Nav /> */}
      <NavTest className="z-auto"/>
      <Routes>
        <Route path='/' element={<Home UserTrips= {trips}/>}/>
        <Route path='/usertrips' element={<UserTrips alltrips={trips} updateState={updateTripsState} updateFavorite={updateFavorite}/>} />
        <Route path='/login' element={<Login saveUser={saveUser}/>} />
        <Route path='/newtrip' element={<NewTrip dateAdapter={AdapterMoment} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile user={user} setUser={setUser} />} />
        <Route path='/trip/:id' element={<IndividualTripView/> } />
        <Route path='/favorites' element={<FavoriteTrips UserTrips={trips}/>} />
      </Routes>
    </div>
  );
}

export default App;
