import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchAutocomplete from '../components/Search/Autocomplete'
import { getAmadeusData } from "../api/api"
import Checkboxes from '../components/Search/Checkboxes'


const MainSearch = ({formData, setFormData, arrival}) => {

    // the state we have itself + we are then able to change state as needed
    const [search, setSearch] = useState({ keyword:'a', city: true, airport: true, page: 0 });

   

    const [dateSource, setDataSource] = useState({ meta: { count: 0 }, data: [] });

    // const [loading, setLoading] = useState(false)
    

    useEffect(() => {

        //loader animation - 
        // setLoading(true)
    
                                         
    const { userRequest, currentRequest } = getAmadeusData(search);

    userRequest.then(res => {
       
        if(!res.data.code) {

            //being able to take our data
            setDataSource(res.data)
            
        }
       // setFormData({...formData, departureCity: dateSource.data[0].iataCode})
    //    setLoading(false)
    }).catch(error => {
       axios.isCancel(error)
    //    setLoading(false) 
    });

    return() => {

        //will allow us to cancel the request, but we cannot handle any parameters in the clappers. We could also use .cancel`
        //cancel our request for data from the API. Send message using .cancel 

        currentRequest.cancel()

    };
}, [search]);

     return (
         <div className="container">
             <div className='userSearch'>
                <SearchAutocomplete search={search} formData={formData} setFormData={setFormData} setSearch={setSearch} arrival={arrival} />
                {/* <Checkboxes search={search} setSearch={setSearch}/>              */}
            </div>
        </div>

    )
}

export default MainSearch



























