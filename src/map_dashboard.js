import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Button, Modal } from 'react-bootstrap';
import './css/map/mapDesign.scss'
import './css/map/mixin.scss'

const SiteId = "_id.siteid";
const SiteName = "SiteName";
const SiteLat = "SiteLat";
const SiteLong = "SiteLong";
const CategoryColor = "colors";
const precip = 'precip_mm'
var iconPin = {
  path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
  fillColor: '#e50c0c',
  fillOpacity: 1,
  scale: 0.02, //to reduce the size of icons
};

class MapDashboard extends React.Component {
  constructor(props){
    super(props)
    this.controlSidebar = this.controlSidebar.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data != this.props.data;
  }

  controlSidebar(){
    this.props.controllSidebar(true)
  }

  parameterAccumulator(values, siteid){
    var sum = 0;
    return values[siteid].reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue))
  }

  markerFactory(){
    const gps = this.props.data.trim()!="" ? JSON.parse(this.props.data) : "";
    if (gps != "") {
      return Object.keys(gps[SiteId]).map(function(site_key){
        const iconPin = {
          path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
          fillColor: gps[CategoryColor][site_key],
          fillOpacity: 1,
          scale: 0.02, //to reduce the size of icons
        };
        var parameter_sum = this.parameterAccumulator(gps[precip], site_key);
        return (
            <Marker onClick = {(e) => {this.props.showDescription(site_key, gps[SiteLat][site_key], gps[SiteLong][site_key]);}}
            //title={gps[SiteName][site_key] + parameter_sum}
            title={parameter_sum + " mm"}
            name={gps[SiteName][site_key]+ 'Lat: '+gps[SiteLat][site_key]+ 'Lng: '+gps[SiteLong][site_key]}
            key = {site_key}
            icon={iconPin}
            position={{lat: gps[SiteLat][site_key], lng: gps[SiteLong][site_key]}} >
            </Marker>
        )
      },this);
    }
    else {
      return ""
    }
  }
  render() {
    const mapStyles = { 'position': 'absolute' };
    const markers = this.props.data && true ? this.markerFactory() : null;
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
        {markers}
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