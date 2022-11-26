/*
 * @Author: your name
 * @Date: 2020-11-11 11:21:09
 * @LastEditTime: 2021-08-23 19:26:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/CheckPermission/index.js
 */
import React, { Children, Component, cloneElement } from "react";
import { CheckDataType } from "client/utils";
import Store, { mapRedux } from "client/redux";
export const authKeys = [1, 2, 3, 4, 5];

const checkAuthKey = (authKey, props) => {
  let flag = true;
  //如果是函数
  if (props && CheckDataType.isFunction(authKey)) {
    authKey = authKey(props);
  }
  //如果是字符串
  if (CheckDataType.isString(authKey) || CheckDataType.isNumber(authKey)) {
    flag = authKeys.includes(authKey);
  } else if (CheckDataType.isBoolean(authKey)) {
    // 如果是布尔值
    flag = authKey;
  } else if (CheckDataType.isArray(authKey)) {
    // 如果是数组
    flag = authKey.some((item) => {
      return authKeys.includes(item);
    });
  } else {
    console.error("key数据类型不正确");
  }
  return flag;
};

// 检查函数
export const checkAuth = (authKey) => {
  return checkAuthKey(authKey);
};

// 检查组件授权
const CheckAuth = (props) => {
  const { authKey, children } = props;
  return checkAuthKey(authKey)
    ? Children.map(children, (child, index) => {
      return cloneElement(child, props);
      })
    : null;
};

export const OntAuth = () => {
  return <div>无权限访问</div>;
};

// 检测页面是否有授权
export const CheckPageAuth = (authKey) => {
  return (C) => {
    class Auth extends Component {
      render() {
        return checkAuthKey(authKey, this.props) ? (
          <C {...this.props} />
        ) : (
          <OntAuth {...this.props} />
        );
      }
    }
    return mapRedux()(Auth);
  };
};
