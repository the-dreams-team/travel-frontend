import './App.css';
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import NewTrip from './pages/NewTrip';
import Portfolio from './pages/Portfolio';
import SignUp from './pages/SignUp';


function App() {

const [trips, setTrips] = useState([])
const [users, setUsers] = useState()

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



  return (
    <div class= "mainBg">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/newtrip' element={<NewTrip />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
