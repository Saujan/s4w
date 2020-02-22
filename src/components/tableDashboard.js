import React from 'react';
import ReactDOM from 'react-dom';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

class HotApp extends React.Component {
  constructor(props) {
    super(props);
  }

  tableSettings() {
    return ({ 
        dataSchema: this.props.tableData.dataSchema,
        data: this.props.tableData.data,
        stretchH: "all",
        allowEmpty: true,
        fillHandle: false,
        width: '100%',
        columns: this.props.tableData.columnProperty,
        colHeaders: this.props.tableData.columnHeader,
        //colWidths: [40, 60, 300, 120, 80, 80],
        columnSorting: true,
        sortIndicator: true,
        filters: true,
        dropdownMenu: true
      })
  }

  renderHandsontable() {
    return (<HotTable settings={this.tableSettings()}/>
    )
  }

  render() {
    return (this.renderHandsontable()
    );
  }
}

export default HotApp;