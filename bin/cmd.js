/*
 * @Date: 2022-08-09 11:24:59
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-10 14:16:33
 * @FilePath: /react-loading-ssr/bin/cmd.js
 * @Description:
 */

const {
  spawn,
  SpawnOptions,
  exec,
  execSync,
  spawnSync
} = require("child_process");

const os = require("os");

/**
 * 格式化日期
 * @param {string | number | Date} value 指定日期
 * @param {string} format 格式化的规则
 * @example
 * ```js
 * formatDate();
 * formatDate(1603264465956);
 * formatDate(1603264465956, "h:m:s");
 * formatDate(1603264465956, "Y年M月D日");
 * ```
 */
function formatDate(value = Date.now(), format = "YY-MM-DD hh:mm:ss") {
  const formatNumber = (n) => `0${n}`.slice(-2);
  const date = new Date(value);
  const formatList = ["YY", "MM", "DD", "hh", "mm", "ss"];
  const resultList = [];
  resultList.push(date.getFullYear().toString());
  resultList.push(formatNumber(date.getMonth() + 1));
  resultList.push(formatNumber(date.getDate()));
  resultList.push(formatNumber(date.getHours()));
  resultList.push(formatNumber(date.getMinutes()));
  resultList.push(formatNumber(date.getSeconds()));
  for (let i = 0; i < resultList.length; i++) {
    format = format.replace(formatList[i], resultList[i]);
  }
  return format;
}

class Cmd {
  text = "";

  runNodeModule(moduleName, params, options) {
    // if (os.type() == 'Windows_NT' && !moduleName.match(/\.cmd$/)) {
    //   moduleName += '.cmd'
    // }
    return this.run(moduleName, params, options);
  }

  run(command, params, options) {
    this.text = "";
    // options = Object.assign(options || {}, { cwd: this.cfg.cwd });
    return new Promise((resolve, reject) => {
      if (!options) {
        options = {
          stdio: "inherit"
        };
      }
      if (!params) {
        params = [];
      }
      options.stdio = "pipe";

      let proc = spawn(command, params, options);

      proc.stdout.on("data", (data) => {
        let dataStr = String(data);
        if (options.logPrefix) {
          dataStr = options.logPrefix + dataStr;
        }
        this.text += dataStr;
        if (!options?.silent) {
          process.stdout.write(formatDate() + dataStr);
        }
      });

      proc.stderr.on("data", (data) => {
        // 不一定代表进程exitcode != 0，可能只是进程调用了console.error
        let dataStr = String(data);
        if (options?.logPrefix) {
          dataStr = options.logPrefix + dataStr;
        }
        if (!options?.silent) {
          process.stderr.write(formatDate() + dataStr);
        }
      });

      // 进程错误
      proc.on("error", (error) => {
        if (!options?.silent) {
          console.error(error);
        }
        reject(error);
      });

      // 进程关闭
      proc.on("close", (code) => {
        if (code === 0) {
          resolve(this.text || "");
        } else {
          let errMsg = `process closed with exit code: ${code}`;
          if (options?.logPrefix) {
            errMsg = options.logPrefix + errMsg;
          }
          reject(new Error(errMsg));
        }
      });

      proc.on("exit", (code, signal) => {});
    });
  }
}

// let cmd = new Cmd().runNodeModule(
//   process.platform === 'win32' ? 'npm.cmd' : 'npm',
//   ['run', 'ssr:dev', '--progress', 'bar:force'],
// )

const execute = (command, options = { stdio: "inherit" }) => {
  options = {
    stdio: "inherit",
    // silent:true,
    logPrefix: true,
    transformCmd: (cmd) => cmd,
    ...options
  };

  const {
    getStderr = () => {},
    getStdout = () => {},
    callback = () => {},
    transformCmd
  } = options;
  command = command.split(" ").filter((item) => item);

  if (
    os.type() === "Windows_NT" &&
    !command[0].match(/^(git)/) &&
    !command[0].match(/\.cmd$/)
  ) {
    command[0] += ".cmd";
  }

  const proc = spawn(command[0], transformCmd(command.slice(1)), options);

  // 进程错误
  proc.on("error", (error) => {
    if (error) {
      callback(error);
      console.error("process error:", error);
    }
  });

  // 进程关闭
  proc.on("close", (code) => {
    // callback(code);
    // console.log(`process closed with exit code: ${code}`)
    // process.exit(code);
  });

  // 退出
  proc.on("exit", (code, signal) => {
    callback(code, signal);
    // process.exit(code);
  });

  if (proc.stderr) {
    proc.stderr.on("data", (data) => {
      // 不一定代表进程exitcode != 0，可能只是进程调用了console.error
    //   console.log("stderr==", data.toString());
      getStderr(String(data));
    });
  }
  if (proc.stdout) {
    proc.stdout.on("data", (data) => {
    //   console.log("stdout==", data.toString());
      getStdout(data.toString());
    });
  }

  return proc;
};

/**
 * 判断端口是否被占用
 * @param port 端口号
 * @returns 该端口是否被占用
 */
const iSportTake = (port) => {
  const cmd =
    process.platform === "win32"
      ? `netstat -aon|findstr ${port}`
      : `lsof -i:${port}`;
  try {
    const res = execSync(cmd);
    return true;
  } catch (error) {
    // console.log('error:', error);
    return false;
  }
};

module.exports = {
  Cmd,
  execute,
  iSportTake
};
