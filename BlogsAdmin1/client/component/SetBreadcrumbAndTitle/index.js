/*
 * @Author: your name
 * @Date: 2020-12-03 10:26:49
 * @LastEditTime: 2021-08-25 15:39:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Breadcrumb/index.js
 */
import React, { PureComponent } from "react";
import Store, { mapRedux } from "client/redux";

const Index = (options) => {
  const { title, breadcrumb } = options;
  return (C) => {
    class A extends PureComponent {
      componentDidMount() {
        const { dispatch: { user: { setBreadcrumb } = {} } = {} } = this.props;
        if (title) {
          document.title = title;
        }
        breadcrumb && setBreadcrumb(breadcrumb);
      }
      render() {
        return <C {...this.props} />;
      }
    }
    return mapRedux(["user"])(A);
  };
};

export default Index;
