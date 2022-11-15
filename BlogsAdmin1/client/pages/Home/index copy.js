/*
 * @Author: your name
 * @Date: 2020-11-12 16:14:07
 * @LastEditTime: 2021-09-23 15:23:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/pages/Home/pages/Index/index.js
 */
import React, { createElement, Component, useMemo } from "react";
import "@/common/css/base.less";
import "./index.less";
import { Input, Button, Checkbox } from "antd";
import { routePaths, historyPush, getHistory, pathComponent } from "@/router";
import { CheckDataType } from "@/utils";
import Store, { mapRedux } from "@/redux";
import { CheckPageAuth } from "@/common/component/CheckAuth";
import SetBreadcrumbAndTitle from "@/common/component/SetBreadcrumbAndTitle";
import TablePage from "@/component/TablePage";

class Index extends TablePage {
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
    return [
      {
        label: "Username1",
        name: "username1",
        type: "input",
        span:1
        // labelCol: { span: 5 },
        // wrapperCol: { span: 10 },
        // rules: [
        //   {
        //     required: true,
        //     message: "Please input your username1",
        //   },
        // ],
      },
      {
        label: "Username2",
        name: "username2",
        type: "input",
        component: <div>123</div>,
        span:2,
        
        labelCol: { span: 5 },
        wrapperCol: { span: 10 },
        // rules: [
        //   {
        //     required: true,
        //     message: "Please input your username2",
        //   },
        // ],
      },
      {
        label: "Username3",
        name: "username3",
        type: "input",
        span:3,
        labelCol: { span:3},
        wrapperCol: { span:25},
        render: (props) => {
          return <Input {...props}></Input>;
        },
        // rules: [
        //   {
        //     required: true,
        //     message: "Please input your username3",
        //   },
        // ],
      },
      {
        label: "Username3",
        name: "username3",
        type: "input",
        render: (props) => {
          return <Input {...props}></Input>;
        },
        // rules: [
        //   {
        //     required: true,
        //     message: "Please input your username3",
        //   },
        // ],
      },
      {
        label: "Username4",
        name: "Username4",
        type: "input",
        render: (props) => {
          return <Input {...props}></Input>;
        },
        // rules: [
        //   {
        //     required: true,
        //     message: "Please input your username3",
        //   },
        // ],
      },
      {
        label: "Username5",
        name: "Username5",
        type: "input",
        render: (props) => {
          return <Input {...props}></Input>;
        },
        // rules: [
        //   {
        //     required: true,
        //     message: "Please input your username3",
        //   },
        // ],
      },
      {
        label: "Username6",
        name: "Username6",
        type: "input",
        
        render: (props) => {
          return <Input {...props}></Input>;
        },
        // rules: [
        //   {
        //     required: true,
        //     message: "Please input your username3",
        //   },
        // ],
      },
    ];
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
        key: "name",
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address",
      },
    ];
  };

  /**
   * 定义表格的数据加载功能
   */
  tableDataLoader = async (searchParams = {}) => {
    return {};
  };

  getTableProps = () => {
    return {};
  };

  render() {
    // console.log("this.renderSearch=", this.renderSearch);
    // console.log("this.renderTable=", this.renderTable);
    return (
      <div>
        {this.renderSearch({
          shrinkLength: 2,
          // style: {
          //   padding: "10px 0",
          // },
        })}
        {this.renderTable()}
      </div>
    );
  }
}

export default CheckPageAuth([4])(
  // 权限控制
  SetBreadcrumbAndTitle({
    //设置面包屑和标题
    breadcrumb: [
      {
        label: "主页",
        // href: "http://localhost:3000/index",
        // path: "xxxx",
      },
      // {
      //   label: "菜单2",
      //   // href: "http://localhost:3000/index",
      //   path: "/",
      //   component: "",
      // },
      // {
      //   label: "菜单3",
      //   // href: "http://localhost:3000/index",
      //   // path: "/",
      //   component: "",
      // },
    ],
    title: "主页",
  })(Index)
);
