# 设置基础镜像
FROM redis:5.0
# 定义作者
MAINTAINER yao guan shou


RUN echo 'redis build 镜像中'
RUN echo '拷贝redis配置文件'
# 配置
COPY redis.conf /usr/local/etc/redis/redis.conf
RUN echo '拷贝成功'
#对外暴露的端口 将容器端口暴露出去后，可以与宿主机的端口建立映射关系，这样可以通过访问宿主机的端口来访问容器内部的服务。比如同时在 TCP、UDP 上暴露容器的80端口。
EXPOSE 6379
#镜像构建的时候需要运行的命令
RUN echo 'echo init ok!!'
#构建的时候设置环境变量！
# ENV  
#步骤：添加内容
# ADD   

RUN echo '启动redis'
#指定这个容器启动时候要运行的命令，Dockerfile里有多个CMD指令的话，只有最后一个CMD指令会生效，可被替代 
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
RUN echo 'redis启动成功'