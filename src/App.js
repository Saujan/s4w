import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import { Navbar, ButtonToolbar, Container, Row, Col , Button,Image} from 'react-bootstrap';
import Sidebar from "react-sidebar";
import SideBarContent from './sidebar.js';
import './bootstrap-multiselect.css';
import Multiselect from 'react-bootstrap-multiselect';
import MapDashboard from './map_dashboard'
import DescriptionModal from './components/descriptionModal';

const data = [{ value:'One', selected:true }, { value: 'Two' }, { value:'Three' }]
const URL = "http://192.168.1.2:5000/";

const sidebarStyles = {
	
}

class App extends Component {
  constructor(props) {
	super(props);
  this.state = {
    filterContent: {
      project: {
        option:[
          {'label': 'S4W-Nepal', 'value': 'NP'},
          {'label': 'S4W-CA', 'value': 'CA'},
          {'label': 'S4W-Africa', 'value': 'AF'}
        ],
        selected:['NP', 'CA', 'AF']
      },
      siteType: {
        option: [
          {label: 'Groundwater (Level, Water Quality, Flow, etc.)', value: 'GW'},
          {label: 'Land (Land-use, soil moisture, infiltration, soiltype, geology, etc.)', value: 'LD'},
          {label: "Precipitation", value: "PT"}
        ],
        //selected: {label: "Precipitation", value: "PT"}
        selected: null,
        currentSiteType: null
      },
      parameter: {
        'GW': {
          option:[
            {'label': 'Precipitation', 'value': 'Precip'},
            {'label': 'WaterLevel', 'value': 'WL'}
          ]
        },
        'PT': {
          option:[
            {'label': 'PT 1', 'value': 'Precip'},
            {'label': 'PT 2', 'value': 'WL'}
          ]
        },
        'LD': {
          option:[
            {'label': 'LD 1', 'value': 'Precip'},
            {'label': 'LD 2', 'value': 'WL'}
          ]
        },
        selected:[]
      },
      period: {
        option:[
          {'value':'today', 'label':'Today'},
          {'value':'last_day', 'label':'Yesterday'},
          {'value':'last_3_days', 'label':'Last 3 Days'},
          {'value':'last_week', 'label':'Last Week'},
          {'value':'last_30_days', 'label':'Last 30 Days'},
          {'value':'last_365_days', 'label':'Last Year'}
        ],
        //selected: {'value':'today', 'label':'Today'}
        selected: null,
        isRangeDateDisabled: true,
        startDate: null,
        endDate: null
      },
      fetchedFilterContent: false,
      spin: false
    },
    sidebarOpen: false,
    mapData: {
      data: null,
      monitor_details: null,
      legend: null,
      map_center: null
    },
    currentView: {
      map: true,
      table: false
    },
    showModal: {
      show: false,
      siteId: null,
      lat: null,
      lng: null
    }
    
  };

	this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
	this.setState({ sidebarOpen: open });
  }

  componentDidMount() {
    $.ajax({
      url: URL+'api/filter_content',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          filterContent: {
            ...this.state.filterContent,
            project: data.project,
            siteType: data.siteType,
            parameter: data.parameter,
            fetchedFilterContent: true
          },

        })
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });

  }

  dataCollector(data, monitors, legend, lat_lon) {
    console.log('from collector')
    this.setState({
      mapData:{
        data: data,
        monitor_details: monitors,
        legend: legend,
        map_center: lat_lon
      },
      filterContent: {
        ...this.state.filterContent,
        spin: false
      }
    });
  }

  showDescription(siteId, lat, lng) {
    this.setState({
      showModal: {
        show: true,
        siteId: siteId,
        lat: lat,
        lng: lng
      }
    })
  }

  hideModal() {
    this.setState({
      showModal: {
        ...this.state.showModal,
        show: false
      }
    })
  }
  

  render(){
    let show_button = this.state.show_button;
    let mapDetail = this.state.currentView.map ? <MapDashboard  controllSidebar={this.onSetSidebarOpen} data={this.state.mapData.data} showDescription={this.showDescription.bind(this)} legend = {this.state.mapData.legend} map_center = {this.state.mapData.map_center}/> : ''
    let descriptionModal = this.state.showModal.show ? 
      <DescriptionModal 
          data={this.state.mapData.data} 
          siteId= {this.state.showModal.siteId} 
          hideModal={this.hideModal.bind(this)} 
          monitors = {this.state.mapData.monitor_details} 
          lat = {this.state.showModal.lat} 
          lng = {this.state.showModal.lng}
      /> 
      : ""
    console.log('From Parent=> '+ this.state.filterContent.spin)
    return( this.state.filterContent.fetchedFilterContent ?
          (<div>
            <Sidebar
              sidebar={<SideBarContent filterContent={this.state.filterContent} dataCollector ={this.dataCollector.bind(this)}/>}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              styles={{ sidebar: { background: '#bee5eb' , width:'275px', position:'fixed'} }}
              pullRight={false}
            >
              { mapDetail }
              {descriptionModal}
            </Sidebar>
                
              
              
            </div>
          ): null)
  }
}

export default App;
