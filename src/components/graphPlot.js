import React from 'react'
import ReactDOM from 'react-dom'
import {Bar} from 'react-chartjs-2';
import {Bubble} from 'react-chartjs-2';

const accumulated_label = "Accumulated Precip (mm)";
const y_label = "Precip (mm)";
const precip = 'precip_mm';

class GraphP extends React.Component {
  constructor(props){
    super(props)
    this.createData = this.createData.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.createPlugins = this.createPlugins.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data != this.props.data;
  }

  shouldProceedCummulative() {
    const measureableColumn = this.props.measureableColumn
    const cummulativeColumns = this.props.cummulativeColumns
    return cummulativeColumns.indexOf(measureableColumn) > -1 ? true : false

  }

  constructDatasets(measureableData) {
    const measureableValues = measureableData.map(function(value){ return parseFloat(value)});
    let bar_data = {
                type: 'bar',
                label: y_label,
                data: measureableValues,
                fill: false,
                backgroundColor: '#269DC7',
                borderColor: '#269DC7',
                hoverBackgroundColor: '#269DC7',
                hoverBorderColor: '#269DC7',
                yAxisID: 'y-axis-1'
              }

    if (this.shouldProceedCummulative()) {
      let sum = 0
      const cummulative_data = measureableData.map(function(value){ sum +=parseFloat(value); return sum;})
      let accumulated_data = {
                type: 'line',
                label: accumulated_label,
                data: cummulative_data,
                fill: false,
                backgroundColor: '#808080',
                borderColor: '#808080',
                hoverBackgroundColor: '#808080',
                hoverBorderColor: '#808080',
                yAxisID: 'y-axis-2'
              }
      return {
        datasets:[accumulated_data, bar_data]
      }

    } else {
      return {
            datasets: [bar_data]
          };
    }
  }

  createData(){
    const data = JSON.parse(this.props.data);
    const siteid = this.props.siteid;
    const measureableColumn = this.props.measureableColumn
    const measureableData = data[measureableColumn][siteid]

    return this.constructDatasets(measureableData)
  }

  createYaxes() {
    const axesOne = { type: 'linear', display: true, position: 'left', id: 'y-axis-1',
                      gridLines: {
                        display: false
                      },
                      labels: {
                        show: true
                      }
                    }
        
    if (this.shouldProceedCummulative()) {
      const axesTwo = { type: 'linear', display: true, position: 'right', id: 'y-axis-2',
                        gridLines: {
                          display: false
                        },
                        labels: {
                          show: true
                    }
                  }
      return [axesOne, axesTwo]
    } else {
      return [axesOne]
    }
  }

  createOptions(){
    const data = JSON.parse(this.props.data);
    const siteid = this.props.siteid;
    const x_labels = data["date"][siteid].map(function(date) {return new Date(date.toString()).toLocaleDateString()});
    return {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: x_labels,
          }
        ],
        yAxes: this.createYaxes()
      }
    };
  }

  createPlugins() {
    return [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            //ctx.fillText("This text drawn by a plugin", 100, 100);
        }
    }];
  }
  
  render() {
    const data = this.createData();
    const options = this.createOptions();
    const plugins = this.createPlugins();
    return (
      <Bar
          data={data}
          options={options}
          plugins={plugins}
        />
      
    )  
  }

}

export default GraphP;