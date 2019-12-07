import React, { Component } from 'react';
import './App.css';
import { Navbar, ButtonToolbar, Container, Row, Col , Button,Image} from 'react-bootstrap';
import Sidebar from "react-sidebar";
import SideBarContent from './sidebar.js';
import './bootstrap-multiselect.css';
import Multiselect from 'react-bootstrap-multiselect';
import MapDashboard from './map_dashboard'

const data = [{ value:'One', selected:true }, { value: 'Two' }, { value:'Three' }]

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
        currentSiteType: 'GW'
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
      }
    },
    sidebarOpen: false
  };

	this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
	this.setState({ sidebarOpen: open });
  }

  render(){
    let show_button = this.state.show_button;
    return(
          <Sidebar
            sidebar={<SideBarContent filterContent={this.state.filterContent}/>}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: '#bee5eb' , width:'275px', position:'fixed'} }}
            pullRight={false}
          >
        <MapDashboard controllSidebar = {this.onSetSidebarOpen}/>
        </Sidebar>

    )
  }
}

export default App;
