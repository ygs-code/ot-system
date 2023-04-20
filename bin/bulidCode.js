#!/usr/bin/env node
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
// const chalk = require('chalk')
const gitConfig = require('./gitConfig'); // 与用户互动
const { execute } = require('./cmd'); // 与用户互动
const path = require('path');
const fs = require('fs');
const { readdirSync, stat } = fs;
const os = require('os');
const chalk = require('chalk');
var { rimrafSync } = require('rimraf');

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
    removeDrf(path, callback = () => {}) {
        rimrafSync(path);
        // return new Promise((reslove, reject) => {
        //     rimrafSync(path, () => {
        //         callback();
        //         reslove();
        //     });
        // });
    }
    async gitBuild() {
        for (let item of gitConfig) {
            let { name, dir, git, isDockerBuild } = item;
            if (isDockerBuild) {
                continue;
            }
            // console.log('item==',item)
            process.chdir(path.join(__dirname, '../'));
            dir = path.join(__dirname, '../', dir);
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
        const npm = os.type() === 'Windows_NT' ? 'npm.cmd' : 'npm';
        const yarn = os.type() === 'Windows_NT' ? 'yarn.cmd' : 'yarn';
        let cmd = '';

        console.log(`开始模块为${name},清理${dir} dist , node_modules 目录下所有文件，以及清理缓存`);
        await this.removeDrf(path.join(dir, '/node_modules'));
        await this.removeDrf(path.join(dir, '/dist'));
        await this.removeDrf(path.join(dir, '/package-lock.json'));
        await this.removeDrf(path.join(dir, '/yarn.lock'));
        await this.removeDrf(`${npm} cache clean --force`);
        console.log('删除成功');

        console.log('安装npm依赖包');
        await this.PromiseExec(`${yarn} install`);
        console.log('安装成功');

        console.log(`开始编译打包:${name}`);
        if (
            dir.search('ot-system-admin') >= 0 ||
            dir.search('ot-system-client') >= 0
        ) {
            cmd = `${npm} run build:client:prod`;
        }

        if (dir.search('ot-system-server') >= 0) {
            cmd = `${npm} run build:prd`;
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
