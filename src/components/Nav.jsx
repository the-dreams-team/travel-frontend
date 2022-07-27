import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'


const NavbarContainer = styled.nav`
    background-color: #c0ffee;
    padding: 5px;
    
    ul {
        display: flex;
        justify-content: space-evenly;
    }
    li {
        list-style: none;
    }

`



const Navbar = ({user , setUser}) => {
    const navigate = useNavigate()


  return (
    
      <NavbarContainer>
        <ul> 
          <li> <Link to="/"> Home </Link></li>
          <li> <Link to='/usertrips'> trips </Link></li>
          <li> <Link to='/newtrip'> New Trip </Link></li>
          <li> <Link to='/login'> Login </Link></li>
          <li> <Link to='/profile'> Profile </Link></li>
        </ul>
  
      </NavbarContainer>
    
  )
}

export default Navbar



