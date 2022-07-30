import React, { useState } from 'react'
import axios from 'axios'
import SearchAutocomplete from '../components/Search/Autocomplete'
import { getAmadeusData } from "../api/api"
import Checkboxes from '../components/Search/Checkboxes'


const MainSearch = () => {

    // the state we have itself + we are then able to change state as needed
    const [search, setSearch] = useState({ keyword:'a', city: true, airport: true, page: 0 });

    const [dateSource, setDataSource] = useState({ meta: { count: 0 }, data: [0] });

    const [loading, setLoading] = useState(false)


    React.useEffect(() => {

        //loader animation - 
        // setLoading(true)
    

                                            //will have to import to get rid of error on line 23
    const { userRequest, currentRequest } = getAmadeusData(search);

    userRequest.then(res => {
       
        if(!res.data.code) {

            //being able to take our data
            setDataSource(res.data)
        }
       setLoading(false)
    }).catch(error => {
       axios.isCancel(error)
       setLoading(false) 
    });

    return() => {

        //will allow us to cancel the request, but we cannot handle any parameters in the clappers. We could also use .cancel`
        //cancel our request for data from the API
        currentRequest.abort()

    };
}, [search]);




     return (
         <div className="container">
             <div className='userSearch'>
                <SearchAutocomplete search={search} setSearch={setSearch}/>

                <Checkboxes search={search} setSearch={setSearch}/>             </div>
        </div>

    )

}


export default MainSearch



























