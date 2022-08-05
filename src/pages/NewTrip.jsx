import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainSearch from "./MainSearch";
import DepartureCal from '../components/DepartureCal';
import ReturnCal from '../components/ReturnCal';
import { useFlightToken } from "../api/useFlightToken";


const NewTrip = ({ dateAdapter, ticketFinder, setTicketFinder, setFlightToken }) => {
  const departure = true

  const initialState = {
    tripName: "",
    departureDate: "",
    returnDate: "",
    departureCity: "",
    arrivalCity: "",
    departureIata: "",
    arrivalIata: "",
    ticketPrice: "",
    numberPassengers: "",
    airlineType: "",
    flightId: "",
    favorite: false,
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  
  setFlightToken(useFlightToken())

  
  //handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    
  };


  const token = localStorage.getItem('traveltoken');
  const createInstance = axios.create({
    headers: {
      'Authorization': token
    }
  })



  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    createInstance.post("http://localhost:3020/trips", formData).then((res) => {
      setFormData(initialState);
      setTicketFinder(res.data);
      navigate("/trip/flights");
    });
  };

 
  return (
    <div className="bg-yellow imageBack2  bg-opacity-80 w-full align-middle items-center text-center   min-h-screen  bg-auto  ">
      <div className="newForm flex items-center justify-center">
        
        
        <form
          className="w-11/12   bg-gray-700   newForm "
          onSubmit={handleSubmit}
        >
                    <div className="bg-white">
                      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                        <div className="text-center">
                          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                            Fill Form
                          </h2>
                          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            Create a New Trip
                          </p>
                        </div>
                      </div>
                    </div>



                      <div className="flex items-center justify-center w-full">
                      <label className="text-indigo-500 m-4 text 1xl font-mono block mt-4 py-5 padding-top: 5px">
                          
                          Trip Name 
                          </label>
                        <input
                          type="name"
                          name="tripName"
                          id="tripName"
                          required={true}
                          value={formData.tripName}
                          onChange={handleChange}
                          className="  mt-1 m-1 w-1/3 shadow-sm text-center focus:ring-indigo-200 focus:border-indigo-200 block p-2 sm:text-sm border-gray-100 rounded-md"
                          placeholder="My Dream Trip"  
                        />
                        

                      </div>
                          {/* departure and return locations */}
                          
                          <div className="   ">
                            <div className="scale-75">
                            <MainSearch setFormData={setFormData} formData={formData} />
                            </div>
                            <div className="scale-75 ">
                            <MainSearch setFormData={setFormData} formData={formData} arrival={true}/>
                            </div>
                          </div>
                        
                          {/* //for our departure date */}

            <div className="  flex items-center content-center dates mt-2">
            
                <div className=" flex items-center content-center ">
                    <div className="scale-75 bg-white ">
                    <DepartureCal  departure={departure}  setFormData = {setFormData} formData = {formData} />
                    </div>
                    <div className="scale-75 bg-white">
                    <ReturnCal   setFormData = {setFormData} formData = {formData} />
                    </div>
                </div> 
  
            </div>
             

          {/* //number of passengers */}

 
            <div className="flex items-center">
                <label className="text-indigo-500 m-4 text 1xl font-mono block mt-4 py-5 padding-top: 5px">
                
                Number of Passengers 
                </label>
              <input
                type="text"
                name="numberPasssengers"
                id="numberPassengers"
                required={true}
                value={formData.numberPassengers}
                onChange={handleChange}
                className="  mt-2 m-2 w-1/3 shadow-sm text-center focus:ring-indigo-500 focus:border-indigo-500 block p-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="(Total # of Pass here)"  
              />
              
            </div>
      
              <div className="flex items-center justify-center">
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
