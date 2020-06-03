import React from 'react';
import GoogleMapReact from 'google-map-react';

class GoogleMap extends React.Component {
     render() {
          return (
               <div style={{ height: '500px', width: '100%' }}>
                    <GoogleMapReact
                         defaultCenter={{
                              lat: 10.762622,
                              lng: 106.660172
                         }}
                         defaultZoom={11}
                    >
                    </GoogleMapReact>
               </div>
          );
     }
}

export default GoogleMap;