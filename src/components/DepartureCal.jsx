import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';



const DepartureCal = ({departure, setFormData, formData, departRef}) => {
  const [value, setValue] = useState(null)
  const depLabel = 'Departure Date'
  const returnLabel = 'Return Date'
  
const saveDepDate = (newValue) => {
  // setFormData({...formData, departureDate: newValue._d})
 departRef.current = newValue._d
}

  
  return (
   <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker 

        label={departure ? depLabel : returnLabel}
        value={value}
        id='departureDate'
        onChange={(newValue)=>{
          setValue(newValue)
          saveDepDate(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
   </LocalizationProvider>
  )
}

export default DepartureCal