import React, { Component } from 'react';
import { ButtonToolbar, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import { Navbar, Container, Row, Col , Image,ListGroup, ListGroupItem} from 'react-bootstrap';
import Sidebar from "react-sidebar";
import './bootstrap-multiselect.css';
import './bootstrap.min.css';
import Multiselect from 'react-bootstrap-multiselect';

const data = [{ value:'One', selected:true }, { value: 'Two' }, { value:'Three' }]
const data_multi = [{ value:'Nepal', selected:true }, { value: 'America' }, { value:'South Africa' }]

const sidebarStyles = {  
    margin : '20px 20px' 
}

class sideBarContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : {data}
        };
    }
    render(){
        return(
            <div>
                <ListGroup variant="flush">
                <ListGroup.Item>
                <DropdownButton id="dropdown-basic-button" onChange={this.handleChange} title='Select'>
                    <Dropdown.Item >Action</Dropdown.Item>
                    <Dropdown.Item >Another action</Dropdown.Item>
                    <Dropdown.Item >Something else</Dropdown.Item>
                </DropdownButton>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='bg-primary border border-dark rounded text-white'>
                        <Multiselect data={data} />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='bg-primary border border-dark rounded text-white'>
                        <Multiselect data={data_multi} multiple/>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    
                </ListGroup.Item>
                </ListGroup>
                
                
            </div>
        );
    }
}

export default sideBarContent;