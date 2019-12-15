import React from 'react'
import ReactDOM from 'react-dom'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import $ from 'jquery';

import MapLegend from './legends'
import '../css/map/mapDesign.css'
import logo from '../images/logo.png'

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
    this.markerFactory = this.markerFactory.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.parameterAccumulator = this.parameterAccumulator.bind(this);
  }
  
  onMarkerClick(siteid) {
    this.props.showDescription(siteid);
  }

  parameterAccumulator(values, siteid){
	var sum = 0;
	return values[siteid].reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data != this.props.data || nextProps.legend != this.props.legend || nextProps.map_center != this.props.map_center;
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
    const mapStyles = { height: '100%'};
    const markers = this.markerFactory();

    const legend = <MapLegend legend = {this.props.legend} />;
    const latitude = parseFloat(this.props.map_center['lat'])
    const longitude = parseFloat(this.props.map_center['long'])
    return (
      <div className = 'mapDashboard'>
        <Map
          google={this.props.google}
          zoom={4}
          style={mapStyles}
          center={{ lat: parseFloat(this.props.map_center['lat']), lng: parseFloat(this.props.map_center['long'])}}
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