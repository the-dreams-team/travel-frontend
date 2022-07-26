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


function App() {

const [trips, setTrips] = useState([])

// this users state will be removed for production 
const [users, setUsers] = useState()

// this will be the logged in user 
const [user, setUser] = useState()

function saveUser() {
  const userToken = localStorage.getItem('token');
  const userObject = JSON.parse(atob(userToken.split('.')[1])).user;
  setUser(userObject)
}



useEffect(()=>{
  fetch('http://localhost:3020/trips')
  .then(res => res.json())
  .then(trips=> setTrips(trips))
}, [])

console.log(trips)

useEffect(()=>{
  fetch('http://localhost:3020/user')
  .then(res => res.json())
  .then(users=> setUsers(users))
}, [])

console.log(users)


const updateTripsState = (id) => {
  setTrips(trips.filter(trips => trips._id !== id))
}




  return (
    <div className= "mainBg">
      <Nav />
      <NavTest/>
      <Routes>
        <Route path='/' element={<Home alltrips={trips} updateTripsState={updateTripsState}/>}/>
        <Route path='/login' element={<Login user={user} saveUser={saveUser} />}/>
        <Route path='/newtrip' element={<NewTrip />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/trip/:id' element={<IndividualTripView/>} />
      </Routes>
    </div>
  );
}

export default App;
