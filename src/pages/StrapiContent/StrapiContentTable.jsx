import React from "react";
import { Table } from "antd";

const StrapiContentTable = ({
  columns,
  dataSource,
  rowSelection = "",
  rowKey,
  pagination,
  changeHandler,
}) => (
  <>
    <Table
      className="w-full shadow-sm"
      pagination={pagination}
      scroll={{
        scrollToFirstRowOnChange: true,
        x: "max-content",
        y: "500px",
      }}
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      rowKey={rowKey}
      onChange={changeHandler}
    />
  </>
);

export default StrapiContentTable;
