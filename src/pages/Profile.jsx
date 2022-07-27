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
    e.preventDefualt()
    console.log()
    axios.put(`http://localhost:3020/user/${user._id}`, userInfo)
    .then(res => {
      setUser(res.data);
      showUpdateForm(false);
    })
  }



  return (
    <div className='bg-white py-12 px-4 max-w-7xl spm:px-6 w-40 '>
      <h3>Profile Page</h3>
      
      <p className=''>Name: {user?.name}</p>
      <p className=''>Email: {user?.email}</p>
      
      <div className='bg-gray-900 py-12 px-4 max-w-7xl spm:px-6 w-40 '>
      <button onClick={() => {showUpdateForm(true)}} >Update User Info</button>
      </div>

      {updateForm && <form onSubmit={handleSubmit}>
        <label>Name: 
        <input type='text' id='name' value={userInfo.name} onChange={handleChange} />
        </label>
        <br/>
        <label>Email: 
        <input type='text' id='email' value={userInfo.email} onChange={handleChange} />
        </label>
        <br/>
        <button type='submit'>Update</button>
        </form>}


    </div>
  )
}

export default Profile