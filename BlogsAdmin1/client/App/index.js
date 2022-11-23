/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:07:47
 * @FilePath: /react-ssr-lazy-loading/client/App/App.js
 * @Description:
 */
import "antd/dist/antd.css";
import "./index.less";
import "client/assets/css/base.less";
import "bootstrap/dist/css/bootstrap.css";

import { ConfigProvider } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/es/locale/zh_CN";
import Routers from "client/router";
import React, { Component } from "react";
import { Provider } from "react-redux";

// let {
//   NODE_ENV, // 环境参数
//   target, // 环境参数
//   htmlWebpackPluginOptions = ""
// } = process.env; // 环境参数

class Index extends Component {
  render() {
    const { history, store, routesComponent } = this.props;

    /*
  Warning: Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.
  来自Provider组件
  */
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Routers
            level={1}
            history={history}
            routesComponent={routesComponent}
          />
        </Provider>
      </ConfigProvider>
    );
  }
  componentDidCatch(error, info) {
    console.error("Error：", error);
    console.error("错误发生的文件栈：", info.componentStack);
  }
}

// Index.propTypes = {
//     location: PropTypes.string,
//     store: PropTypes.object,
//     history: PropTypes.object,
//     dispatch: PropTypes.func,
//     state: PropTypes.object,
// };

export default Index;
