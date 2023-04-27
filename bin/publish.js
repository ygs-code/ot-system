#!/usr/bin/env node
const kill = require("kill-port");
const updateCode = require("./updateCode");
const bulidCode = require("./bulidCode");
const { execute } = require("./cmd"); // 
const os = require("os");
const detect = require("detect-port");

const {
  env: { type, REDIS_PORT, CLIENT_PORT, ADMIN_PORT, MYSQL_PORT, SERVER_PORT },
} = process;
class Publish {
  constructor() {
    this.init();
  }

  init() {
    let mapTypes = {
      update_code: () => this.updateCode(),
      bulid_code: () => this.bulidCode(),
      publish_all: () => this.publishAll(),
      publish_redis: () => this.publisRedis(),
      publish_mysql: () => this.publisMysql(),
      publish_server: () => this.publisServer(),
      publish_client: () => this.publishClient(),
      publish_admin: () => this.publishAdmin(),
      publish_entry: () => this.publishEntry(),
    };
    mapTypes[type] && mapTypes[type]();
  }
  async checkPort(port) {
    return new Promise(async (reslove, reject) => {
      await detect(port)
        .then((_port) => {
          if (port == _port) {
            reslove({
              error: null,
              port,
            });
          } else {
            reject({
              error: `port: ${port} was occupied, try port: ${_port}`,
              port: _port,
            });
          }
        })
        .catch((err) => {
          reject({
            error: err,
            // port: _port,
          });
          console.log("checkPort err:", err);
        });
    });
  }
  async killPort(port) {
    return new Promise(async (reslove, reject) => {
      try {
        await this.checkPort(port)
          .then((data) => {
            const { error, port: $port } = data;
            // 说明端口 没有被占用
            if (!error && $port === port) {
              reslove();
              return;
            }
            console.log(`结束端口:${port}`);
            kill(port, "tcp")
              .then(() => {
                reslove();
              })
              .catch(() => {
                reslove();
              });
          })
          .catch(() => {
            reslove();
          });
      } catch (e) {}
    });
  }
  async runDocker({
    stopContainer = "",
    rmContainer = "",
    rmiImage = "",
    buildImage = "",
    upContainer = "",
    port,
  }) {
    console.log(`停止容器\n docker-compose stop ${stopContainer}`);
    await this.PromiseExec(`docker-compose stop ${stopContainer}`);

    console.log(`删除容器\n docker-compose rm -f ${rmContainer}`);
    await this.PromiseExec(`docker-compose rm -f ${rmContainer}`);

    if ((port = "all")) {
      await this.killPort(CLIENT_PORT);
      await this.killPort(ADMIN_PORT);
      await this.killPort(SERVER_PORT);
      await this.killPort(REDIS_PORT);
      await this.killPort(MYSQL_PORT);
    } else {
      await this.killPort(port);
    }

    console.log(`删除镜像\n docker rmi -f ${rmiImage}`);
    await this.PromiseExec(`docker rmi -f ${rmiImage}`);

    console.log(`build编译镜像\n docker-compose build ${buildImage}`);
    await this.PromiseExec(`docker-compose build ${buildImage}`);

    console.log(`启动容器\n  docker-compose up -d ${upContainer}`);
    await this.PromiseExec(`docker-compose up -d ${upContainer}`);

    console.log("启动成功\n");
  }
  async updateCode(type) {
    console.log("更新代码\n");
    await updateCode.init(type);
    console.log("代码更新成功\n");
  }
  async bulidCode(type) {
    console.log("打包编译代码\n");
    await bulidCode.init(type);
    console.log("代码打包成功\n");
  }

  async publishClient() {
    await this.updateCode("client");

    // await this.bulidCode("client");

    this.runDocker({
      stopContainer: "client",
      rmContainer: "client ",
      rmiImage: "ot-system-client",
      buildImage: "client",
      upContainer: "client",
      port: CLIENT_PORT,
    });
  }
  async publishAdmin() {
    await this.updateCode("admin");

    // await this.bulidCode("admin");

    this.runDocker({
      stopContainer: "admin",
      rmContainer: "admin",
      rmiImage: "ot-system-admin",
      buildImage: "admin",
      upContainer: "admin",
      port: ADMIN_PORT,
    });
  }
  async publishEntry() {
    this.runDocker({
      stopContainer: "entry",
      rmContainer: "entry ",
      rmiImage: "ot-system-entry",
      buildImage: "entry ",
      upContainer: "entry ",
      // port:ADMIN_PORT,
    });
  }

  async publisMysql() {
    this.runDocker({
      stopContainer: "mysql",
      rmContainer: "mysql",
      rmiImage: "ot-system-mysql",
      buildImage: "mysql",
      upContainer: "mysql",
      port: MYSQL_PORT,
    });
  }
  async publisRedis() {
    this.runDocker({
      stopContainer: "redis",
      rmContainer: "redis",
      rmiImage: "ot-system-redis",
      buildImage: "redis",
      upContainer: "redis",
      port: REDIS_PORT,
    });
  }

  async publisServer() {
    await this.updateCode("server");

    this.runDocker({
      stopContainer: "server",
      rmContainer: "server",
      rmiImage: "ot-system-server",
      buildImage: "server",
      upContainer: "server",
      port: SERVER_PORT,
    });
  }

  async publishAll() {
    const npm = os.type() === "Windows_NT" ? "npm.cmd" : "npm";
    const yarn = os.type() === "Windows_NT" ? "yarn.cmd" : "yarn";

    await this.updateCode();

    // await this.bulidCode();

    this.runDocker({
      stopContainer: "redis mysql server client admin",
      rmContainer: "redis mysql server client admin",
      rmiImage:
        "ot-system-redis  ot-system-mysql  ot-system-server  ot-system-client  ot-system-admin",
      buildImage: "",
      upContainer: "",
      port: "all",
    });
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

new Publish();
