#!/usr/bin/env node
const execSync = require("child_process").execSync;
const exec = require("child_process").exec;
// const chalk = require('chalk')
const gitConfig = require("./gitConfig"); // 与用户互动
const { execute } = require("./cmd"); // 与用户互动
const path = require("path");
const fs = require("fs");
const { readdirSync, stat } = fs;
const ora = require("ora");
const os = require("os");
const chalk = require("chalk");

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
    this.init();
  }
  async gitBuild() {
    for (let item of gitConfig) {
      let { name, dir, git } = item;
      // console.log('item==',item)
      process.chdir(path.join(__dirname, "../"));
      dir = path.join(__dirname, "../", dir);
      await new Promise((resolve, reject) => {
        // console.log('dir=', path.join(__dirname,'../',dir));
        stat(dir, async (err, stats) => {
          if (!err && stats.isDirectory()) {
            // 更新
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
    let cmd = npm;

    console.log(`开始编译打包:${name}`);

    // {
    //     name: "后台管理系统",
    //     dir: "ot-system-admin",
    //     git: "git@github.com:ygs-code/ot-system-admin.git",
    //   },
    //   {
    //     name: "后台服务",
    //     dir: "ot-system-server",
    //     git: "git@github.com:ygs-code/ot-system-server.git",
    //   },
    //   {
    //     name: "客户端",
    //     dir: "ot-system-client",
    //     git: "git@github.com:ygs-code/ot-system-client.git",
    //   },
    // const npm = os.type() === "Windows_NT" ? "npm.cmd" : "npm";
    if (
      dir.search("ot-system-admin") >= 0 ||
      dir.search("ot-system-client") >= 0
    ) {
      cmd = `${cmd} run build:client:prod`;
    }
    if (dir.search("ot-system-server") >= 0) {
      cmd = `${cmd} run build:prd`;
    }

    await this.PromiseExec(cmd);
    console.log(`编译:${name}成功\n\n`);
  }
  async init() {
    await this.gitBuild();
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

new BulidCode();
