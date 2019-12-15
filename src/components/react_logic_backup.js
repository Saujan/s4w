import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from 'antd';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

function Selectoption(props){
    return (<option value={props.value}> {props.name} </option>);
}

class Multi extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        'id' : this.props.id,
        'options' : this.props.options
      };
    this.setOptions = this.setOptions.bind(this);
    this.change = this.change.bind(this);
    this.refresh = this.refresh.bind(this);
    }

  setOptions(){
    return this.state.options.map((item) =>
        <Selectoption  value={item.value} name = {item.text} key={item.value}/>
      )
  }

  change(){
      this.props.change(this.props.id, 'CA');
  }

  refresh(){
    //$('#'+this.state.id).MDBSelect();
  }

  componentDidMount(){
    this.refresh();
  }
  
  componentDidUpdate(){
    console.log("updated");
  }
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.options!==prevState.options){
       return { 'options': nextProps.options};
    }
    else return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
      return this.state.options != nextState.options;
  }

  render() {
    const listItems = this.setOptions();
    return (
      <select className="mdb-select my-4" id={this.props.id} onChange = {this.change} multiple>
          {listItems}
      </select>
      );
  }
}

class DependentBoard extends React.Component {
  constructor(props){
    super(props);
        this.state = {
          'data'  : {'project':
                        [{'value':'none','text':'Select Project'},{'value':'NP', 'text':'S4W-Nepal'},{'value':'CA', 'text':'S4W-CA'}]
                         
                      ,
                     'parameter':
                        { 'NP':[{'value':'PT', 'text':'Precipitation'},{'value':'GD', 'text':'Ground Level'}],
                          'CA':[{'value':'SP', 'text':'StoneSpout'},{'value':'RR', 'text':'WaterLevel'}]
                         }
                      }
                    ,
          'project': 'NP',
          'parameter':'NP',
          'relation' :{'project':'parameter'}   
        };
    this.createSelects = this.createSelects.bind(this);
    this.change = this.change.bind(this);
  }
  createSelects(){
      this.state.data.map((item) => 
          <Multi  value={item.value} name = {item.text} key={item.value}/>  
      )
  }
  componentWillMount(){
    this.setState({
      'project':'NP',
      'parameter':'NP'
    })
  }
  change(address, value){
    if (address == "project"){
      this.setState(
      {
        'project': value,
        'parameter':value
      }
        )
      }
  }
  render() {
    const projects = this.state.data['project'];
    const parameters = this.state.data['parameter'][this.state.parameter];
    return (
          <div>
            <MDBDropdown>
              <MDBDropdownToggle caret color="primary">
                MDBDropdown
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem>Action</MDBDropdownItem>
                <MDBDropdownItem>Another Action</MDBDropdownItem>
                <MDBDropdownItem>Something else here</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>Separated link</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBSpinner />
      </div>
      );
  }

}

//const element = <Multi id = "one"/>;
const element = <DependentBoard/>;
ReactDOM.render(
  element,
  document.getElementById('react')
);