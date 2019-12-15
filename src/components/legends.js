import React from 'react'
import ReactDOM from 'react-dom'

import mm_red from '../images/mm_red.png'
import mm_green from '../images/mm_green.png'
import mm_blue from '../images/mm_blue.png'
import mm_yellow from '../images/mm_yellow.png'
import logo from '../images/logo.png'

function image(color){
	let image_path = 'white'
	if (color == 'red')
		image_path = mm_red
	if (color == 'blue')
		image_path = mm_blue
	if (color == 'green')
		image_path = mm_green
	if (color == 'yellow')
		image_path = mm_yellow
	return image_path
	//return <img src={legend_image_path} alt="" />
}

function create_legend(legends){
	if (legends != undefined && legends.length > 0){
		return legends.map(function(legend, index) {
			//return <li key= {index}>{legend['color']}: {legend['range']}</li>
			return <li key= {index}>
			<img src={image(legend['color'])} alt="" />
			: {legend['range']} mm</li>
		});
		
	}
	else{
		return ''
	}
}

function MapLegend(props) {
    const legends = create_legend(props.legend)
    return (
      <ul>
		  {legends}
      </ul>
    )
}
export default MapLegend;