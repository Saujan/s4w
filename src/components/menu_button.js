import React from 'react'
import '../App.css';
import { MdMenu } from 'react-icons/md';

function MenuButton (props) {
	return (
	    <div id='open-sidebar' onClick={props.controlMenu}>
	      <MdMenu size='2em'/>
	    </div>
	)
}

export default MenuButton;