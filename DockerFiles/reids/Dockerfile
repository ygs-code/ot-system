# 设置基础镜像
FROM redis:5.0
# 定义作者
MAINTAINER yao guan shou
# 配置
COPY redis.conf /usr/local/etc/redis/redis.conf
#对外暴露的端口 将容器端口暴露出去后，可以与宿主机的端口建立映射关系，这样可以通过访问宿主机的端口来访问容器内部的服务。比如同时在 TCP、UDP 上暴露容器的80端口。
# EXPOSE 6377
#镜像构建的时候需要运行的命令
RUN echo 'echo init ok!!'
#构建的时候设置环境变量！
# ENV  
#步骤：tomcat镜像，这个tomcat压缩包！添加内容
# ADD   

#指定这个容器启动时候要运行的命令，Dockerfile里有多个CMD指令的话，只有最后一个CMD指令会生效，可被替代 
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]

