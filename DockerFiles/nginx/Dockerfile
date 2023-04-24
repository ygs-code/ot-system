# 设置基础镜像
FROM nginx:alpine
# 定义作者
MAINTAINER yao guan shou

#清理缓存
# ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
# # 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
# COPY dist/  /usr/share/nginx/html/
# ARG

#更新Alpine的软件源为国内（清华大学）的站点，因为从默认官源拉取实在太慢了。。。
RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main/" > /etc/apk/repositories
RUN apk update \
    && apk upgrade \
    && apk add --no-cache bash \
    bash-doc \
    bash-completion \
    && rm -rf /var/ca


# 覆盖默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo 'entry镜像build构建成功'
 