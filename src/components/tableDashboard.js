import React from 'react';
import ReactDOM from 'react-dom';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

class HotApp extends React.Component {
  constructor(props) {
    super(props);
    this.handsontableData = [
{Name:"Многоэтажный жилой дом №4-И в квартале  15 микрорайона г. Нижневартовска", Code: 123, RefBeginDate:"20060001",RefEndDate:"20120001",RefPart:"1",RefStatus:"1",RefTerritory:"58162"},
{Name:"Многоэтажный жилой дом №4-И в квартале  15 микрорайона г. Новоаганск", Code: 124, RefBeginDate:"20060001",RefEndDate:"20120001",RefPart:"1",RefStatus:"2",RefTerritory:"58162"},
{Name:"Многоэтажный жилой дом №4-И в квартале  15 микрорайона г. Радужный", Code: 125, RefBeginDate:"20060001",RefEndDate:"20120001",RefPart:"1",RefStatus:"3",RefTerritory:"58162"},
{Name:"Многоэтажный жилой дом №4-И в квартале  15 микрорайона г. Сургут", Code: 126, RefBeginDate:"20060001",RefEndDate:"20120001",RefPart:"1",RefStatus:"2",RefTerritory:"58162"},
    ];
  }

  render() {
    return (<HotTable settings={{ 
        dataSchema: {RefStatus: null, Code: null, Name: null, RefTerritory: null, RefBeginDate: null, RefEndDate: null},
        data: this.handsontableData,
        stretchH: "all",
        allowEmpty: true,
        fillHandle: false,
        columns: [
          {data: 'RefStatus', editor: false, renderer: this.statusRenderer, type: 'numeric',}, 
          {data: 'Code', editor: false, type: 'numeric',}, 
          {data: 'Name', editor: false, renderer: this.linkRenderer, type: 'text',}, 
          {data: 'RefTerritory', editor: false, type: 'numeric',}, 
          {data: 'RefBeginDate', editor: false, renderer: this.dateRenderer, type: 'text',}, 
          {data: 'RefEndDate', editor: false, renderer: this.dateRenderer, type: 'text',}
        ],
        colHeaders: ['Status', 'Code', 'Project Name', 'Realization place', 'Year start', 'Year end'],
        colWidths: [40, 60, 300, 120, 80, 80],
        // Sorting
        columnSorting: true,
        sortIndicator: true,
        // Filters
        filters: true,
        dropdownMenu: true
      }} />
    );
  }
}

export default HotApp;