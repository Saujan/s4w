import React from 'react';
import {Typography } from 'antd';

const { Text } = Typography;

function ChartLabel() {
  const images = ['blue', 'green', 'yellow'];
  const labels = ['-1', '1', '3'];
  const options = labels.map((item) => 
          <li  key= {item.value} value={item.value}>
            <Text strong>{item}</Text>
          </li>
      )
  debugger
  return (
    <ul>
      {options}
    </ul>
    )

}

export default ChartLabel;