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

const placeholder_project = 'Project'
const placeholder_sitetype = 'SiteType'
const placeholder_parameter = 'Parameter'
const placeholder_period = 'Period'

class sideBarContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterContent: props.filterContent
        };
    }

    handleChangeStartDate = date => {
      this.setState({
        filterContent: {
          ...this.state.filterContent,
          period: {
            ...this.state.filterContent.period,
            startDate: date
          }
        }
      });
    };

    handleChangeEndDate = date => {
      this.setState({
        filterContent: {
          ...this.state.filterContent,
          period: {
            ...this.state.filterContent.period,
            endDate: date
          }
        }
      });
    };

    handleSingleItemDropdown(value){
      this.setState({ selectedOption : value});
    };

    changeHandler(idendity, value) {
      let valueSet = {...this.state.filterContent[idendity]}
      valueSet.selected = value
      if (idendity != 'siteType'){
        this.setState({
          filterContent: {
            ...this.state.filterContent,
            [idendity]: valueSet
          }
        });
      }
      else {
        valueSet.currentSiteType = value.value
        this.setState({
          filterContent: {
            ...this.state.filterContent,
            [idendity]: valueSet,
            parameter: {
              ...this.state.filterContent.parameter,
              selected: []
            }
          }
        });

      }
    }

    dateController(e) {
      this.setState({
        filterContent: {
          ...this.state.filterContent,
          period: {
            ...this.state.filterContent.period,
            isRangeDateDisabled: !e.target.checked
          }
        }
      })
    }

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
              <InputGroup.Text id="basic-addon2">End Date</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={value}
                aria-label='End Date'
                aria-describedby="basic-addon2"
              />
          </InputGroup>
      );
      const { project, siteType, parameter, period } = this.state.filterContent
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
                      options= {project.option}
                      selected={project.selected}
                      onSelectedChanged={selected => this.changeHandler('project', selected)}
                      disableSearch={true}
                      overrideStrings={{
                        selectSomeItems : placeholder_project,
                        selectAll: 'Check All'
                      }}
                    />
                  </OverlayTrigger>
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  <Select
                    value={siteType.selected}
                    onChange={selected => this.changeHandler( 'siteType', selected)}
                    options={siteType.option}
                    placeholder={placeholder_sitetype}
                  />
                </ListGroup.Item>
                
                <ListGroup.Item variant="info">
                  
                  <MultiSelect
                    options= {siteType.currentSiteType.length && parameter[siteType.currentSiteType].option || []}
                    selected={siteType.currentSiteType.length && parameter.selected || []}
                    onSelectedChanged={selected => this.changeHandler('parameter', selected)}
                    disableSearch={true}
                    overrideStrings={{
                      selectSomeItems : placeholder_parameter,
                      selectAll: 'Check All'
                    }}
                  />

                </ListGroup.Item>
                
                <ListGroup.Item variant="info">
                  <Select
                    value={period.selected}
                    onChange={selected => this.changeHandler( 'period', selected)}
                    options={period.option}
                    placeholder={placeholder_period}
                    isDisabled={!period.isRangeDateDisabled}
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
                <ListGroup.Item variant="info">
                  <FormCheck 
                    custom
                    name='start-end-date'
                    onChange={selected => this.dateController(selected)}
                    type='checkbox'
                    id='start-end-date'
                    label='Start-End Date'
                    id='S-T-D'
                  />
                </ListGroup.Item>
                <ListGroup.Item variant='info'>
                  <DatePicker
                      id='start_date'
                      selected={period.startDate}
                      onChange={this.handleChangeStartDate}
                      dateFormat='yyyy-MM-dd'
                      placeholderText='Start Date'
                      disabled={period.isRangeDateDisabled}
                      customInput={<CustomStartDateInput/>}

                  />
                </ListGroup.Item>
                <ListGroup.Item variant='info'>
                  <DatePicker
                      id='end_date'
                      selected={period.endDate}
                      onChange={this.handleChangeEndDate}
                      dateFormat='yyyy-MM-dd'
                      placeholderText='End Date'
                      disabled={period.isRangeDateDisabled}
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