/*
 * @Author: your name
 * @Date: 2021-08-23 19:39:29
 * @LastEditTime: 2021-08-26 17:03:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Table/index.js
 */

import "./index.less";

import { SearchForm } from "client/component/Form";
import Table from "client/component/Table";
import React from "react"; // , { memo, PureComponent }

// class TablePage extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tableData: {
//         list: [{ title: "你好" }]
//       },
//       dataSource: []
//     };
//   }
//   // 获取默认搜索参数
//   getDefaultSearchParams = () => {
//     return {
//       // status: ""
//     };
//   };

//   // 定义搜索栏字段
//   getSearchFields = () => {
//     return [];
//   };

//   // 定义Tab字段
//   getTabFilterItems = () => {
//     return [];
//   };

//   // 定义表头字段
//   // getTableColumns = () => {
//   //   return [];
//   // };

//   /**
//    * 定义表格的数据加载功能
//    */
//   tableDataLoader = async () => {
//     return {};
//   };

//   loadTableData = async (searchParams = {}) => {
//     return await this.tableDataLoader(searchParams);
//   };

//   getDataSource = () => {
//     return [];
//   };

//   getTableProps = () => {
//     return {};
//   };

//   componentDidMount() {
//     // console.log(" this.searchForm = form;==", this.searchForm);
//     // debugger;
//   }

//   renderSearch = (props = {}) => {
//     const { shrinkLength = 5 } = props;
//     return (
//       <SearchForm
//         // shrinkLength={2}
//         {...props}
//         shrinkLength={shrinkLength}
//         fields={this.getSearchFields()}
//         type="search"
//         onReady={(form) => {
//           this.searchForm = form;
//         }}
//       />
//     );
//   };

//   renderTable = (props = {}) => {
//     return (
//       <Table
//         columns={this.getTableColumns ? this.getTableColumns() : []}
//         dataSource={this.getDataSource()}
//         // title={() => "Header"}
//         // footer={() => "Footer"}
//         {...this.getTableProps()}
//         {...props}
//       />
//     );
//   };
//   render() {
//     return (
//       <>
//         {this.renderSearch()} {this.renderTable()}
//       </>
//     );
//   }
// }

const tablePage = (Component) => {
  class TablePage extends Component {
    // state = {
    //   searchParams: {}
    // };
    constructor(props) {
      super(props);
      this.state = {
        ...this.state,
        searchParams: {
          pageNum: 1,
          pageSize: 10
        },
        tableData: {}
      };
    }

    // // 获取默认搜索参数
    getDefaultSearchParams = () => {
      return {
        // status: ""
      };
    };

    // // 定义搜索栏字段
    // getSearchFields = () => {
    //   return [];
    // };

    // 定义Tab字段
    getTabFilterItems = () => {
      return [];
    };

    // // 定义表头字段
    // getTableColumns = () => {
    //   return [];
    // };

    /**
     * 定义表格的数据加载功能
     */
    // tableDataLoader = async () => {
    //   return {};
    // };

    checkTabelData = (data) => {
      let mapKey = [
        "hasNextPage",
        "list",
        "pageNum",
        "pageSize",
        "pages",
        "total"
      ];
      let index = -1;
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          index = mapKey.indexOf(key);
          if (index !== -1) {
            mapKey.splice(index, 1);
          }
        }
      }

      if (mapKey.length) {
        return `列表表格数据数据缺少${mapKey.join(",")}字段`;
      }
      return null;
    };

    checkAbstractFunction = () => {
      let checkFunction = [
        {
          name: "tableDataLoader",
          message: "tableDataLoader是抽象方法需要实现,请设置ajax请求列表"
        },

        {
          name: "getTableColumns",
          message: "getTableColumns是抽象方法需要实现,请配置表格columns"
        }
      ];

      for (let item of checkFunction) {
        const { name, message } = item;
        if (!this[name]) {
          return message;
        }
      }
      return null;
    };
    loadTableData = async (searchParams = {}) => {
      const { getFieldsValue } = this.searchForm;
      if (this.getDefaultSearchParams) {
        searchParams = {
          ...this.getDefaultSearchParams(),
          ...this.state.searchParams,
          ...searchParams
        };
      }

      this.setState(() => {
        return {
          searchParams
        };
      });

      const searchFormValue = getFieldsValue();

      if (Object.keys(searchFormValue).length) {
        searchParams = {
          ...searchParams,
          ...searchFormValue
        };
      }

      let errprMessage = this.checkAbstractFunction();
      if (errprMessage) {
        console.error(errprMessage);
        debugger;
        return;
      }

      if (!this.tableDataLoader) {
        console.error("tableDataLoader抽象方法需要实现");
        return;
      }

      const data = await this.tableDataLoader(searchParams);
      errprMessage = this.checkTabelData(data);
      if (errprMessage) {
        console.error(errprMessage);
        debugger;
        return;
      }
      this.setState({ tableData: data });
      return data;
    };

    getDataSource = () => {
      return [];
    };

    // getTableProps = () => {
    //   return {};
    // };

    componentDidMount(...ags) {
      super.componentDidMount(...ags);
      this.$timer = setTimeout(() => {
        this.loadTableData();
      }, 0);
    }

    componentWillUnmount(...ags) {
      super.componentDidMount(...ags);
      window.clearTimeout(this.$timer);
    }
    renderSearch = (props = {}) => {
      const { shrinkLength = 5 } = props;
      return (
        <SearchForm
          {...props}
          onConfirm={this.loadTableData}
          onReset={(searchParams) => {
            this.loadTableData(searchParams);
          }}
          shrinkLength={shrinkLength}
          fields={this.getSearchFields()}
          type="search"
          onReady={(form) => {
            this.searchForm = form;
          }}
        />
      );
    };

    renderTable = (props = {}) => {
      const { tableData } = this.state;
      let { tableProps = {}, paginationProps = {} } = props;

      tableProps = {
        ...tableProps,
        ...props,
        ...(this.getTableProps ? this.getTableProps() : {})
      };

      return (
        <Table
          columns={this.getTableColumns ? this.getTableColumns() : []}
          tableProps={tableProps}
          data={tableData}
          paginationProps={paginationProps}
          onChange={(searchParams) => {
            this.loadTableData(searchParams);
          }}
        />
      );
    };
    // render() {
    //   return (
    //     <>
    //       {this.renderSearch()} {this.renderTable()}
    //     </>
    //   );
    // }
  }

  return TablePage;
};

// export default TablePage;

export { tablePage };
