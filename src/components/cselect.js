import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import { Select, Typography } from 'antd';
import FilterSelectOption from './filter_select_option';

const { Text } = Typography;
const { Option } = Select;

class FilterSelect extends React.Component {
  constructor(props){
    super(props)
    this.changeFilter = this.changeFilter.bind(this);
  }
  
  changeFilter(e){
    const value = e
    this.props.changeFilter(this.props.type, value)
  }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.options!==this.props.options){
  //      return true;
  //   }
  //   else return null;
  // }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.options != this.props.options || this.props.disable!= nextProps.disable;
  }

  componentDidUpdate(){
    console.log("fileter select updated")
  }
  
  render(){
    const options = this.props.options.map((item) => 
          <Option  key= {item.value} value={item.value}>
            <Text strong>{item.text}</Text>
          </Option>
      )
    const disable = (typeof(this.props.disable) !== 'undefined' || this.props.disable != null) ? this.props.disable : false
    return(
    
      <Select
        size="small"
        style={{ width: '90%' }}
        placeholder = {this.props.type}
        onChange = {this.changeFilter}
        disabled = {disable}
        defaultValue = {this.props.selected_option}
      >
        {options}
      </Select>
      
    
    )
  }
}
export default FilterSelect;
