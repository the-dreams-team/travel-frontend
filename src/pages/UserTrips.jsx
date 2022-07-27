import React from 'react'
import Trip from '../components/Trip'
const UserTrips = ({alltrips, updateState}) => {
  return (
    <div>

     
          <>
            <Trip alltrips={alltrips} updateState = {updateState} />
          </>
        
      

    </div>
  )
}

export default UserTrips