/*
 * @Author: your name
 * @Date: 2020-12-03 17:37:54
 * @LastEditTime: 2021-08-16 19:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/js/request/requestMessage.js
 */
import { message } from "antd";

export const error = (msg) => {
  message.error(msg);
};

export const warning = (msg) => {
  message.warning(msg);
};

export const success = (msg) => {
  message.success(msg);
};
