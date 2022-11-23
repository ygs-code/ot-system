/*
 * @Date: 2022-08-01 17:29:00
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-06 13:40:32
 * @FilePath: /react-loading-ssr/client/utils/index.js
 * @Description:
 */
// import {
//     deepCopy
// } from './deepCopy'
// import {SubscribePublished} from './SubscribePublished';
import { CheckDataType } from "./CheckDataType";
import {
  deepCopy,
  diffData,
  filterTreeData,
  findTreeData,
  recursionTreeData
} from "./ergodic";
import { getBaseInitState } from "./getBaseInitState";
// import {FloatingBall} from './FloatingBall';
import { getStyle } from "./getCssAttr";
import {
  checkPassword,
  checkPhone,
  checkUser,
  checkVerificationCode,
  firstToUpper
} from "./regular";
import stringToObject from "./stringToObject";
import {
  stabilization,
  statusThrottle,
  throttle
} from "./throttlingStabilization";

export {
  // SubscribePublished, // 订阅发布
  CheckDataType, // 检查数据类型
  checkPassword,
  checkPhone,
  checkUser,
  checkVerificationCode,
  deepCopy, // 深度拷贝
  diffData, // 比较新旧两个数据
  filterTreeData, // 过滤树数据结构
  findTreeData, // 搜索到树数据的某一条数据单条 不包括父层数据的
  firstToUpper,
  getBaseInitState,
  getStyle, // 获取样式
  recursionTreeData, // 递归循环树数据
  stabilization, // 防抖函数
  statusThrottle, //  状态拦截器
  stringToObject,
  // FloatingBall, // 浮动球 类
  throttle // 节流函数
};
// 整体输出
export * from "./regular.js";
