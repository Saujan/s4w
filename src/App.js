import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import { Navbar, ButtonToolbar, Container, Row, Col , Button,Image} from 'react-bootstrap';
import Sidebar from "react-sidebar";
import SideBarContent from './sidebar.js';
import './bootstrap-multiselect.css';
import Multiselect from 'react-bootstrap-multiselect';
import MapDashboard from './map_dashboard'

const data = [{ value:'One', selected:true }, { value: 'Two' }, { value:'Three' }]
const URL = "http://192.168.1.4:5000/";

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
      spin: true
    },
    sidebarOpen: false,
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

  render(){
    let show_button = this.state.show_button;
    return( this.state.filterContent.fetchedFilterContent ?
          (
            <Sidebar
              sidebar={<SideBarContent filterContent={this.state.filterContent}/>}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              styles={{ sidebar: { background: '#bee5eb' , width:'275px', position:'fixed'} }}
              pullRight={false}
            >
              <MapDashboard controllSidebar = {this.onSetSidebarOpen}/>
            </Sidebar>
          ): null)
  }
}

export default App;
