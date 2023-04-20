FROM mysql:5.7
#作者信息
MAINTAINER    yao guan shou

# 将 init.sql 放到 docker 初始化文件家中
RUN echo '初始化mysql表'
COPY init.sql /docker-entrypoint-initdb.d/init.sql
#设置免密登录
# ENV MYSQL_ALLOW_EMPTY_PASSWORD yes
EXPOSE 3307
RUN echo 'mysql容器打包成功'


