FROM redis         #依赖centos镜像
 
MAINTAINER yao guan shou    #作者信息
 
RUN groupadd -r redis && useradd -r -g redis redis
RUN mkdir /data && chown redis:redis /data
VOLUME ["/data"]                            #将容器中的/data目录挂在到主机中
ADD redis-3.2.8.tar.gz /data/               #拷贝源码包，并解压
RUN yum install -y gcc gcc-c++ net-tools make
WORKDIR /data/redis-3.2.8/src/              #切换目录
RUN make && make install
Copy redis-master.conf .                    #拷贝配置文件
EXPOSE 6801                                 #指定监听端口
CMD ["redis-server","redis-master.conf"]    #容器启动后，启动redis服务