import React from 'react'
import {useNavigate} from "react-router-dom"
import {useEffect} from "react"

const Signout = () => {


  const navigate = useNavigate()


  useEffect(() => {
    localStorage.removeItem('traveltoken')
    navigate('/login')
  },[])

  return (
    <div>Signout</div>
  )
}

export default Signout