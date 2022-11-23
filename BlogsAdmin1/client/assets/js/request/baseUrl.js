/*
 * @Author: your name
 * @Date: 2020-11-11 11:21:09
 * @LastEditTime: 2021-09-30 12:01:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/js/request/baseUrl.js
 */
const env = process.env.NODE_ENV; // 环境参数
let baseUrl = "";
if (env === "development") {
  baseUrl = "http://127.0.0.1:3100/api/";
}
if (env === "production") {
  baseUrl = "http://127.0.0.1:3100/api/";
}

export default baseUrl;
