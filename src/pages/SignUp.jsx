import React from 'react'

const SignUp = () => {

  // need to add the axios post to /signup with formdata
  //need to add in handling for the jwt returned


  return (
    <div class="form1 mainBg">
    <div class="w-full max-w-xs  items-center py-12">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*********"
          />
          <p class="text-red-500 text-xs italic">Please create a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Signup
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="password.reset"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p class="text-center text-white-500 text-xs  h-4 bg-gradient-to-r from-cyan-500 to-blue-500">
        &copy;2022 the dream team all rights reserved 
      </p>
    </div>
  </div>
    
  )
}

export default SignUp