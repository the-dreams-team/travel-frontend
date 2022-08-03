import React from "react";
import Trip from "../components/Trip";
const UserTrips = ({ alltrips, updateState, updateFavorite }) => {
  return (
    <div className="userTripsBG">
      <>
        <Trip
          alltrips={alltrips}
          updateState={updateState}
          updateFavorite={updateFavorite}
        />
      </>
    </div>
  );
};

export default UserTrips;
