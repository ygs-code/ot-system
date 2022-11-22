// 路由配置
export default [
  {
    path: "/",
    exact: true,
    name: "~index", // 特殊路由
    entry: "/pages/Index/pages/Home",
    level: 2
  },
  {
    path: "/home",
    exact: true,
    name: "home",
    entry: "/pages/Index/pages/Home",
    level: 2
  }
];
