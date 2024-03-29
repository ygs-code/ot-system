/*
 * @Date: 2022-06-06 10:28:48
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-06 16:09:29
 * @FilePath: /Blogs/gitConfig.js
 * @Description:
 * 
 * 如果更新有问题 请把git地址前缀 git@github.com:ygs-code/ 替换成 https://github.com/qq281113270/
  用http下载
 */
module.exports = [
    {
        name: '后台管理系统',
        container_name: 'admin',
        dir: 'ot-system-admin',
        git: 'git@github.com:ygs-code/ot-system-admin.git',
    },
    {
        name: '后台服务',
        container_name: 'server',
        dir: 'ot-system-server',
        git: 'git@github.com:ygs-code/ot-system-server.git',
        isDockerBuild: true,
    },
    {
        name: '客户端',
        container_name: 'client',
        dir: 'ot-system-client',
        git: 'git@github.com:ygs-code/ot-system-client.git',
    },
];
