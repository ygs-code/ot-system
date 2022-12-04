/*
 * @Author: your name
 * @Date: 2021-08-23 19:39:29
 * @LastEditTime: 2021-08-26 17:03:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Table/index.js
 */

import "./index.less";

import { Pagination } from "antd";
import { SearchForm } from "client/component/Form";
import Table from "client/component/Table";
import React, { PureComponent } from "react";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: {
        list: [{ title: "你好" }]
      },
      dataSource: []
    };
  }
  // 获取默认搜索参数
  getDefaultSearchParams = () => {
    return {
      status: ""
    };
  };

  // 定义搜索栏字段
  getSearchFields = () => {
    return [];
  };

  // 定义Tab字段
  getTabFilterItems = () => {
    return [];
  };

  // 定义表头字段
  getTableColumns = () => {
    return [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address"
      }
    ];
  };

  /**
   * 定义表格的数据加载功能
   */
  tableDataLoader = async () => {
    return {};
  };

  loadTableData = async (searchParams = {}) => {
    await this.tableDataLoader(searchParams);
  };

  getDataSource = () => {
    return [
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号"
      },
      {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号"
      }
    ];
  };

  getTableProps = () => {
    return {};
  };

  renderSearch = (props = {}) => {
    return (
      <SearchForm
        // shrinkLength={2}
        {...props}
        fields={this.getSearchFields()}
        type="search"
      />
    );
  };

  renderTable = (props = {}) => {
    return (
      <Table
        columns={this.getTableColumns()}
        dataSource={this.getDataSource()}
        bordered
        // title={() => "Header"}
        // footer={() => "Footer"}
        {...this.getTableProps()}
        {...props}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          total: 85
        }}
      />
    );
  };
  render() {
    return (
      <>
        {this.renderSearch()} {this.renderTable()}
      </>
    );
  }
}
