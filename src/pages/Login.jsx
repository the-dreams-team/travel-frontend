import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const Login = ({saveUser}) => {

  // need to add the axios post /login with formdata
  //Need to add in handling for the JWT returned
  const navigate = useNavigate();

  const initialState = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)

  //handle change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('this is the sent form data', formData);
    axios.post('http://localhost:3020/login', formData)
    .then(res => {
      console.log('this is the response from the server ->', res.data);
      localStorage.removeItem('traveltoken');
      localStorage.setItem('traveltoken', res.data.token);
      saveUser();
      navigate('/');
    })


  }


  return (
    <div className="form1">
      <div className="w-full max-w-xs  items-center py-12">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={handleChange}
              id="email"
              type="text"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.password}
              id="password"
              onChange={handleChange}
              type="password"
            />
            <p className="text-red-500 text-xs italic">Please enter a password.</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="password.reset"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      
     <button> 
        <Link to='/signup'>Sign Up</Link>
      </button>

        <p className="text-center text-white-500 text-xs  h-4 bg-gradient-to-r from-cyan-500 to-blue-500">
          &copy;2022 the dream team all rights reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
