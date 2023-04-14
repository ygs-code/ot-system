# 设置基础镜像
FROM nginx
# 定义作者
MAINTAINER yao guan shou
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
# COPY dist/  /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY nginx.conf /etc/nginx/conf/nginx.conf
# 覆盖默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ENV
# ENV的作用是设置环境变量，该环境变量设置之后，可以在构建过程及容器运行时的shell脚本中使用该变量，使用方法如：${NGINX_VERSION}。学过JAVA的同学想想你的JAVA_HOME环境变量怎么设置的以及怎么使用的？ENV是同样的道理。只不过放到docker这里语法发生了变化而已，语法格式:ENV 环境变量KEY 环境变量Value。
ENV NGINX_VERSION 1.20.2
#对外暴露的端口 将容器端口暴露出去后，可以与宿主机的端口建立映射关系，这样可以通过访问宿主机的端口来访问容器内部的服务。比如同时在 TCP、UDP 上暴露容器的80端口。
EXPOSE 80
STOPSIGNAL SIGQUIT
# 执行shell脚本
RUN echo 'echo init ok!!'


# # 执行shell脚本
# CMD [“executable”,“param1”,“param2”]
 