import React, { Component } from 'react';
import { InputGroup, Button, OverlayTrigger, Tooltip, Spinner} from 'react-bootstrap';
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
import dateParamCreator  from './param_controller';
import {toast} from 'react-toastify';
import {ToastNotification} from './components/ToastNotification.js';
import ReactLoading from 'react-loading';

toast.configure();
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
//const URL = "http://192.168.1.2:5000/";
const URL = "http://35.193.141.235/";
const placeholder_project = 'Project(s)'
const placeholder_sitetype = 'SiteType'
const placeholder_parameter = 'Parameter(s)'
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

    toggleSpin() {
      let{ spin } = this.state.filterContent
      this.setState({
        filterContent:{
          ...this.state.filterContent,
          spin: !spin
        }
      })
    }

    checkPresenceOfData() {
      const { project, siteType, parameter, period, spin } = this.state.filterContent
      debugger
      if (project.selected.lenth < 1 || parameter.selected < 1){
        return false
      }
      return true
    }

    grabData(action_type) {
      if (this.checkPresenceOfData()){
        this.getData(action_type)
      }
      else {
        alert('Select the fields.');
      }
    }

    getData(action_type) {
      const { project, siteType, parameter, period, spin } = this.state.filterContent
      const periodParam = dateParamCreator(period)
      let params = {
        project: project.selected,
        sitetype: siteType.selected.value,
        parameter: parameter.selected,
        customize_date: periodParam
      }

      this.toggleSpin()

      fetch(URL+'api/filter_data', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Access-Control-Allow-Origin':'*'
        }
      }).then(response => response.json())
        .then(data => {
          this.toggleSpin()
          if (data['legend'].length > 0) {
            this.props.dataCollector(data['data'], data['monitor'], data['legend'], data['map_center']);
            ToastNotification('success',<strong>Data Loaded Successfully !</strong>);
          }
          else {
            ToastNotification('info',<strong>Empty Data.</strong>);
          }
        },(error) => {
          this.toggleSpin()
          ToastNotification('error',<strong>Error in Data Loading</strong>);
        });

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
      const { project, siteType, parameter, period, spin } = this.state.filterContent
      const is_parameter_present = siteType.currentSiteType && parameter[siteType.currentSiteType] && true ||  false
      // const spinContainer = spin ?  <Spinner animation="border" role="status">
      //                                 <span className="sr-only">Loading...</span>
      //                               </Spinner> : null
      const spinContainer = spin 
                            ? 
                            <ReactLoading type={'bars'} color={'black'} height={'20%'} width={'20%'} className='bubble-loading'/> 
                            : 
                            null
      return(
          <div>
              <ListGroup variant="flush dark" >
                <ListGroup.Item variant='dark'>
                  <img src={logo} width='100%' height='100%'/>
                </ListGroup.Item>
                <ListGroup.Item variant='dark'>
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
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <Select
                    value={siteType.selected}
                    onChange={selected => this.changeHandler( 'siteType', selected)}
                    options={siteType.option}
                    placeholder={placeholder_sitetype}
                  />
                </ListGroup.Item>
                
                <ListGroup.Item variant="dark">
                  
                  <MultiSelect
                    options= {is_parameter_present && parameter[siteType.currentSiteType].option || []}
                    selected={is_parameter_present && parameter.selected || []}
                    onSelectedChanged={selected => this.changeHandler('parameter', selected)}
                    disableSearch={true}
                    overrideStrings={{
                      selectSomeItems : placeholder_parameter,
                      selectAll: 'Check All'
                    }}
                  />
                </ListGroup.Item>
                
                <ListGroup.Item variant="dark">
                  <Select
                    value={period.selected}
                    onChange={(selected) => this.changeHandler( 'period', selected)}
                    options={period.option}
                    placeholder={placeholder_period}
                    isDisabled={!period.isRangeDateDisabled}
                  />
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <FormCheck 
                    custom
                    name='start-end-date'
                    onChange={(selected) => this.dateController(selected)}
                    type='checkbox'
                    id='start-end-date'
                    label='Start-End Date'
                    id='S-T-D'
                  />
                </ListGroup.Item>
                <ListGroup.Item variant='dark'>
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
                <ListGroup.Item variant='dark'>
                  <DatePicker
                      id='end_date'
                      selected={period.endDate}
                      onChange={this.handleChangeEndDate}
                      dateFormat='yyyy-MM-dd'
                      placeholderText='End Date'
                      disabled={period.isRangeDateDisabled}
                      customInput={<CustomEndDateInput/>}
                      // popperModifiers={{
                      //     offset: {
                      //       enabled: true,
                      //       offset: "0px, -5px"
                      //     }
                      //   }}
                  />
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <Button variant="outline-dark" size="sm" id='Map-View' onClick={()=> this.grabData('map')}block>
                        View Map
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <Button variant="outline-dark" size="sm" id='Taple-View' block>
                        View Table
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                    <Button variant="dark" size="sm" id='Download' block>
                      Download
                    </Button>
                </ListGroup.Item>
                
                <ListGroup.Item variant="dark" className="center-spinner">
                  {spinContainer}
                </ListGroup.Item>

              </ListGroup>
          </div>
      );
    }
}

export default sideBarContent;