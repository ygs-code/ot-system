#!/usr/bin/env node
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
// const chalk = require('chalk')
const gitConfig = require('./gitConfig'); // 与用户互动
const { execute } = require('./cmd'); // 与用户互动
const path = require('path');
const fs = require('fs');
const { readdirSync, stat } = fs;
const chalk = require('chalk');

const {
    env: { publish },
} = process;

/*
process.cwd()返回执行命令的目录(而不是节点包的目录)(如果应用程序内部的'process.chdir'尚未更改命令)。
__filename返回放置文件的绝对路径。
__dirname返回__filename目录的绝对路径。
*/
class UpdateCode {
    constructor() {
        this.addReg = /git add/gi;
        this.pushReg = /git push/gi;
        this.committedReg = /committed/gi;
        this.spinner;
        this.init();
    }
    async gitClonePull() {
        for (let item of gitConfig) {
            let { name, dir, git, container_name } = item;
            // 如果有配置单独发布则不会更新其他模块
            if (publish && publish != container_name) {
                continue;
            }
            // console.log('item==',item)
            process.chdir(path.join(__dirname, '../'));
            dir = path.join(__dirname, '../', dir);
            await new Promise((resolve, reject) => {
                // console.log('dir=', path.join(__dirname,'../',dir));
                stat(dir, async (err, stats) => {
                    if (!err && stats.isDirectory()) {
                        // 更新
                        await this.gitPull({
                            name,
                            dir,
                            git,
                        });
                        resolve();
                    } else {
                        // 克隆
                        await this.gitClone({
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

    async gitClone({ name, dir, git }) {
        console.log(
            chalk.rgb(17, 168, 203)(`\n开始克隆:${name}\n  git源地址：${git}\n`)
        );
        // this.spinner = ora(chalk.rgb(17, 168, 203)('克隆代码中请稍后.....\n'));
        // this.spinner.start();
        // process.chdir('../');
        await this.PromiseExec(`git clone ${git}`);

        // console.log('克隆成功')
        process.chdir(dir);
        let { stdout: remote } = await this.PromiseExec(`git remote -v`, {
            stdio: null,
        });
        remote = remote.split('\n')[1];
        let { stdout: branch } = await this.PromiseExec(`git branch`, {
            stdio: null,
        });
        branch = branch.toString().match(/(?<=\*)\s*\w+/)[0];
        console.log(
            chalk.rgb(
                13,
                188,
                121
            )(`克隆:${name}成功\n  git源地址：${remote}\n  git分支:${branch}`)
        );
        // this.spinner.stop();
    }
    async gitPull({ name, dir, git }) {
        process.chdir(dir);
        let { stdout: remote } = await this.PromiseExec(`git remote -v`, {
            stdio: null,
        });
        remote = remote.split('\n')[1];

        let { stdout: branch } = await this.PromiseExec(`git branch`, {
            stdio: null,
        });

        branch = branch.toString().match(/(?<=\*)\s*\w+/)[0];
        console.log(`更新:${name}\n git源地址：${remote}\n git分支:${branch}`);

        await this.PromiseExec(`git pull`);
        console.log(`更新:${name}成功\n\n`);
    }
    async init() {
        await this.gitClonePull();
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

new UpdateCode();
