/*
 * @Author: your name
 * @Date: 2021-08-23 19:39:29
 * @LastEditTime: 2021-08-26 17:03:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Table/index.js
 */

import "./index.less";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import React, {
  Suspense,
  lazy,
  useState,
  useCallback,
  Children,
  PureComponent,
} from "react";
import { Layout, Select } from "antd";
import Table from "client/component/Table";
import {SearchForm} from "client/component/Form";
export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: {
        list: [{ title: "你好" }],
      },
      dataSource: [],
    };
  }
  // 获取默认搜索参数
  getDefaultSearchParams = () => {
    return {
      status: "",
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
    return [];
  };

  /**
   * 定义表格的数据加载功能
   */
  tableDataLoader = async (searchParams = {}) => {
    return {};
  };

  loadTableData = async (searchParams = {}) => {
    const tableData = await this.tableDataLoader(searchParams);
  };

  getDataSource = () => {
    return [];
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
      />
    );
  };
  render() {
    return <>this.renderSearch() this.renderTable();</>;
  }
}
