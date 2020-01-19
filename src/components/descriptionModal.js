import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal, Tabs, Tab } from 'react-bootstrap';
import GraphP from './graphPlot';
import SingleGroupTable from './SingleGroupTable';

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
      <Tab eventKey="graph" title="Chart">
        <GraphP data={this.props.data} siteid={siteid}/>
      </Tab>
      : ''
    const active_tab = chart_tab != '' ? 'graph' : 'table'
    return (
      <Modal size='lg' show={true} onHide={this.props.hideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{'SiteName: '+data[SiteName][siteid] }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tabs defaultActiveKey={active_tab} id="uncontrolled-tab-example">
          {chart_tab}
          <Tab eventKey="table" title="Table">
            <SingleGroupTable data = {this.props.data} siteid = {siteid} monitors = {monitors}/>
          </Tab>
        </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )  
  }

}

export default DescriptionModal;