import React, { useState } from "react";
import axios from "axios";

const Profile = ({ setUser, user }) => {
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
      .post(`http://localhost:3020/user/${user._id}`, userInfo)
      .then((res) => {
        console.log("response from user update =>", res.data);
        setUser(res.data);
        showUpdateForm(false);
      });
  };

  return (
    // <div class="flex-col justify-center items-center mx-auto bg-opacity-50 bg-gray-200 h-screen py-20 px-4 max-w-7xl spm:px-6  w-3/4" >
    <div className="h-screen">
      <div className="bg-gray-600 w-3/4 flex-col justify-center items-center mx-auto">
        <h3 className="mx-4 my-4 font-sans text-lg">
          <u>Profile Page</u>
        </h3>

        <p className="mx-4 my-4 font-sans">Name: {user?.name}</p>
        <p className="mx-4 my-4 font-sans">Email: {user?.email}</p>

        <div className="bg-gray-900 py-1 px-1 rounded">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              showUpdateForm(true);
            }}
          >
            Update User Info
          </button>
        </div>

        {updateForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-200 py-12 px-4 spm:px-6 w-60 rounded"
          >
            <label
            className="font-sans">
              Name:
              <input
                type="text"
                id="name"
                value={userInfo.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="text"
                id="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <div className="flex justify-between my-8">
              <button className="bg-gray-900 text-white rounded" type="submit">
                Update
              </button>
              <button
                className="bg-gray-900 text-red-600 rounded p-2"
                onClick={() => {
                  showUpdateForm(false);
                }}
              >
                X
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
