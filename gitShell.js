#!/usr/bin/env node

// const inquirer = require('inquirer'); // 与用户互动
const requireFrom = require('import-from')
// const ora = require('ora')
const execSync = require('child_process').execSync
const exec = require('child_process').exec
// const chalk = require('chalk')
const gitConfig = require('./gitConfig') // 与用户互动
const path = require('path')
const fs = require('fs')
const { readdirSync, stat } = fs

class Git {
  constructor() {
    this.addReg = /git add/gi
    this.pushReg = /git push/gi
    this.committedReg = /committed/gi
    this.spinner
    this.init()
  }
  async gitClonePull() {
    for (let item of gitConfig) {
      const { name, dir, git } = item
      await new Promise((resolve, reject) => {
        stat(path.join(__dirname, dir), async (err, stats) => {
          if (!err && stats.isDirectory()) {
            // 更新
            await this.gitPull({ name, dir: path.join(__dirname, dir), git })
            resolve()
          } else {
            // 克隆
            await this.gitClone({ name, dir: path.join(__dirname, dir), git })
            resolve()
          }
        })
      })
    }
  }

  async gitClone({ name, dir, git }) {
    console.log(`克隆:${name}\n  git源地址：${git}\n`)
    await this.PromiseExec(`git clone ${git}`)
    let { stdout: remote } = await this.PromiseExec(
      `cd ${dir} && git remote -v`,
    )
    remote = remote.split('\n')[1]
    let { stdout: branch } = await this.PromiseExec(`cd ${dir} && git branch`)
    branch = branch.toString().match(/(?<=\*)\s*\w+/)[0]
    console.log(`克隆:${name}成功\n  git源地址：${remote}\n  git分支:${branch}`)
  }
  async gitPull({ name, dir, git }) {
    let { stdout: remote } = await this.PromiseExec(
      `cd ${dir} && git remote -v`,
    )
    remote = remote.split('\n')[1]
    let { stdout: branch } = await this.PromiseExec(`cd ${dir} && git branch`)
    branch = branch.toString().match(/(?<=\*)\s*\w+/)[0]
    console.log(`更新:${name}\n git源地址：${remote}\n git分支:${branch}`)
    await this.PromiseExec(`cd ${dir} &&  git pull`)
    console.log(`更新:${name}成功\n\n`)
  }
  async init() {
    await this.gitClonePull()
  }

  // 执行程序
  PromiseExec(cmd, callback = () => {}) {
    return new Promise((reslove, reject) => {
      var workerProcess = exec(cmd, (err, stdout, stderr) => {
        if (!err) {
          reslove({
            cmd,
            stdout,
            stderr,
            code: 200,
          })
        } else {
          reject({
            code: 500,
            err,
            stderr,
          })
        }
      })
      workerProcess.on('exit', (code) => {
        callback(code)
      })
    })
  }
}

new Git()
