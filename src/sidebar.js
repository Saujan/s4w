import React, { Component } from 'react';
import { InputGroup, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import { Navbar, Container, Row, Col , FormControl,ListGroup, ListGroupItem} from 'react-bootstrap';
import Sidebar from "react-sidebar";
import './bootstrap.min.css';
import './App.css';
import './bootstrap-multiselect.css';
import Multiselect from 'react-bootstrap-multiselect';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import logo from './logo.png';
import MultiSelect from "@khanacademy/react-multi-select";
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const data = [{ value:'One', selected:true }, { value: 'Two' }, { value:'Three' }]
const data_multi = [{ value:'Nepal', selected:true }, { value: 'America' }, { value:'South Africa' }]
const options = [
  {label: "One", value: 1},
  {label: "Two", value: 2},
  {label: "Three", value: 3},
];

class sideBarContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : data_multi,
            start_date : new Date(),
            end_date : new Date(),
            selected : []
        };
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

    render(){
      const CustomStartDateInput = ({ value, onClick}) => (
          <Button className='btn btn-primary' onClick={onClick}>
              {'Start Date : ' + value}
          </Button>
      );
      const CustomEndDateInput = ({ value, onClick}) => (
          <InputGroup onClick={onClick}>
              <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">End Date</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={value}
                aria-label='End Date'
                aria-describedby="basic-addon1"
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
                <MultiSelect
                  options= {options}
                  selected={this.state.selected}
                  onSelectedChanged={selected => this.setState({selected})}
                  disableSearch={true}
                />
                </ListGroup.Item>
                <ListGroup.Item variant='info'>
                    <div className='bg-primary border border-dark rounded text-white'>
                        <Multiselect data={data} />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item variant='info'>
                    <div className='bg-primary border border-dark rounded text-white'>
                        <Multiselect data={data_multi} multiple>
                            <Button>Hello</Button>
                        </Multiselect>
                    </div>
                </ListGroup.Item>
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
                
              </ListGroup>
          </div>
      );
    }
}

export default sideBarContent;