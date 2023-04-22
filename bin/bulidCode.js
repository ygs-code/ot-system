#!/usr/bin/env node
const gitConfig = require("./gitConfig"); // 
const { execute } = require("./cmd"); // 
const path = require("path");
const fs = require("fs");
const { readdirSync, stat } = fs;
const os = require("os");
var { rimrafSync } = require("rimraf");

const {
  env: { type },
} = process;

/*
process.cwd()返回执行命令的目录(而不是节点包的目录)(如果应用程序内部的'process.chdir'尚未更改命令)。
__filename返回放置文件的绝对路径。
__dirname返回__filename目录的绝对路径。
*/
class BulidCode {
  constructor() {
    this.addReg = /git add/gi;
    this.pushReg = /git push/gi;
    this.committedReg = /committed/gi;
    this.spinner;
    // this.init();
  }
  removeDrf(path, callback = () => {}) {
    rimrafSync(path);
    // return new Promise((reslove, reject) => {
    //     rimrafSync(path, () => {
    //         callback();
    //         reslove();
    //     });
    // });
  }
  async gitBuild(type) {
    for (let item of gitConfig) {
      let { name, dir, git, isDockerBuild, container_name } = item;
      // 如果有配置单独发布则不会更新其他模块 , 如果是容器打包也不需要本地打包
      // if (
      //   (type && type !== "publish_all" && type != container_name) ||
      //   isDockerBuild
      // ) {
      //   continue;
      // }
      process.chdir(path.join(__dirname, "../"));
      dir = path.join(__dirname, "../", dir);
      await new Promise((resolve, reject) => {
        // console.log('dir=', path.join(__dirname,'../',dir));
        stat(dir, async (err, stats) => {
          if (!err && stats.isDirectory()) {
            // 打包
            await this.build({
              name,
              dir,
              git,
            });
            resolve();
          }
        });
      });
    }
  }

  async build({ name, dir, git }) {
    process.chdir(dir);
    const npm = os.type() === "Windows_NT" ? "npm.cmd" : "npm";
    const yarn = os.type() === "Windows_NT" ? "yarn.cmd" : "yarn";
    let cmd = "";

    console.log(`编译打包${name}\n`);
    console.log(
      `清理${dir} dist , node_modules 目录下所有文件，以及清理缓存`
    );
    await this.removeDrf(path.join(dir, "/node_modules"));
    await this.removeDrf(path.join(dir, "/dist"));
    await this.removeDrf(path.join(dir, "/package-lock.json"));
    await this.removeDrf(path.join(dir, "/yarn.lock"));
    await this.removeDrf(`${npm} cache clean --force`);
    console.log("成功清理，删除依赖包");

    console.log("安装npm依赖包");
    await this.PromiseExec(`${yarn} install`);
    console.log("安装成功");

    console.log(`开始编译打包:${name}`);
    if (
      dir.search("ot-system-admin") >= 0 ||
      dir.search("ot-system-client") >= 0
    ) {
      cmd = `${npm} run build:client:prod`;
    }

    if (dir.search("ot-system-server") >= 0) {
      cmd = `${npm} run build:prd`;
    }

    await this.PromiseExec(cmd);
    console.log(`编译:${name}成功\n\n`);
  }
  async init($type) {
    await this.gitBuild($type || type);
  }

  // 执行程序
  PromiseExec(cmd, options = {}) {
    const { getStdout = () => {}, callback = () => {} } = options;
    return new Promise((reslove, reject) => {
      execute(cmd, {
        // stdio: null,
        ...options,
        getStdout: (stdout) => {
          getStdout(stdout);
          callback();
          reslove({
            cmd,
            stdout,
            // stderr,
            code: 200,
          });
        },
        callback: () => {
          callback();
          reslove();
        },
      });
    });
  }
}

module.exports = new BulidCode();
// new BulidCode();
