import React from "react";
import Geolocation from "react-geolocation";

export default () => {
  return (
    <Geolocation
      onSuccess={console.log}
      render={({

        position: { coords: { latitude, longitude } = {} } = {},
        error,
      }) =>
        <div>
 {error &&
            <div>
              {error.message}
            </div>}

          <pre>
            latitude: {latitude} 
            longitude: {longitude}
          </pre>
        </div>}
    />
  );
};
