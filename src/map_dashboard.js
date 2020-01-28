import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Button, Modal } from 'react-bootstrap';

import './css/map/mapDesign.scss'
import './css/map/mixin.scss'
import './bootstrap.min.css'
import './App.css'
import MapLegend from './legend.js'
import { MdMenu } from 'react-icons/md';

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

  configIconPin(met_metric, color) {
    let icon_pin = {}
    icon_pin['fillColor'] = color
    if (met_metric) {
      icon_pin['path'] = 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z'
      icon_pin['fillOpacity'] = 1
      icon_pin['scale'] = 0.025
    } else {
      icon_pin['path'] = 'M 100 100 L 300 100 L 200 300 z'
      icon_pin['fillColor'] = color
      icon_pin['fillOpacity'] = 1
      icon_pin['scale'] = 0.07
    }
    return icon_pin
  }

  markerFactory(){
    let iconPin = ''
    let parameter_sum = 0
    const gps = this.props.data.trim()!="" ? JSON.parse(this.props.data) : "";
    if (gps != "") {
      return Object.keys(gps[SiteId])
              .map(function(site_key){
        iconPin = this.configIconPin(gps['met_metric'][site_key], gps[CategoryColor][site_key])
        parameter_sum = this.parameterAccumulator(gps[precip], site_key)
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
              lat: 27.6462,
              lng: 85.344075
            }}
            zoom={4}
          >
          {markers}
        </Map>

        {/* div component for legend starts */}
        <div className='legend-right'>
          <MapLegend legend={this.props.legend}/>
        </div>
        {/* div component for legend ends */}

        <div className='menu-left-button'>
          <div id='open-sidebar' onClick={this.controlSidebar}>
            <MdMenu size='2.25em'/>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCjcNRvL190F3_NI-7_pUYAPgAIG3w8Bm8'
})(MapDashboard);