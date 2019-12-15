import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery';
//import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import FilterPortion from './index';
import MapDashboard from './mapDashboard';
import TableDashboard from './tableDashboard';
import DescriptionModal from './descriptionModal';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      view: 'map',
      showModal: false,
      siteid: 0,
      lat: 0,
      lng: 0,
      data:'',
      monitor_details: {},
      legend: [],
      map_center: {'lat':27.64, long: 85.34 }
    };
    this.onCollapse = this.onCollapse.bind(this);
    this.outputState = this.outputState.bind(this);
    this.dataCollector = this.dataCollector.bind(this);
    this.showDescription = this.showDescription.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  onCollapse(e){
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  dataCollector(data, monitors, legend, lat_lon){
    this.setState({
      data: data,
      monitor_details: monitors,
      legend: legend,
      map_center: lat_lon
    });
  }

  outputState(viewing){
    this.setState({
        view: viewing
        }
    )
  }

  showDescription(siteid, lat, lng){
    console.log(siteid);
    this.setState({
      showModal: !this.state.showModal,
      siteid: siteid,
      lat: lat,
      lng: lng
      }
    )
  }

  hideModal(){
    this.setState({
        showModal: false
      });
    }

  render() {
    const viewing = this.state.view == "map" ? <MapDashboard data={this.state.data} showDescription={this.showDescription} legend = {this.state.legend} map_center = {this.state.map_center}/> : <TableDashboard data={this.state.data}/>
    const descriptionModal = this.state.showModal ? <DescriptionModal data={this.state.data} siteid= {this.state.siteid} hideModal={this.hideModal} monitors = {this.state.monitor_details} lat = {this.state.lat} lng = {this.state.lng}/> : ""
    return (
      <Layout style={{ height: '100%' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <FilterPortion view ={this.outputState} dataCollector={this.dataCollector} hide_state = {this.state.collapsed}/>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 0px' }}>
            <div style={{height: '100% width: 100%'}}>
              {viewing}
            </div>

          </Content>
          {descriptionModal}
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;