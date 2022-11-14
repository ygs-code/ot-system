import { createBrowserHistory, createMemoryHistory } from "history";

let history = {};
export const getBrowserHistory = (props = {}) =>
  (history = createBrowserHistory({
    basename: "/", // 基链接
    forceRefresh: false, // 是否强制刷新整个页面
    // keyLength: 10, // location.key的长度
    //  getUserConfirmation: (message,callback) => callback(window.confirm(message)) // 跳转拦截函数
    ...props
  }));

export const getMemoryHistory = (props = {}) =>
  (history = createMemoryHistory(props));

export { history };
export const getHistory = () => {
  return history;
};
