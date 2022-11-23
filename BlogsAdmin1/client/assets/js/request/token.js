/*
 * @Author: your name
 * @Date: 2021-09-29 11:46:06
 * @LastEditTime: 2021-09-29 15:02:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/js/request/token.js
 */

class Token {
  constructor(doNotToken = []) {
    this.queue = [];
    //配置不需要token的请求
    this.doNotToken = [...doNotToken, "getVerifyCode", "createUser"];
  }

  subscribeQueue(resolve) {
    this.queue.push(resolve);
  }
  publishQueue(token) {
    this.queue.forEach((item) => {
      const { resolve } = item;
      resolve(token);
    });
    this.queue = [];
  }
  clearQueue() {
    this.queue.forEach((item) => {
      const { reject } = item;
      reject(null);
    });
    this.queue = [];
  }
  get(config) {
    const token = localStorage.getItem("token");
    const { parameter: { operationName } = {} } = config || {};
    if (!config && token) {
      return token;
    }
    return new Promise((resolve, reject) => {
      if (token) {
        return resolve(token);
      }
      if (this.doNotToken.includes(operationName)) {
        return resolve("");
      }
      resolve("");
      this.subscribeQueue({ resolve, reject });
    });
  }
}

export { Token };
export default new Token();
