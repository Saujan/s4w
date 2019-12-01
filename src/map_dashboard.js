import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Button } from 'react-bootstrap';
import './css/map/mapDesign.scss'
import './css/map/mixin.scss'

class MapDashboard extends React.Component {
  constructor(props){
    super(props)
    this.controlSidebar = this.controlSidebar.bind(this)
  }

  controlSidebar(){
    this.props.controllSidebar(true)
  }
  render() {
    const mapStyles = { 'position': 'absolute' };
    return (
      <div>
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
        <div className="filter_button_containter">
            <Button onClick={this.controlSidebar}>Filter Portion</Button>
        </div>
        </div>
    );
  }  

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCjcNRvL190F3_NI-7_pUYAPgAIG3w8Bm8'
})(MapDashboard);