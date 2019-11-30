import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapZone extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const mapStyles = { 'z-index': '-3', position: 'absolute', 'left': '0px'};
    return (
      <div className='stop-overflow'>
        <Map
            google={this.props.google}
            style={mapStyles}
            center={{
              lat: 40.854885,
              lng: -88.081807
            }}
            zoom={15}
          >
          </Map>
        </div>
    );
  }  

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCjcNRvL190F3_NI-7_pUYAPgAIG3w8Bm8'
})(MapZone);
