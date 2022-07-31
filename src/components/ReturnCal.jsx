import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';



const ReturnCal = ({departure, setFormData, formData, returnRef}) => {
  const [value, setValue] = useState(null)
  const depLabel = 'Departure Date'
  const returnLabel = 'Return Date'

  const saveDate = (newValue) => {
    // setFormData({...formData, returnDate: newValue._d})
    returnRef.current = newValue._d
  }

  

  return (
   <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker 

        label={departure ? depLabel : returnLabel}
        value={value}
        id='returnDate'
        onChange={(newValue)=> {
          setValue(newValue)
          saveDate(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
   </LocalizationProvider>
  )
}

export default ReturnCal