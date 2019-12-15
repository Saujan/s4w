import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery';
import 'antd/dist/antd.css';
import { Menu, Icon, Button, Spin, DatePicker,Checkbox } from 'antd';
import moment from 'moment'

import FilterSelect from './cselect';
import MyNotification from './my_notification';
import FilterMenuValidation from './filter_menu_validation';
//const URL = "http://35.193.141.235/";
const URL = "http://192.168.1.4:5000/";
const { SubMenu } = Menu;

class FilterPortion extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    collapsed: false,
    'data'  : {'sitetypes':
                           [{'text': 'Groundwater (Level, Water Quality, Flow, etc.)', 'value': 'GW'},
                           {'text': 'Land (Land-use, soil moisture, infiltration, soiltype, geology, etc.)', 'value': 'LD'},
                           {text: "Precipitation", value: "PT"}],
              'parameters': {'GW':
                                 [{'text': 'Precipitation', 'value': 'Precip'},
                                 {'text': 'WaterLevel', 'value': 'WL'}],
                                 'PT':
                                 [{'text': 'Precipitation', 'value': 'Precip'},
                                 {'text': 'WaterLevel', 'value': 'WL'}]},
              'projects': [{'text': 'S4W-Nepal', 'value': 'NP'},
                            {'text': 'S4W-CA', 'value': 'CA'},
                            {'text': 'S4W-NL', 'value': 'NL'},
                            {'text': 'S4W-Myanmar', 'value': 'MM'},
                            {'text': 'S4W-Africa', 'value': 'AF'}]},
    'dates':[{'value':'today', 'text':'Today'},
             {'value':'last_day', 'text':'Yesterday'},
             {'value':'last_3_days', 'text':'Last 3 Days'},
             {'value':'last_week', 'text':'Last Week'},
             {'value':'last_30_days', 'text':'Last 30 Days'},
             {'value':'last_365_days', 'text':'Last Year'}
             ],
    'project': 'NP',
    'parameter':'Precip',
    'sitetype': 'PT',
    'dates_today': 'today',
    'start_date': '',
    'end_date': '',
    'relation' :{'project':'parameter'},
    'spin'     :false,
    'customDateDisabled':true
  };
  this.toggleCollapsed = this.toggleCollapsed.bind(this);
  this.changeFilter = this.changeFilter.bind(this);
  this.toggleSpin    = this.toggleSpin.bind(this);
  this.dateSelection = this.dateSelection.bind(this);
  this.mapDetail = this.mapDetail.bind(this);
  this.set_filter_content = this.set_filter_content.bind(this);
  this.filter_menu = this.filter_menu.bind(this);
  this.filterContentRequest = this.filterContentRequest.bind(this);
  this.buildDateQuery = this.buildDateQuery.bind(this);
  this.setStartDate = this.setStartDate.bind(this);
  this.setEndDate = this.setEndDate.bind(this);
  }

  componentWillUpdate(nextProps, nextState){
    console.log("will update spinnning")
  }

  componentDidUpdate(){
    console.log("did update spinnning")
  }

  componentDidMount(){
    this.filterContentRequest()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const filter_content_change = nextState.data != this.state.data
    const sitetype_change = nextState.sitetype!=this.state.sitetype
    const spin_change = nextState.spin!= this.state.spin
    const customDateDisabled_change = nextState.customDateDisabled != this.state.customDateDisabled
    const hide_state_change = nextProps.hide_state != this.props.hide_state
    const condition = filter_content_change || sitetype_change || spin_change || customDateDisabled_change || hide_state_change
    return condition
     ;
  }

  buildDateQuery(){
    if (this.state.customDateDisabled){
      return {range: false, date:this.state.dates_today }
    }
    else{
      return {range: true, start_date:this.state.start_date, end_date: this.state.end_date}
    }
  }
  set_filter_content(filter_data){
    this.setState({
      data: filter_data
    })
  }

  toggleCollapsed(){
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  changeFilter(type, value){
    this.setState(
          {
            [type] : value
          }
        )

  }

  dateSelection(e){
    this.setState(
    {
      'customDateDisabled': !e.target.checked
    }
    )
  }

  setStartDate(date, dateString){
    this.setState(
    {
      'start_date': dateString
    }
    )
  }

  setEndDate(date, dateString){
    this.setState(
    {
      'end_date': dateString
    }
    )
  }

  mapDetail(e){
    e.preventDefault();
    this.mapRequest();
  }

  toggleSpin(){
    this.setState( {'spin':!this.state.spin} )
  }

  filterContentRequest(){
    debugger
    $.ajax({
      url: URL+'api/filter_content',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.set_filter_content(data)
        this.mapRequest()
      }.bind(this),
      error: function(xhr, status, err) {
        debugger
        MyNotification('error', 'Error Connecting Backend Server')
      }.bind(this)
    });
  }

  mapRequest(){
    if (FilterMenuValidation.valid_date_intervals(this.buildDateQuery())){
      this.toggleSpin();
      const query = { 'project': this.state.project, 'sitetype': this.state.sitetype, 'parameter': this.state.parameter, 'customize_date': this.buildDateQuery()}
      console.log(query)
      debugger
      fetch(URL+'api/filter_data', {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => response.json())
        .then(data => {
          this.toggleSpin();
          if (data['legend'].length > 0) {
            this.props.dataCollector(data['data'], data['monitor'], data['legend'], data['map_center']);
            MyNotification('success', 'Data Loaded');
          }
          else {
            MyNotification('success', 'No data');
          }
        },(error) => {
          this.toggleSpin();
          MyNotification('error', 'Error Connecting Backend Server')
        });
    }
    else{
      MyNotification('error', 'StartDate cant be greater than EndDate.')
    }
  }

  filter_menu(projects, options, datesOptions, dateFormat, parameters,spinner){
    let icon = this.props.hide_state ? <Icon/> : ''
    console.log('icon - >'+this.props.hide_state)
    return (
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          inlineCollapsed={this.props.hide_state}
          theme= "light"
        >
          <Menu.Item key="1">
          {icon}
            <span><FilterSelect options ={projects} type = "project" changeFilter = {this.changeFilter} disable = {false} selected_option = {this.state.project}/></span>
          </Menu.Item>

          <Menu.Item key="10">
            {icon}
            <span><FilterSelect options ={options} type = "sitetype" changeFilter = {this.changeFilter} disable = {true} selected_option = {this.state.sitetype}/></span>
          </Menu.Item>

          <Menu.Item key="2">
            {icon}
            <span><FilterSelect options ={parameters} type = "parameter" changeFilter = {this.changeFilter} disable = {true} selected_option = {this.state.parameter}/></span>
          </Menu.Item>
          <Menu.Item key="3">
            {icon}
            <span><FilterSelect options ={datesOptions} type = "dates_today" changeFilter = {this.changeFilter} disable = {!this.state.customDateDisabled} selected_option = {this.state.dates_today}/></span>
          </Menu.Item>
          <Menu.Item key = "4">
            {icon}
            <span><Checkbox onChange={this.dateSelection} disabled = {false}>Start-End Date</Checkbox></span>
          </Menu.Item>
          <Menu.Item key="5">
            {icon}
            <span><DatePicker format={dateFormat} size={"small"} style = {{ width: '90%'}} placeholder="start date" disabled = {this.state.customDateDisabled} onChange = {this.setStartDate}/></span>
          </Menu.Item>
          <Menu.Item key="6">
            {icon}
            <span><DatePicker format={dateFormat} size={"small"} style = {{ width: '90%'}} placeholder="end date" disabled = {this.state.customDateDisabled} onChange = {this.setEndDate}/></span>
          </Menu.Item>
          <Menu.Item key="7">
            {icon}
            <span><Button type="primary" onClick={this.mapDetail}>View Map</Button></span>
          </Menu.Item>

          <Menu.Item key="8">
            {icon}
            <span><Button type="primary" onClick={this.getDetail} disabled = {true}>View Table</Button></span>
          </Menu.Item>

          <Menu.Item key="9">
            {icon}
            <span><Button type="primary" onClick={this.getDetail} disabled = {true}>Download</Button></span>
          </Menu.Item>
          {spinner}
        </Menu>
      )

  }




  render() {
    const projects = this.state.data.projects;
    const siteTypes = this.state.data.sitetypes;

    const currentSitetype = this.state.sitetype
    const parameters = this.state.data.parameters[currentSitetype];

    const datesOptions = this.state.dates;
    const dateFormat = 'YYYY-MM-DD';

    const spinner = this.state.spin ? <Menu.Item key="0"> <Icon/><span><Spin /></span> </Menu.Item> : <Menu.Item key="0"> <Icon/><span></span> </Menu.Item>

    const content = (projects!= undefined && projects.length) ? this.filter_menu(projects, siteTypes, datesOptions, dateFormat, parameters) : <div>No thing</div>
    const filled_menu = (projects!= undefined && projects.length)
    return (
      (this.filter_menu(projects, siteTypes, datesOptions, dateFormat, parameters,spinner))
    )
  }
}

export default FilterPortion;