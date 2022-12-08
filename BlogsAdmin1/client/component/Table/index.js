/*
 * @Author: your name
 * @Date: 2021-08-23 19:39:29
 * @LastEditTime: 2021-08-26 11:33:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Table/index.js
 */

import "./index.less";

import { Pagination, Table } from "antd";
import React from "react";

const Index = (props) => {
  const {
    columns,
    tableProps = {},
    paginationProps = {},
    data: {
      list = [],
      pageNum,
      // pageSize,
      // pages,
      total
    } = {},
    onChange = () => {}
  } = props;
  console.log("tableProps==", tableProps);
  return (
    <div className="table-box">
      <div className="table">
        <Table
          columns={columns}
          dataSource={list}
          {...tableProps}
          pagination={false}
        />
      </div>

      <div className="pagination-box">
        <Pagination
          className="ant-pagination ant-table-pagination ant-table-pagination-right ant-table-pagination-right"
          showQuickJumper={true}
          defaultCurrent={pageNum}
          total={total}
          onChange={(pageNum) => {
            onChange({
              pageNum
            });
          }}
          {...paginationProps}
        />
      </div>
    </div>
  );
};

export default Index;
