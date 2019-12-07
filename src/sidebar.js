import React, { Component } from 'react';
import { InputGroup, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { FormCheck, Container, Row, Col , FormControl,ListGroup, ListGroupItem} from 'react-bootstrap';
import Sidebar from "react-sidebar";
import Select from 'react-select';
import './bootstrap.min.css';
import './bootstrap-multiselect.css';
import Multiselect from 'react-bootstrap-multiselect';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import logo from './logo.png';
import MultiSelect from "@khanacademy/react-multi-select";
import './App.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const data = [{ value:'One', selected:true }, { value: 'Two' }, { value:'Three' }]
const data_multi = [{ value:'Nepal', selected:true }, { value: 'America' }, { value:'South Africa' }]
const options = [
  {label: "One", value: 1},
  {label: "Two", value: 2},
  {label: "Three", value: 3},
];
const single_options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class sideBarContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : data_multi,
            start_date : new Date(),
            end_date : new Date(),
            selected : [],
            single_dropdown_content_1 : 'Single Item Dropdown',
            selectedOption : ''
        };
        this.handleSingleItemDropdown = this.handleSingleItemDropdown.bind(this);
    }

    handleChangeStartDate = date => {
      this.setState({
        start_date: date
      });
    };

    handleChangeEndDate = date => {
      this.setState({
          end_date: date
      });
    };

    handleSingleItemDropdown(value){
      this.setState({ selectedOption : value});
    };

    render(){
      const CustomStartDateInput = ({ value, onClick}) => (
        <InputGroup onClick={onClick}>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Start Date</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={value}
              aria-label='Start Date'
              aria-describedby="basic-addon1"
            />
        </InputGroup>
      );
      const CustomEndDateInput = ({ value, onClick}) => (
          <InputGroup onClick={onClick}>
              <InputGroup.Prepend className="Hero">
              <InputGroup.Text id="basic-addon2">End   Date</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={value}
                aria-label='End Date'
                aria-describedby="basic-addon2"
              />
          </InputGroup>
      );

      return(
          <div>
              <ListGroup variant="flush info" >
                <ListGroup.Item variant='info'>
                  <img src={logo} width='100%' height='100%'/>
                </ListGroup.Item>
                <ListGroup.Item variant='info'>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id='MultiSelect'>
                        Information
                      </Tooltip>
                    }
                  >
                    <MultiSelect
                      options= {options}
                      selected={this.state.selected}
                      onSelectedChanged={selected => this.setState({selected})}
                      disableSearch={true}
                      overrideStrings={{
                        selectSomeItems : 'Select Multiple',
                        selectAll: 'Check ALL'
                      }}
                    />
                  </OverlayTrigger>
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleSingleItemDropdown}
                    options={single_options}
                    placeholder='Select Single'
                  />
                </ListGroup.Item>
                
                <ListGroup.Item variant="info">
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleSingleItemDropdown}
                    options={single_options}
                    placeholder='Select Single'
                  />
                </ListGroup.Item>
                
                <ListGroup.Item variant="info">
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleSingleItemDropdown}
                    options={single_options}
                    placeholder='Select Single'
                  />
                </ListGroup.Item>
                {/* <ListGroup.Item variant='info'>
                <DropdownButton id="dropdown-basic-button" onChange={this.handleDropdownChangeSingleItem} title={this.state.single_dropdown_content_1} className="Hero" >
                  <Dropdown.Item href="#/action-1">Single Item</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Single Item Item</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Single Item Item Item</Dropdown.Item>
                </DropdownButton>
                </ListGroup.Item> */}
                {/* <ListGroup.Item variant='info'>
                    <div className='bg-primary border border-dark rounded text-white'>
                        <Multiselect data={data_multi} multiple>
                            <Button>Hello</Button>
                        </Multiselect>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item variant='info'>
                    <div className='bg-light border border-dark rounded'>
                        <Multiselect data={data_multi}>
                            <Button>Hello</Button>
                        </Multiselect>
                    </div>
                </ListGroup.Item> */}
                <ListGroup.Item variant='info'>
                  <DatePicker
                      id='start_date'
                      selected={this.state.start_date}
                      onChange={this.handleChangeStartDate}
                      dateFormat='yyyy-MM-dd'
                      placeholderText='Start Date'
                      customInput={<CustomStartDateInput/>}
                  />
                </ListGroup.Item>
                <ListGroup.Item variant='info'>
                  <DatePicker
                      id='end_date'
                      selected={this.state.end_date}
                      onChange={this.handleChangeEndDate}
                      dateFormat='yyyy-MM-dd'
                      placeholderText='End Date'
                      customInput={<CustomEndDateInput/>}
                      popperModifiers={{
                          offset: {
                            enabled: true,
                            offset: "0px, -5px"
                          }
                        }}
                  />
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  <FormCheck 
                    custom
                    name='start-end-date'
                    onChange={()=>console.log('Form checked')}
                    type='checkbox'
                    id='start-end-date'
                    label='Start-End Date'
                    id='S-T-D'
                  />
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  <Button variant="outline-info" id='Map-View' block>
                        View Map
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  <Button variant="outline-info" id='Taple-View' block>
                        View Table
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>
                        Hello
                      </Tooltip>
                    }
                  >
                    <Button variant="info" id='Download' block>
                          Download
                    </Button>
                  </OverlayTrigger>
                </ListGroup.Item>
                
                <ListGroup.Item variant="info">
                  
                </ListGroup.Item>
              </ListGroup>
          </div>
      );
    }
}

export default sideBarContent;