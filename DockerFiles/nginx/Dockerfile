# 设置基础镜像
FROM nginx
# 定义作者
MAINTAINER yao guan shou
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY nginx.conf /etc/nginx/conf/nginx.conf
# 覆盖默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo 'echo init ok!!'
 