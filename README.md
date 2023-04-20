# OT协同文档
##   简介：

 开源ot协同系统是由 姚观寿 业余时间打造的一个开源项目，改项目具有安全性高，实时高效，低延迟，企业级别文档服务，socket实时通信，增量局部文档改动等功能，支持大数据，高并发，集群等部署。

 该项目前后端一键部署，部署功能已经做好docker 和 docker-compose相关配置，部署只需要执行一个shell脚本指令，配置域名ip地址即可部署上线。

该项目可拓展性高，具留有redis 和 mysql相关拓展接口。

该项目是目前开源协同系统最完善的一套系统，可以用来学习ot协同文档只是，或者用于拓展企业级的ot协同文档项目。

## 安装

那接下来我就来安装下这个ot协同文档系统

### 克隆主仓库

下载克隆该项目源码

```
git clone https://github.com/ygs-code/ot-system.git
```

### 安装依赖

克隆完该项目之后，安装依赖包

```
cd ot-system 
npm install
```

安装成功依赖包之后

### 克隆子仓库

因为该ot系统是分为一个主仓库，和 三个 子仓库来搭建的，

主仓库主要是负责管理这三个子仓库，三个子仓库分别是ot-system-admin，ot-system-client，ot-system-server 不难看出这三个仓库分别是后台管理客户端，C端客户端，左后一个是server服务。

这三个子仓库并不需要手动下来可用，因为我已经写好啦 shell 脚本克隆这三个仓库

运行下面改执行即可自动下载代码

```
npm run updateCode
```

![1](./README_IMAGES/1.png)

运行完之后我们看到项目中多了三个目录。三个仓库分别是后台管理客户端，C端客户端，左后一个是server服务。

### 安装子仓库依赖

接下来我们先来启动server后台服务

首先我们需要安装依赖， cd 进入ot-system-server目录

```
cd ot-system-server
npm install
```

安装依赖成功之后，这个时候还不能启动后台server服务，因为该服务是要依赖 redis和mysql的。

这里如何安装redis和mysql我这里就不多介绍了，这个你们自己百度下。

这里需要注意的是，我node server服务连接的redis和mysql是设置了密码，密码为：123456。端口号没有更改还是保持redis和mysql他们默认的端口号。



然后当然你也可以用docker容器启动redis和mysql，因为我这里已经写好了docker容器配置，这个时候你只需要在docker官网下载一个docker安装包即可。

然后回到最外层目录, 分别需要构建 redis 和 mysql镜像，运行以下指令

```
cd ot-system
npm run publish:redis
npm run publish:mysql
```

这样就可以启动了 redis 和mysql 容器，里面的打包镜像和启动容器我都写好shell脚本了。

### 启动node server服务

进入ot-system-server目录,  需要 启动node 需要两个指令，第一个是先要把他编译成es5代码。因为我在node服务是用了es6 es7 node 对es6和es7不是很友好，所以我自己写了一个webpack脚手架。 所以第一步 运行 build:dev，打包编译 dev环境代码。

```
npm run build:dev
```

打包完成之后启动服务，也可以同时两个指令同时执行，当然在npm run build:dev 运行完之后请不要关闭它，因为他需要时时热编译，这样才能保证代码修改完之后重启服务器，然后得到最新的代码。

启动命令 dev:n, 这个命令是用nodemon来启动node

```
npm run  dev:n
```

当然如果你喜欢用pm2也是可以的 dev:p, 这样就可以用pm2来启动服务器了。

```
npm run dev:p
```



### 启动 client C端客户端

c 端客户端 我是用我自己写的一个 React Ssr框架写的，这个框架牛逼之处就是同时之处CSR和SSR渲染，并且他们同构，而且从CSR切换到SSR  或  者 从SSR 切换 到CSR，并不需要做兼容，只需要稍微改动下 title 和 关键词 即可。

如果有兴趣请看我的ssr框架地址：https://github.com/ygs-code/react-ssr-lazy-loading

启动 c 端客户端，首先需要进入 ot-system-client

```
cd ot-system-client
```

安装依赖

```
npm i
```

CSR  启动客户端 开发

```
npm run start:client:dev
```

当然如果你喜欢SSR，则可以运行 start:ssr:dev 开发

```
npm run start:ssr:dev 
```

此时可以浏览器打开 http://localhost:3002/