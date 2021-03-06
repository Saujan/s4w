import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar } from 'react-bootstrap';
import logo from '../logo.png';
import HotApp from './tableDashboard'
import MenuButton from './menu_button'

class TableInterface extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <Navbar bg="light" variant="light" sticky='top'>   
            <img
              alt=""
              src={logo}
              width="150"
              height="40"
              className="custom-image"
            />
            <Navbar.Brand >
              <MenuButton controlMenu={this.props.controlMenu}/>
            </Navbar.Brand>
          </Navbar>
          <div className="handsOnTable-content"> 
            <HotApp tableData={this.props.tableData}/>
          </div>                
      </div>
    );
  }
}

export default TableInterface;
