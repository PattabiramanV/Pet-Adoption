// src/components/DataTable.js
import React from 'react';
import { Table, Spin, Alert } from 'antd';

const DataTable = ({ data, columns, title }) => {
//   if (!data) {
//     return <Spin tip="Loading..." />;
//   }

  return (
    <div>
      <h1>{title}</h1>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
};

export default DataTable;

