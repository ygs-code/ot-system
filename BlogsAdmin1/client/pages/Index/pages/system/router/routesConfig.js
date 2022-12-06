// 路由配置
export default [
  {
    path: "/system",
    exact: true,
    name: "system",
    entry: "/pages/Index/pages/system/index.js",
    level: 2,
    children: [
      {
        path: "/account-management",
        name: "accountManagement",
        entry: "/pages/Index/pages/system/pages/AccountManagement/index.js",
        level: 2,
        children: [
          {
            path: "/details/:action/:id?",
            name: "accountManagementDetails",
            entry:
              "/pages/Index/pages/system/pages/AccountManagement/details/index.js",
            level: 2,
            children: []
          }
        ]
      }
    ]
  }
];
