import React, { Component } from 'react';
import './App.css';
import { Navbar, ButtonToolbar, Container, Row, Col , Button,Image} from 'react-bootstrap';
import Sidebar from "react-sidebar";
import SideBarContent from './sidebar.js';
import './bootstrap-multiselect.css';
import Multiselect from 'react-bootstrap-multiselect';

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
    return(
      <Container fluid>
        <Row>
          <Sidebar
            sidebar={<SideBarContent />}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" , width:'200px', position:'fixed'} }}
            pullRight={false}
          >    
          <Button onClick={() => this.onSetSidebarOpen(true)} variant='primary'>
            Open sidebar
          </Button>
        </Sidebar>
        </Row>
        <Row>
          <Image 
            src = 'https://wallpaperaccess.com/full/439801.jpg'
            fluid/>
        </Row>
        <Row>
          <Image 
            src = 'https://wallpaperaccess.com/full/439801.jpg'
            fluid/>
        </Row>
        <Row>
          <Image 
            src = 'https://wallpaperaccess.com/full/439801.jpg'
            fluid/>
        </Row>
        <Row>
          <Image 
            src = 'https://wallpaperaccess.com/full/439801.jpg'
            fluid/>
        </Row>
        <Row>
          <Image 
            src = 'https://wallpaperaccess.com/full/439801.jpg'
            fluid/>
        </Row>
      </Container>
      
    )
  }
}

export default App;
