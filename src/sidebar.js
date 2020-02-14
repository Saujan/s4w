import React, { Component } from 'react';
import { InputGroup, Button, OverlayTrigger, Tooltip, Spinner, ButtonGroup} from 'react-bootstrap';
import { FormCheck, Container, Row, Col , FormControl,ListGroup, ListGroupItem} from 'react-bootstrap';
import { AiTwotoneSetting } from "react-icons/ai";
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
//const URL = "http://192.168.1.8:5000/";
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

    componentDidMount(){
      this.grabData('map')
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

    changeMetric(e, identity) {
      const value = e.target.value
      this.setState({
        filterContent: {
          ...this.state.filterContent,
          setMetric: {
            ...this.state.filterContent.setMetric,
            [identity]: value
          }
        }
      })
    }

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

    qualityMetricController(e) {
      this.setState({
        filterContent: {
          ...this.state.filterContent,
          show_partial_records: e.target.checked
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

    processResponse(action_type, data) {
      if (action_type === 'map') {
        if (data['legend'].length > 0) {
          this.props.dataCollector(data['data'], data['monitor'], data['legend'], data['map_center']);
          ToastNotification('success',<strong>Data Loaded Successfully !</strong>);
        }
        else {
          ToastNotification('info',<strong>Empty Data.</strong>);
        }
      } else if (action_type === 'download') {
        if (data != ''){
          window.location.href = URL+data['filepath']
          ToastNotification('success',<strong>File is downloading !</strong>); 
        } else {
          ToastNotification('success',<strong>No Data !</strong>)
        }
      } else if (action_type === 'table') {
        if (data['data'].length > 0) {
          this.props.tableDataCollector(data);
          ToastNotification('success',<strong>Data Loaded Successfully !</strong>);
        } else {
          ToastNotification('info',<strong>Empty Data.</strong>);
        }

      } else {

      }

    }

    getData(action_type) {
      const { project, siteType, parameter, period, spin, show_partial_records } = this.state.filterContent
      const periodParam = dateParamCreator(period)
      let { weekly, overlapRatio } = this.state.filterContent.setMetric
      if (isNaN(weekly) || isNaN(overlapRatio)) {
        ToastNotification('error',<strong>Metric data should be number.</strong>);
        return 0;
      }
      let params = {
        project: project.selected,
        sitetype: siteType.selected.value,
        parameter: parameter.selected,
        customize_date: periodParam,
        show_partial_records: show_partial_records,
        action_type: action_type,
        metric: { weekly: weekly, overlapRatio: overlapRatio }
      }
      this.toggleSpin()

      let final_url = URL;
      final_url+='api/filter_data'

      fetch(final_url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Access-Control-Allow-Origin':'*'
        }
      }).then(response => response.json())
        .then(data => {
          this.toggleSpin()
          this.processResponse(action_type, data)
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
      let { weekly, overlapRatio } = this.state.filterContent.setMetric    
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
                    onChange={(selected) => this.qualityMetricController(selected)}
                    type='checkbox'
                    id='quality_metric'
                    label='Show all sites that may only contain partial records for the selected period'
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
                  />
                </ListGroup.Item>
                <ListGroup.Item variant='dark'>
                  <Row>
                    <Col xs={6} md={6}>
                      <InputGroup>
                        <OverlayTrigger
                          key={'top'}
                          placement={'top'}
                          overlay={
                            <Tooltip id={`tooltip-'top'`}>
                              Set Weekly Measurements<br></br>
                              Default: (n/7)<br></br>
                              n : No. of days in selected time period 
                            </Tooltip>
                          }>
                          <InputGroup.Prepend>
                            <InputGroup.Text id="btnGroupAddon"><AiTwotoneSetting /></InputGroup.Text>
                          </InputGroup.Prepend>
                        </OverlayTrigger>
                        <FormControl
                          type="text"
                          placeholder={weekly}
                          aria-label="Input group example"
                          aria-describedby="btnGroupAddon"
                          value={weekly}
                          onChange={(e) => this.changeMetric(e, 'weekly')}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs={6} md={6}>
                      <InputGroup>
                        <OverlayTrigger
                          key={'top'}
                          placement={'top'}
                          overlay={
                            <Tooltip id={`tooltip-'top'`}>
                              Overlap Ratio:<br></br>
                              (site max date - site min date)/(number of days in selected period -1)
                            </Tooltip>
                          }>
                          <InputGroup.Prepend>
                            <InputGroup.Text id="btnGroupAddon"><AiTwotoneSetting /></InputGroup.Text>
                          </InputGroup.Prepend>
                        </OverlayTrigger>
                        <FormControl
                          type="text"
                          placeholder=""
                          aria-label="Input group example"
                          aria-describedby="btnGroupAddon"
                          value={overlapRatio}
                          onChange={(e) => this.changeMetric(e, 'overlapRatio')}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <Button variant="outline-dark" size="sm" id='Map-View' onClick={()=> this.grabData('map')} block>
                        View Map
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                  <Button variant="outline-dark" size="sm" id='Taple-View' onClick={()=> this.grabData('table')}block>
                        View Table
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item variant="dark">
                    <Button variant="outline-dark" size="sm" id='Download' onClick={()=> this.grabData('download')} block>
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