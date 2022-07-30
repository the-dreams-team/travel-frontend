import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getAmadeusData } from '../../api/api';
import { debounce } from 'lodash';

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
    const { userRequest, currentRequest } = getAmadeusData({...props.search }) 
  }, [keyword])

  //destructure the props
  const { city, airport } = props.search

  const label = city && airport ? 'City and Airports' : city ? 'City' : airport ? 'Airports' : ''

  return (
    <>
      <form
        id=''
        style={{ width: 300, marginBottom: '1rem'}}
        open={open}
        onOpen={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionsSelected={(option, value) => option.name === value.name && option.type === value.type}
        onChange={(e, value) => {
          if(value && value.name) {
            props.setSearch((p) => ({...p, keyword: 'a', page: 0 }))
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
            <div 
            label={label}
            fullWidth
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
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <span>Loading...</span>
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
            >
            </div>
          );
        }}
      >
      </form>
    </>
  )



}

export default SearchAutocomplete;