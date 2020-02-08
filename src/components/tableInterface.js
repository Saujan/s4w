import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar } from 'react-bootstrap';
import logo from '../logo.png';
import HotApp from './tableDashboard'

class TableInterface extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <Navbar style={{position: "sticky"}} bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={logo}
                width="150"
                height="40"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
          </Navbar>
          <HotApp tableData={this.props.tableData}/>
      
      </div>
    );
  }
}

export default TableInterface;
