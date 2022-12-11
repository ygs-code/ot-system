import { Input } from "antd";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import TablePage from "client/component/TablePage";
import { mapRedux } from "client/redux";
import { addRouterApi } from "client/router";
import React from "react";

class Index extends TablePage {
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
  componentDidMount() {
    debugger;
  }
  // 定义搜索栏字段
  getSearchFields = () => {
    return [
      {
        label: "Username1",
        name: "username1",
        type: "input",
        span: 1
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
        span: 2,
        labelCol: { span: 5 },
        wrapperCol: { span: 10 }
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
        span: 3,
        labelCol: { span: 3 },
        wrapperCol: { span: 25 },
        render: (props) => {
          return <Input {...props}></Input>;
        }
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
        }
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
        }
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
        }
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
        }
        // rules: [
        //   {
        //     required: true,
        //     message: "Please input your username3",
        //   },
        // ],
      }
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

  getTableProps = () => {
    return {};
  };

  render() {
    return (
      <div>
        {this.renderSearch({
          shrinkLength: 2
          // style: {
          //   padding: "10px 0",
          // },
        })}
        {this.renderTable()}
      </div>
    );
  }
}

export default mapRedux()(
  // 权限控制
  setBreadcrumbAndTitle({
    //设置面包屑和标题
    breadcrumb: [
      {
        label: "角色管理"
        // href: "http://localhost:3000/index",
        // path: "xxxx",
      },
      {
        label: "详情",
        // href: "http://localhost:3000/index",
        path: "/",
        component: ""
      }
      // {
      //   label: "菜单3",
      //   // href: "http://localhost:3000/index",
      //   // path: "/",
      //   component: "",
      // },
    ]
    // title: "主页"
  })(addRouterApi(Index))
);
