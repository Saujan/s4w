import React from 'react'
import { Table } from 'react-bootstrap';
import './css/map/mapDesign.scss'
import './bootstrap.min.css'
import './App.css'

function createLegend(legends){
    if (legends !== null){
      return legends.map(function(legend,index) {
        // const pick_color = makeColorStyle(legend['color'])
        return (
          <tr key={index}>
            <td>
              <div className='circle-div' style={{backgroundColor : legend['color'] == 'blue' ? '#1e90ff' : legend['color'] }}></div>
            </td>
            <td>
              <div className='range-div'><strong>{legend['range']}</strong>
              </div>
            </td>
            <td>
              <strong>mm</strong>
            </td>
          </tr>
        )
      });
    } else {
      return ''
    }
}

function MapLegend(props) {
  const legends = createLegend(props.legend)
  // const legends = createLegendTest(dataSet)
  return (
    <Table bordered variant='light' responsive size='sm'>
      <tbody>
        {legends}
      </tbody>
    </Table>
  )
}
export default MapLegend;