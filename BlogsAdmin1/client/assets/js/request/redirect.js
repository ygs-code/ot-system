/*
 * @Author: your name
 * @Date: 2021-08-12 14:33:50
 * @LastEditTime: 2021-09-29 15:39:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/js/request/redirect.js
 */
import { routePaths, historyPush, getHistory } from "client/router";
import token from "./token";

export const codeMap = {
  // 没有权限跳转到登录页面
  401: (errorInfo) => {
    let XHRQueue = (errorInfo && errorInfo[2] && errorInfo[2].XHRQueue) || [];
    localStorage.removeItem("token");
    token.clearQueue();
    //  停止剩余的请求
    for (let index = XHRQueue.length - 1; index >= 0; index--) {
      XHRQueue[index].xmlHttp && XHRQueue[index].xmlHttp.abort();
      XHRQueue.splice(index, 1);
    }
    //重定向到登录页面
    historyPush({
      url: routePaths.logLn
    });
  },
  415: (errorInfo) => {
    // historyPush(
    //   url: routePaths.logLn,
    // });
  }
};
