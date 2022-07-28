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


function App() {

  

const [trips, setTrips] = useState([])

// this users state will be removed for production 
//const [users, setUsers] = useState()

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

// useEffect(()=>{
//   fetch('http://localhost:3020/user')
//   .then(res => res.json())
//   .then(users=> setUsers(users))
// }, [])


useEffect(()=>{
  const fetchFlightData = async () => {
    fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ONE_WAY&class_type=ECO&location_arrival=NYC&date_departure=2022-11-15&location_departure=MOW&sort_order=PRICE&number_of_stops=1&price_max=20000&number_of_passengers=1&duration_max=2051&price_min=100&date_departure_return=2022-11-16')
    .then(res => res.json())
    .then(res => console.log(res))
	  .catch(err => console.error(err));
  }

  
})



//console.log(users)


const updateTripsState = (id) => {
  setTrips(trips.filter(trips => trips._id !== id))
}




  return (
    <div className= "mainBg">
      {/* <Nav /> */}
      <NavTest/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/usertrips' element={<UserTrips alltrips={trips} updateState={updateTripsState}/>} />
        <Route path='/login' element={<Login saveUser={saveUser}/>} />
        <Route path='/newtrip' element={<NewTrip />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile user={user} setUser={setUser} />} />
        <Route path='/trip/:id' element={<IndividualTripView/>} />
      </Routes>
    </div>
  );
}

export default App;
