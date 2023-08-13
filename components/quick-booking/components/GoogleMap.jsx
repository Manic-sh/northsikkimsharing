import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '400px',
};

class DynamicMap extends React.Component {
  render() {
    const { google } = this.props;

    return (
      <Map
        google={google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 37.774929,
          lng: -122.419418,
        }}
      >
        <Marker position={{ lat: 37.774929, lng: -122.419418 }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
})(DynamicMap);
