import React from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'



const Checkboxes = (props) => {
  
      const {city, airport } = props.search
    

    // handle change
      const clickCheckbox = (event) => {
        
        //This rule applies when a React synthetic event is used inside an 
        //asynchronous callback function without calling event.persist().
        //React uses the SyntheticEvent objects to wrap native events. For performance reasons, synthetic events are pooled and reused across multiple native events. 
        //To assure consistent usage of the pooled events, React nullifies the properties of synthetic events right after executing an event handler.
        //If you need to access a synthetic event inside an asynchronous callback function, event.persist() should be called to remove the current event 
        // from the pool. Otherwise, an irrelevant value from another event or a null value will be read inside the callback.
        
        event.persist()

         if(event.target.checked && (city || airport)) {
             props.setSearch(prop => ({...prop, [event.target.value] : event.target.checked }));
             return;
         }

         // if it does not then...

         if(event.target.checked && !(!city || airport)) {
             props.setSearch(prop => ({...props, [event.target.value] : event.target.checked }))
             return;
         }
     } 

     return (

      <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={city}
            onChange={clickCheckbox}
            value={"city"}
          />
        }
        label="City"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={airport}
            onChange={clickCheckbox}
            value={"airport"}
          />
        }
        label="Airport"
      />
    </div>
       )
            }
                   
          
// abel loves his env file


  
  //    <fieldset className="space-y-5">
  //   <legend className="sr-only">Notifications</legend>
  //   <div className="relative flex items-start">
  //     <div className="flex items-center h-5">
  //       <input
  //         id="comments"
  //         aria-describedby="comments-description"
  //         name="comments"
  //         type="checkbox"
  //         className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
  //       />
  //     </div>
  //     <div className="ml-3 text-sm">
  //       <label htmlFor="comments" className="font-medium text-gray-700">
  //         Cities
  //       </label>
  //       <p id="comments-description" className="text-gray-500">
  //         Return from SearchBar are returned as Cities
  //       </p>
  //     </div>
  //   </div>
  //   <div className="relative flex items-start">
  //     <div className="flex items-center h-5">
  //       <input
  //         id="candidates"
  //         aria-describedby="candidates-description"
  //         name="candidates"
  //         type="checkbox"
  //         className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
  //       />
  //     </div>
  //     <div className="ml-3 text-sm">
  //       <label htmlFor="candidates" className="font-medium text-gray-700">
  //         Airports
  //       </label>
  //       <p id="candidates-description" className="text-gray-500">
  //         Returns from SearchBar are Returned as Airports
  //       </p>
  //     </div>
  //   </div>

  // </fieldset>
  
            
export default Checkboxes 