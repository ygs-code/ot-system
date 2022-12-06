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
import React, { memo, PureComponent } from "react";

class TablePage extends PureComponent {
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
      // status: ""
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
  tableDataLoader = async () => {
    return {};
  };

  loadTableData = async (searchParams = {}) => {
    await this.tableDataLoader(searchParams);
  };

  getDataSource = () => {
    return [];
  };

  getTableProps = () => {
    return {};
  };

  componentDidMount() {
    // console.log(" this.searchForm = form;==", this.searchForm);
    // debugger;
  }

  renderSearch = (props = {}) => {
    const { shrinkLength = 5 } = props;
    return (
      <SearchForm
        // shrinkLength={2}
        {...props}
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
    return (
      <Table
        columns={this.getTableColumns()}
        dataSource={this.getDataSource()}
        // title={() => "Header"}
        // footer={() => "Footer"}
        {...this.getTableProps()}
        {...props}
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
        }
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

    loadTableData = async (searchParams = {}) => {
      const { getFieldsValue } = this.searchForm;
      if (this.getDefaultSearchParams) {
        searchParams = {
          ...this.state.searchParams,
          ...searchParams,
          ...this.getDefaultSearchParams()
        };
      }
      const searchFormValue = getFieldsValue();

      if (Object.keys(searchFormValue).length) {
        searchParams = {
          ...searchParams,
          ...searchFormValue
        };
      }

      if (!this.tableDataLoader) {
        console.error("tableDataLoader抽象方法需要实现");
        return;
      }

      await this.tableDataLoader(searchParams);
    };

    getDataSource = () => {
      return [];
    };

    getTableProps = () => {
      return {};
    };

    componentDidMount() {
      console.log("searchParams==", this.state);
      this.$timer = setTimeout(() => {
        this.loadTableData();
      }, 0);
    }

    componentWillUnmount() {
      window.clearTimeout(this.$timer);
    }
    renderSearch = (props = {}) => {
      const { shrinkLength = 5 } = props;
      return (
        <SearchForm
          {...props}
          shrinkLength={shrinkLength}
          fields={this.getSearchFields()}
          type="search"
          onReady={(form) => {
            console.log("form====", form);

            this.searchForm = form;
          }}
        />
      );
    };

    renderTable = (props = {}) => {
      return (
        <Table
          columns={this.getTableColumns()}
          dataSource={this.getDataSource()}
          // title={() => "Header"}
          // footer={() => "Footer"}
          {...this.getTableProps()}
          {...props}
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

export default TablePage;

export { tablePage };
