import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import { Table, Divider, Tag } from 'antd';

const precip = "precip_mm";
const meta_instance_ids = "*meta-instance-id*";
const MonID = "Monitor";
const msmt_datetime = "msmt_datetime";
const precip_image = "precip_image";
const precip_cmnts = "precip_cmnts";

//let columns_headers = [MonID, meta_instance_ids, msmt_datetime, precip, precip_image, precip_cmnts];
let columns_headers = [MonID, meta_instance_ids, msmt_datetime];
const links = [precip_image];

function table_headers(dataTypeProperty) {
  let headers = [MonID, meta_instance_ids, msmt_datetime]
  headers = headers.concat(dataTypeProperty['table_headers'])
  return headers
}

function link_columns(dataTypeProperty) {
  return dataTypeProperty['link_columns']
}

function createData(data, siteid, monitors, dataTypeProperty){
    var a_row = {};
    let columns_headers = table_headers(dataTypeProperty)
    return data[meta_instance_ids][siteid].map(function(meta_instance_id, index)
      {
        a_row = {};
        a_row['key'] = index;
        columns_headers.forEach(function(column){
          if (column == MonID){
            a_row[column] = monitors[data[column][siteid][index].toString()];
          }
          else{
            a_row[column] = data[column][siteid][index];
          }
      });
      return a_row;
      })
  }

function createColumn(data, siteid, dataTypeProperty){
  let columns_headers = table_headers(dataTypeProperty)
  //let links = link_columns(dataTypeProperty)
  //alert(links)
  const columns = columns_headers.map(function(value)
    {
      let column = '';
      if (links.includes(value)){
        column = {
          title: value,
          dataIndex: value,
          key: value,
          render: text => <a href = {text} target="_blank">Image Link</a>,
        };
      }
      else{
        column = {
          title: value,
          dataIndex: value,
          key: value,
        };
      }
      return (column);
    });
  return columns;

}

function cleanData(data, siteid){
  const dataSource = createData(data, siteid);
  const columns = createColumn(data, siteid);
  return <Table dataSource={dataSource} columns={columns} />
}

function SingleGroupTable(props) {
   const dataSource = JSON.parse(props.data);
   const siteid = props.siteid;
   const monitors = props.monitors;
   const dataTypeProperty = props.dataTypeProperty
   const data = createData(dataSource, siteid, monitors, dataTypeProperty);
   const columns = createColumn(data, siteid, dataTypeProperty);
  return (
    <Table  size="small" scroll={{ x: true}} dataSource={data} columns={columns} pagination={{ defaultPageSize: 50, showSizeChanger: true, pageSizeOptions: ['50', '100', '150']}}/>
    )
}
export default SingleGroupTable;