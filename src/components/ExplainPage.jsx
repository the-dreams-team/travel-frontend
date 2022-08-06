import React, {useState} from 'react'
import axios from "axios"

const ExplainPage = ({setUser, user}) => {
     const initialState = {
      name: user?.name,
      email: user?.email,
    };

    const [userInfo, setUserInfo] = useState(initialState);
    const [updateForm, showUpdateForm] = useState(false);


    const handleChange = (e) => {
      setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    };




    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("button pushed");
      console.log("user id =>", user._id);
      console.log("user info =>", userInfo);
      axios
        .post(`https://trip-commander-back.herokuapp.com/user/${user._id}`, userInfo)
        .then((res) => {
          console.log("response from user update =>", res.data);
          setUser(res.data);
          showUpdateForm(false);
        });
    };
  
  return (
    
      <div className="bg-white rounded opacity-90">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span className="block">Welcome {user?.name} to our Travel Planner</span>
        <span className="block text-indigo-600">Try adding your trip itinerary to see flight prices, and even track multiple trips.</span>
      </h2>
      <p className="text-1xl font-extrabold tracking-tight text-gray-900 sm:text-1xl">
        <span className="block text-indigo-600">Below is your favorited trips (if not shown try favorting a trip)</span>
      </p>
      <div className="mt-8 flex">
        <div className="inline-flex rounded-md shadow">
          <a
            href="/newtrip"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            New Trip
          </a>
        </div>
        <div className="ml-3 inline-flex">
          <a
            href="usertrips"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            Stored Trips
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ExplainPage;