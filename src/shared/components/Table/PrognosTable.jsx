import React from "react";
import { Table } from "antd";

const PrognosTable = ({ columns, dataSource, rowSelection = "", rowKey }) => (
  <>
    <Table
      className="w-full shadow-sm"
      pagination={{ pageSize: 100, showSizeChanger: false }}
      scroll={{
        scrollToFirstRowOnChange: true,
        x: "max-content",
        y: "500px",
      }}
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      rowKey={rowKey}
    />
  </>
);

export default PrognosTable;
