#!/usr/bin/env node
const inquirer = require("inquirer"); // 与用户互动
const ora = require("ora");
const { execSync } = require("child_process");
const { exec } = require("child_process");
const chalk = require("chalk");
const path = require("path");
const semver = require("semver");
const { execute } = require("./cmd"); //
// const { release, platform ,arch} = require('os')
const {
  arch, // 系统版本号
  platform, //  标识操作系统平台 window 还是  mac(darwin) ，linux
  release // 操作系统
} = require("process");

class Git {
  constructor() {
    this.addReg = /git add/gi;
    this.pushReg = /git push/gi;
    this.committedReg = /committed/gi;
    this.spinner;
    this.init();
  }
  async init() {
    let { stdout: remote } = await this.PromiseExec("git remote -v", {
      stdio: undefined
    });

    this.remote = remote.split("\n")[1];
    let { stdout: branch } = await this.PromiseExec("git branch", {
      stdio: undefined
    });
    this.branch = branch.toString().match(/(?<=\*)\s*\w+/)[0];
    await this.huskyInstall();
    await this.submit(() => {
      this.add(() => {
        this.committed(() => {
          this.push();
        });
      });
    });
    // await this.add();
    // await this.committed();
    // await this.push();
  }

  // 执行程序
  PromiseExec(cmd, options = {}) {
    const {
      callback = () => {},
      getStderr = () => {},
      getStdout = () => {}
    } = options;
    return new Promise((reslove, reject) => {
      execute(cmd, {
        // stdio: null,
        ...options,
        getStderr: (stderr) => {
          getStderr(stderr);
        },
        getStdout: (stdout) => {
          getStdout(stdout);
          callback();
          reslove({
            cmd,
            stdout,
            // stderr,
            code: 200
          });
        },
        callback: () => {
          callback();
          reslove();
        }
      });
    });
  }

  async huskyInstall() {
    if (platform === "darwin" || platform === "linux") {
      await this.PromiseExec(
        `chmod -R 777 ${path.join(process.cwd(), "/.husky")}`
      );
    }

    await this.PromiseExec("npm run husky-install");
  }
  async submit(callback = () => {}) {
    let { status, remote, branch, addReg, pushReg, committedReg, spinner } =
      this;
    let { isSubmit } = await inquirer.prompt([
      {
        name: "isSubmit",
        type: "confirm",
        message: chalk.rgb(
          17,
          168,
          203
        )(`确定提交代码么? \n git源地址：${remote}\n git分支:${branch} \n`)
      }
    ]);
    if (!isSubmit) {
      console.log(chalk.rgb(13, 188, 121)("\n您取消了代码提交"));
      return;
    }
    await callback();
  }

  async add(callback = () => {}) {
    let { remote, branch, addReg, pushReg, committedReg, spinner } = this;
    console.log(chalk.rgb(17, 168, 203)("\n git status:\n "));
    const { stdout, code } = await this.PromiseExec("git status", {
      stdio: undefined
    });
    this.status = stdout;
    console.log(stdout);
    if (this.status.match(addReg)) {
      // console.log(chalk.rgb(17, 168, 203)("git add:\n "));
      spinner = ora("代码 git add . 中...");
      spinner.start();
      await this.PromiseExec("git add .").catch((error) => {
        const { err, stderr } = error;
        console.error(chalk.red(`\n 文件 git add . 失败：${stderr}`));
        spinner.stop();
        return false;
      });
      spinner.stop();
      console.log(chalk.rgb(13, 188, 121)("\n 文件 git add . 成功。"));
    }
    callback();
  }
  async committed(callback = () => {}) {
    let { status, remote, branch, addReg, pushReg, committedReg, spinner } =
      this;
    if (status.match(committedReg)) {
      let { commitType } = await inquirer.prompt([
        {
          type: "rawlist",
          name: "commitType",
          message: "提交commit类型",
          choices: [
            "feat: 新功能(feature)",
            "fix: bug修复",
            "test: 新增测试用例或是更新现有测试",
            "refactor: 重构代码(既没有新增功能，也没有修复 bug)",
            "style: 不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)",
            "build: 修改项目构建系统(例如 glup,webpack,rollup 的配置等)的提交",
            "perf: 性能优化",
            "docs: 文档更新(documentation)",
            "ci: 修改项目继续集成流程(例如 Travis,Jenkins,GitLab CI,Circle等)的提交",
            "revert: 回滚某个更早之前的提交",
            "chore: 构建过程或辅助工具的变动"
          ]
        }
      ]);
      let { commitMessage } = await inquirer.prompt([
        {
          name: "commitMessage",
          type: "input",
          message: "请输入commit信息"
        }
      ]);
      spinner = ora("代码 git commit 中...  \n");
      spinner.start();
      await new Promise((reslove, reject) => {
        execute(
          `git commit -m  ${commitType.split(":")[0]}: ${commitMessage}`,
          {
            stdio: null,
            transformCmd: (cmd) => {
              return cmd.slice(0, 2).concat([cmd.slice(2).join(" ")]);
            },
            getStderr: (stderr) => {
              if (
                stderr.search("husky - pre-commit hook exited with code") >= 0
              ) {
                reject(stderr);
              } else {
                console.log(stderr);
              }
            },
            getStdout: (stdout) => {
              reslove();
            },
            callback: () => {
              reslove();
            }
          }
        );
      })
        .then(() => {
          spinner.stop();
          console.log(
            chalk.rgb(13, 188, 121)("\n git commit成功。\n")
          );
          callback();
        })
        .catch((error) => {
          spinner.stop();
          console.log(chalk.red(error));
          console.log(
            chalk.red("lint 校验错误，请检查代码重新提交。可以尝试运行 npm run eslint 与 npm run lint-style 命令进行修复。可以尝试运行npm run eslint修复")
          );
        });
    } else {
      callback();
    }
  }
  async push(callback = () => {}) {
    let { status, remote, branch, addReg, pushReg, committedReg, spinner } =
      this;
    if (status.match(pushReg) || status.match(committedReg)) {
      spinner = ora("代码在push中...\n");
      spinner.start();

      await new Promise((reslove, reject) => {
        let stderrs = [];
        execute("git push", {
          stdio: null,
          getStderr: (stderr) => {
            stderrs.push(stderr);
          },
          getStdout: (stdout) => {},
          callback: () => {
            reslove(stderrs);
          }
        });
      })
        .then((stderrs) => {
          stderrs = stderrs.join("\n");
          if (stderrs.search("error") >= 0 || stderrs.search("fatal") >= 0) {
            throw stderrs;
          }
          console.log(chalk.rgb(13, 188, 121)(`${stderrs}\n`));
          console.log(
            chalk.rgb(
              13,
              188,
              121
            )(
              `\n git push 代码成功。\n git源地址：${remote}\n git分支:${branch}`
            )
          );
          spinner.stop();
        })
        .catch((error) => {
          console.error(chalk.red(`\n 文件 git push  失败：\n ${error}`));
          spinner.stop();
        });
    }
    callback();
  }
}

new Git();
