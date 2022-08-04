import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getAmadeusData } from '../../api/api';
import { debounce } from 'lodash';
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material';


const SearchAutocomplete = (props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  // configure display of the ui   
  const names = options.map(i => ({ type: i.subType, name: i.name }));

  //debounce prevents unwanted keystrokes when user triggers input events
  const debounceLoadData = useCallback(debounce(setKeyword, 1000), []);
  
  useEffect(() => {
    debounceLoadData(search);
  }, [search]);

  useEffect(() => {
    const { userRequest, currentRequest } = getAmadeusData({...props.search, page: 0, keyword }) 
  
  userRequest.then(res => {
    if(!res.data.code) {
      setOptions(res.data.data);
      if(props.arrival){
      props.setFormData({...props.formData, arrivalIata: res.data.data[res.data.data.length-1].iataCode, arrivalCity: res.data.data[res.data.data.length-1].address.cityName})
      } else {
        props.setFormData({...props.formData, departureIata: res.data.data[res.data.data.length-1].iataCode, departureCity: res.data.data[res.data.data.length-1].address.cityName})
      }
      
    }
    
  
  }).catch(error => {
    axios.isCancel(error)
    setOptions([]);
    // setLoading(false)
  });

  return () => {
    currentRequest.cancel()
  }
}, [keyword]);

  //destructure the props
  const { city, airport } = props.search

  // const label = city && airport ? 'City and Airports' : city ? 'City' : airport ? 'Airports' : ''
  const label = 'Departure City/Airport';
  const labelAr = 'Arrival City/Airport';


  return (
    <>
      <Autocomplete
        
        style={{ width: 300, marginBottom: '1rem', marginLeft: '3rem'}}
        className="bg-white text-white"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(e, value) => { 
          if(value && value.name) {
            props.setSearch((p) => ({...p, keyword: value.name, page: 0 }))
            setSearch(value.name)
            return;
          }
          setSearch('')
          props.setSearch((p) => ({...p, keyword: 'a', page: 0 }))

        }}
        getOptionLabel={option =>{
          return option.name;
        }}
        options={names}
        loading={loading}
        renderInput={params => {
          return (
            <TextField 
            label={props.arrival ? labelAr : label}
            fullWidth
            className='text-whit border-white'
            onChange={e => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            variant='outlined'
            inputProps={{
              ...params.inputProps,
              value: search
            }}
            InputProps={{
              ...params.InputProps,
            }}
            />
            
          );
        }}
      />
      
    </>
  )



}

export default SearchAutocomplete;


