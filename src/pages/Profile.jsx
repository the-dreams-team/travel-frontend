import React, { useState } from 'react';
import axios from 'axios';

const Profile = ({setUser, user}) => {


  const initialState = {
    name: user?.name,
    email: user?.email
    
  }
  
  const [userInfo, setUserInfo] = useState(initialState);
  const [updateForm, showUpdateForm] = useState(false)
  
  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.id] : e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('button pushed')
    console.log('user id =>', user._id)
    console.log('user info =>', userInfo)
    axios.post(`http://localhost:3020/user/${user._id}`, userInfo)
    .then(res => {
      console.log('response from user update =>',res.data);
      setUser(res.data);
      showUpdateForm(false);
    })
  }


  
  return (
    <div className='flex-col justify-center items-center mx-auto bg-gray-200 py-12 px-4 max-w-7xl spm:px-6 w-40 '>
      <h3 className='mx-4 my-4'><u>Profile Page</u></h3>
      
      <p className='mx-4 my-4'>Name: {user?.name}</p>
      <p className='mx-4 my-4'>Email: {user?.email}</p>
      
      <div className='bg-gray-900 py-1 px-1 rounded'>
      <button className='text-white rounded' onClick={() => {showUpdateForm(true)}} >Update User Info</button>
      </div>

      {updateForm && <form onSubmit={handleSubmit} className='bg-gray-200 py-12 px-4 spm:px-6 w-60 rounded' >
        <label>Name: 
        <input type='text' id='name' value={userInfo.name} onChange={handleChange} />
        </label>
        <br/>
        <label>Email: 
        <input type='text' id='email' value={userInfo.email} onChange={handleChange} />
        </label>
        <br/>
        <div className='flex justify-between my-8'>
        <button className='bg-gray-900 text-white rounded' type='submit'>Update</button>
        <button className='bg-gray-900 text-red-600 rounded' onClick={() => {showUpdateForm(false)}}>Close</button>
        </div>
        </form>}


    </div>
  )
}

export default Profile