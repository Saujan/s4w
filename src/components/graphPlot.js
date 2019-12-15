import React from 'react'
import ReactDOM from 'react-dom'
import {Bar} from 'react-chartjs-2';
import {Bubble} from 'react-chartjs-2';

const accumulated_label = "Accumulated Precip";
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

  createData(){
    var sum = 0;
    const data = JSON.parse(this.props.data);
    const siteid = this.props.siteid;
    const precips = data[precip][siteid].map(function(value){ return parseFloat(value)});
    const accumulated_precips = data[precip][siteid].map(function(value){ sum +=parseFloat(value); return sum;})
    return {
            datasets: [{
                label: accumulated_label,
                type:'line',
                data: accumulated_precips,
                fill: false,
                borderColor: '#808080',
                backgroundColor: '#808080',
                pointBorderColor: '#808080',
                pointBackgroundColor: '#808080',
                pointHoverBackgroundColor: '#808080',
                pointHoverBorderColor: '#808080',
                yAxisID: 'y-axis-2'
              },{
                type: 'bar',
                label: y_label,
                data: precips,
                fill: false,
                backgroundColor: '#269DC7',
                borderColor: '#269DC7',
                hoverBackgroundColor: '#269DC7',
                hoverBorderColor: '#269DC7',
                yAxisID: 'y-axis-1'
              }]
          };
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
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
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