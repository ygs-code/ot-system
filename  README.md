# ot 协同系统

## 安装 

```
yarn 
# 或者
npm i
```



### 下载安装子项目

```
npm run git
```



克隆完子项目之后分别有三个项目目录

ot-system-admin，  ot-system-client ， ot-system-server

进入子项目安装 ot-system-admin，  ot-system-client ， ot-system-server 依赖

```
yarn 
# 或者
npm i
```



### 启动ot-system-admin 后台管理系统

```
npm run start:client:dev
```

如果需要ssr渲染则运行

```
npm run start:ssr:dev
```



 

### server 服务系统启动 

因为本服务使用了 redis 所以本地要安装redis 还需要改端口和redis等密码

redis 配置

```
  REDIS_CONF = {
    host: "127.0.0.1", //地址
    port: "6378", // 端口
    options: {
      auth_pass: 123456 // 密码
    }
  };
```

### 并且要先启动redis

### 还需要安装 mysql 安装

mysql 连接配置

```
  MYSQL_CONF = {
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    port: "3306",
    database: "admin",
    // charset:'utf8mb4',   //字符集一定要写，否则表情包存储不了
    multipleStatements: true // 是否许一个query中有多个MySQL语句 （默认：false）
  };
```



### 启动服务器

#### 启动编译代码

```
npm run build:dev
```



#### 启动服务器

```
npm run dev:n
```



