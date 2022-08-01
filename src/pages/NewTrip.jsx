import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import MainSearch from "./MainSearch";
import DepartureCal from '../components/DepartureCal';
import ReturnCal from '../components/ReturnCal';




const NewTrip = ({ addTrip, dateAdapter }) => {
  const departure = true
  const StyledForm = styled.div`
    margin: 20px;
  `;

  const initialState = {
    tripName: "",
    departureDate: "",
    returnDate: "",
    departureCity: "",
    arrivalCity: "",
    ticketPrice: "",
    numberPassengers: "",
    airlineType: "",
    flightId: "",
    favorite: "",
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);


  //handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    axios.post("http://localhost:3020/trips", formData).then((res) => {
      setFormData(initialState)();
      addTrip(res.data);
      navigate("/");
    });
  };

 
  return (
    <div className="bg-yellow imageBack2  bg-opacity-80 w-full align-middle items-center text-center   min-h-screen  bg-auto  ">
      <div className="newForm flex items-center">
        <form
          className="w-3/4   bg-gray-700   newForm "
          onSubmit={handleSubmit}
        >
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                  FIll Form
                </h2>
                <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                  Create a New Trip
                </p>
              </div>
            </div>
          </div>



          <div className="flex items-center">
          <label className="text-indigo-500 m-4 text 1xl font-mono block mt-4 py-5 padding-top: 5px">
              
              Trip Name 
              </label>
            <input
              type="name"
              name="tripName"
              id="tripName"
              value={formData.tripName}
              onChange={handleChange}
              className="  mt-2 m-2 w-1/2 shadow-sm text-center focus:ring-indigo-500 focus:border-indigo-500 block p-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="My Dream Trip"  
            />
            

          </div>
        

          {/* //for our departure date */}

          <div className="  flex items-center content-center dates mt-2">
            
          <div className="bg-white p-1.5 ">
             <DepartureCal  departure={departure}  setFormData = {setFormData} formData = {formData} />
             <ReturnCal   setFormData = {setFormData} formData = {formData} />
             
            </div>
            
  
            <div>
             
              {/* <input
                id="arrivalCity"
                name="arrivalCity"
                type="text"
                // value={formData.arrivalCity}
                // onChange={handleChange}
                className=" mt-4  p-1 gap-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Return Date"
              /> */}
            </div>
          </div>


          {/* // ticket price */}
      <div className="flex items-center justify-between">
        
                <label className="text-indigo-500 text 1xl font-mono block mt-4 py-5 padding-top: 5px">
                Ticket Price ($){" "}
                </label>
      
          
      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
        Price
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="text"
          name="ticketPrice"
          id="ticketPrice"
          onChange={handleChange}
          value={formData.ticketPrice}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md "
          placeholder="0.00"
          aria-describedby="price-currency"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            USD
          </span>
        </div>
      </div>
    </div>




          {/* //number of passengers */}

          <div className="bg-gr ">
            <label className="text-indigo-500 text 1xl font-mono block mt-4 py-5 padding-top: 5px ">
              {" "}
              Number of Passengers{" "}
            </label>
            <input
              id="numberPasssengers"
              name="numberPasssengers"
              className="rounded-md "
              type="text"
              value={formData.numberPassengers}
              onChange={handleChange}
            />
          </div>


         {/* Flight Carrier Info         */}
          <div className="">
          {/* //name of airline */}
            <div className="bg-gray-600 block  ">
              <label className="text-indigo-500 1xl font-mono block mt-4 py-4 padding-top: 5px;">
                {" "}
                Airline Type{" "}
              </label>
              <input
                id="airlineType"
                name="airlineType"
                className="rounded-md"
                type="text"
                value={formData.airlineType}
                onChange={handleChange}
              />
            </div>

            {/* //flight id */}

            <div className="bg-gray-600 block">
              <label className="text-indigo-500 text 2xl font-mono block padding-top: 5px ">
                {" "}
                Flight #{" "}
              </label>
              <input
                id="flightId"
                className="rounded-md"
                name="flightId"
                type="text"
                value={formData.flightId}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <input type='submit' value='Create New Trip' /> */}

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
              Create New Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTrip;

















// /*


//         </div>
// //           {/* //departure city  */}
          
//             {/* <div className="m-1 bg-gray-600">
//               <label className=" text-yellow-600 text 1xl font-mono block mt-6 py-5 padding-top: 5px align-content: center space-x-2">
//                 {" "}
//                 Departure Date{" "}
//               </label>
//               <input
//                 id="date"
//                 name="date"
//                 type="text"
//                 value={formData.departureDate}
//                 // onChange={handleChange}
//               />
//             </div> */}
//             {/* <div className="bg-gray-600 m-1">
//               <label className="text-yellow-600 text 1xl font-mono block mt-6 py-5 padding-top: 5px align-content: center">
//                 {" "}
//                 Arrival Date{" "}
//               </label>
//               <input
//                 id="dateArrival"
//                 name="dateArrival"
//                 type="text"
//                 value={formData.dateArrival}
//                 onChange={handleChange}
//               />
//             </div> */}//           


// <div className="flex ">
// //             {/* <div className="bg-gray-600 m-1 ">
// //           <label className="text-yellow-600 text 1xl font-mono block mt-4 py-5 padding-top: 5px">
// //             {" "}
// //             Departure City{" "}
// //           </label>
// //           <input
// //             id="departureCity"
// //             name="departureCity"
// //             type="text"
// //             value={formData.departureCity}
// //             onChange={handleChange}
// //           />
// //         </div> */}
// //             <div>
// //               <br/>
// //               <br/>
// //               <br/>
// //               {/* <MainSearch/> */}
             
          // {/* // for our arrival date */}
          // {/* departure calendar */}

        //   <div className=" calender gap-6  ">
        //   {/* <div class="containerCal gap-6  ">
        //   <h2>Departure Date</h2>
        //   <Calendar />
        // </div> */}
        //   {/* return calendar */}
        //   {/* <div class="containerCal ">
        //   <h2>Return Date</h2>
        //   <Calendar />
        // </div> */}
        // </div>
              
// //               {/* <input
// //                 id="departureCity"
// //                 name="departureCity"
// //                 type="text"
// //                 // value={formData.arrivalCity}
// //                 // onChange={handleChange}
// //                 className=" mt-4 p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
// //                 placeholder="Departure City"
// //               /> */}
// //             </div>

// //             <div>
              
// //               {/* <input
// //                 id="arrivalCity"
// //                 name="arrivalCity"
// //                 type="text"
// //                 // value={formData.arrivalCity}
// //                 // onChange={handleChange}
// //                 className=" mt-4 p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
// //                 placeholder="Arrival City"
// //               /> */}
// //             </div>
    //       {/* //adding the name of the trip here  */}

    //       {/* <div className="bg-gray-600 ">
    //       <label className="text-yellow-600 text-1xl font-mono block mt-4 py-5 padding-top: 10px">
    //         {" "}
    //         Name{" "}
    //       </label>
    //       <input
    //         class="shadow-md"
    //         id="name"
    //         name="name"
    //         type="text"
    //         value={formData.tripName}
    //         onChange={handleChange}
    //       />
    //     </div> */}

    //       {/* <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
    //   <label htmlFor="name" className="block text-xs font-medium text-gray-900">
    //     Name
    //   </label>
    //   <input
    //     type="text"
    //     name="name"
    //     id="name"
    //     className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
    //     placeholder="Jane Smith"
    //   />
    // </div> */}


// // *?