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

const columns_headers = [MonID, meta_instance_ids, precip, precip_image, precip_cmnts, msmt_datetime];
const links = [precip_image];

function createData(data, siteid, monitors){
    var a_row = {};
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

function createColumn(data, siteid){
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
   const data = createData(dataSource, siteid, monitors);
   const columns = createColumn(data, siteid);
  return (
    <Table  size="small" scroll={{ x: true}} dataSource={data} columns={columns} pagination={{ defaultPageSize: 50, showSizeChanger: true, pageSizeOptions: ['50', '100', '150']}}/>
    )
}
export default SingleGroupTable;