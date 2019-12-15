import React from 'react'
import ReactDOM from 'react-dom'
//import { Modal, Button } from 'antd';
import { Button, Modal, Tabs, Tab } from 'react-bootstrap';
//import { Tabs } from 'antd';
import GraphP from './graphPlot';
import SingleGroupTable from './SingleGroupTable';
//import { Table, Divider, Tag } from 'antd';

//const { TabPane } = Tabs;
const SiteId = "_id.siteid";
const SiteName = "SiteName";
const SiteLat = "SiteLat";
const SiteLong = "SiteLong";
const precip = 'precip_mm'

class DescriptionModal extends React.Component {
  constructor(props){
    super(props)
    this.handleCancel = this.handleCancel.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data != this.props.data;
  }

  handleCancel() {
    this.props.hideModal();
  }
  
  render() {
    const data = JSON.parse(this.props.data);
    const siteid = this.props.siteId;
    const monitors = this.props.monitors;
     const chart_tab = data[precip][siteid].length > 1 ? 
      <GraphP data={this.props.data} siteid={siteid}/>
      : ''
    //const active_tab = chart_tab == '' ? '2' : '1'
    return (
      <Modal size='lg' show={true} onHide={this.props.hideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{'SiteName: '+data[SiteName][siteid] }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tabs defaultActiveKey="graph" id="uncontrolled-tab-example">
          <Tab eventKey="graph" title="Chart">
            {chart_tab}
          </Tab>
          <Tab eventKey="table" title="Table">
            Table data
          </Tab>
        </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.hideModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )  
  }

}

export default DescriptionModal;