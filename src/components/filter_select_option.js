import React from 'react'
import ReactDOM from 'react-dom';

class FilterSelectOption extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
        <option value={this.props.value}>{this.props.text}</option>
    )
  }
}
export default FilterSelectOption;
