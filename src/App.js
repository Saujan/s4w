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
            sidebar={<SideBarContent />}
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
