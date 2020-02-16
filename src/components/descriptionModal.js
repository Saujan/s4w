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

  isChartShowable() {
    const measureable_columns_property = this.props.measureableColumnsProperty
    let data = JSON.parse(this.props.data)
    let siteid = this.props.siteId

    if (measureable_columns_property['measureable'].length > 0){
        let showable = measureable_columns_property['measureable'].filter(function(column){
          return data[column][siteid].length > 0
        })
        return {'showable': true, 'eventKey': showable[0]}
    }
    else {
      return {'showable': false, 'eventKey': ''}
    }
    
  }

  buildCharts() {
    const siteid = this.props.siteId;
    const measureable_columns_property = this.props.measureableColumnsProperty
    const data = this.props.data
    return measureable_columns_property['measureable'].map(function(column, index){
      return <Tab eventKey={column} title={column}>
              <GraphP 
                data={data} 
                siteid={siteid}
                measureableColumn={column} 
                cummulativeColumns={measureable_columns_property['cummulative_columns']}
              />
            </Tab>
    });

  }
  
  render() {
    const data = JSON.parse(this.props.data);
    const siteid = this.props.siteId;
    const monitors = this.props.monitors;
    const chartShowable = this.isChartShowable();
    const charts_tab = chartShowable['showable'] ? this.buildCharts() : ''
    // const chart_tab = data[precip][siteid].length > 1 ?
    //   <Tab eventKey="graph" title="Chart">
    //     <GraphP data={this.props.data} siteid={siteid} />
    //   </Tab>
    //   : ''
    const active_tab = chartShowable['showable'] ? chartShowable['eventKey'] : 'table'
    return (
      <Modal size='lg' show={true} onHide={this.props.hideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{'SiteName: '+data[SiteName][siteid] }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tabs defaultActiveKey={active_tab} id="uncontrolled-tab-example">
          {charts_tab}
          <Tab eventKey="table" title="Table">
              <SingleGroupTable 
                data={this.props.data}
                siteid={siteid}
                monitors={monitors}
                dataTypeProperty={this.props.measureableColumnsProperty}
              />
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