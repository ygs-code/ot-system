import {
  // MenuUnfoldOutlined,
  // MenuFoldOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
  // UploadOutlined,
  // HomeOutlined,
  // PieChartOutlined,
  // DesktopOutlined,
  // ContainerOutlined,
  // MailOutlined,
  // AppstoreOutlined,
  // WarningOutlined,
  SettingOutlined
  // ProjectOutlined
} from "@ant-design/icons";
import {
  // Layout,
  Menu
  //  Select
} from "antd";
import React, {
  // forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

const { SubMenu } = Menu;
// const { Option } = Select;
// const { Header, Sider, Content } = Layout;
// const Performance = memo(
//   forwardRef(() => {
//     return (
//       <svg
//         className="performance"
//         viewBox="0 0 1024 1024"
//         version="1.1"
//         xmlns="http://www.w3.org/2000/svg"
//         width="18"
//         height="18"
//         fill="rgb(157, 164, 172)">
//         <defs>
//           <style type="text/css"></style>
//         </defs>
//         <path d="M512 128c51.9 0 102.2 10.1 149.5 30.2 45.7 19.3 86.8 47 122.1 82.3s63 76.4 82.3 122.1c20 47.3 30.2 97.6 30.2 149.5S886 614.3 865.9 661.6c-19.3 45.7-47 86.8-82.3 122.1s-76.4 63-122.1 82.3c-47.3 20-97.6 30.2-149.5 30.2S409.8 886.1 362.5 866c-45.7-19.3-86.8-47-122.1-82.3s-63-76.4-82.3-122.1c-20-47.3-30.2-97.6-30.2-149.5s10.1-102.2 30.2-149.5c19.3-45.7 47-86.8 82.3-122.1s76.4-63 122.1-82.3C409.8 138.1 460.1 128 512 128m0-64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z"></path>
//         <path d="M254 403c14.1-33.3 34.3-63.3 60-89 25.7-25.7 55.7-45.9 89-60 34.5-14.6 71.2-22 109-22s74.5 7.4 109 22c33.3 14.1 63.3 34.3 89 60l28.3-28.3C680.4 227.8 600.4 192 512 192c-176.7 0-320 143.3-320 320h40c0-37.8 7.4-74.5 22-109zM557.3 557.2c-25 25-65.5 25-90.5 0s-25-65.5 0-90.5S693 331 693 331 582.3 532.2 557.3 557.2z"></path>
//       </svg>
//     );
//   })
// );
// const PerformanceIcon = () => <Icon component={Performance} />;
export default memo((props) => {
  const {
    match: { path, params: { id } = {} } = {},
    routePaths = {},
    pushRoute
  } = props;
  console.log("Menu props=====", props);

  const [selectedKeys, setSelectedKeys] = useState("-1");
  const [openKeys, setOpenKeys] = useState([]);

  const goTo = useCallback((menu) => {
    pushRoute(menu.url);
  }, []);

  const menuData = useMemo(() => {
    return [
      // {
      //   // title: "项目列表",
      //   // url: "/index", // 路由地址
      //   // iconComponent: <ProjectOutlined />,
      //   // key: "1",
      //   // children: [
      //   //   {
      //   //     title: "脚本异常",
      //   //     url: "http:xxxxx", // 路由地址
      //   //     // iconComponent: <WarningOutlined/>,
      //   //     key: "1-1",
      //   //     children: [
      //   //       // 子菜单
      //   //     ],
      //   //   },
      //   //   {
      //   //     title: "资源下载",
      //   //     url: "http:xxxxx", // 路由地址
      //   //     // iconComponent: <WarningOutlined/>,
      //   //     key: "1-2",
      //   //     children: [
      //   //       // 子菜单
      //   //     ],
      //   //   },
      //   //   {
      //   //     title: "网络请求",
      //   //     url: "http:xxxxx", // 路由地址
      //   //     // iconComponent: <WarningOutlined/>,
      //   //     key: "1-3",
      //   //     children: [
      //   //       // 子菜单
      //   //     ],
      //   //   },
      //   // ],
      // },
      {
        title: "系统设置",
        url: "http:xxxxx", // 路由地址
        iconComponent: <SettingOutlined />,
        key: "1",
        children: [
          {
            title: "账号权限",
            url: "http:xxxxx", // 路由地址
            // iconComponent: <SettingOutlined />,
            key: "2",
            children: [
              {
                title: "账号管理",
                url: routePaths.accountManagement, // 路由地址
                // iconComponent: <HomeOutlined/>,
                key: "5",
                children: [
                  // 子菜单
                ]
              },
              {
                title: "角色管理",
                url: "http:xxxxx", // 路由地址
                // iconComponent: <HomeOutlined/>,
                key: "3",
                children: [
                  // 子菜单
                ]
              },
              {
                title: "权限管理",
                url: "http:xxxxx", // 路由地址
                // iconComponent: <HomeOutlined/>,
                key: "4",
                children: [
                  // 子菜单
                ]
              }
              // {
              //   title: "页面(URL)",
              //   url: "http:xxxxx", // 路由地址
              //   iconComponent: <HomeOutlined/>,
              //   key: "2-3",
              //   children: [
              //     // 子菜单
              //   ],
              // },
              // {
              //   title: "页面(路由)",
              //   url: "http:xxxxx", // 路由地址
              //   iconComponent: <HomeOutlined/>,
              //   key: "2-4",
              //   children: [
              //     // 子菜单
              //   ],
              // },
            ]
          }
        ]
      }
    ];
  }, []);
  // const [menuData, setMenuData] = useState([
  //   // {
  //   //   // title: "项目列表",
  //   //   // url: "/index", // 路由地址
  //   //   // iconComponent: <ProjectOutlined />,
  //   //   // key: "1",
  //   //   // children: [
  //   //   //   {
  //   //   //     title: "脚本异常",
  //   //   //     url: "http:xxxxx", // 路由地址
  //   //   //     // iconComponent: <WarningOutlined/>,
  //   //   //     key: "1-1",
  //   //   //     children: [
  //   //   //       // 子菜单
  //   //   //     ],
  //   //   //   },
  //   //   //   {
  //   //   //     title: "资源下载",
  //   //   //     url: "http:xxxxx", // 路由地址
  //   //   //     // iconComponent: <WarningOutlined/>,
  //   //   //     key: "1-2",
  //   //   //     children: [
  //   //   //       // 子菜单
  //   //   //     ],
  //   //   //   },
  //   //   //   {
  //   //   //     title: "网络请求",
  //   //   //     url: "http:xxxxx", // 路由地址
  //   //   //     // iconComponent: <WarningOutlined/>,
  //   //   //     key: "1-3",
  //   //   //     children: [
  //   //   //       // 子菜单
  //   //   //     ],
  //   //   //   },
  //   //   // ],
  //   // },
  //   {
  //     title: "系统设置",
  //     url: "http:xxxxx", // 路由地址
  //     iconComponent: <SettingOutlined />,
  //     key: "1",
  //     children: [
  //       {
  //         title: "账号权限",
  //         url: "http:xxxxx", // 路由地址
  //         // iconComponent: <SettingOutlined />,
  //         key: "2",
  //         children: [
  //           {
  //             title: "账号管理",
  //             url: routePaths.accountManagement, // 路由地址
  //             // iconComponent: <HomeOutlined/>,
  //             key: "5",
  //             children: [
  //               // 子菜单
  //             ]
  //           },
  //           {
  //             title: "角色管理",
  //             url: "http:xxxxx", // 路由地址
  //             // iconComponent: <HomeOutlined/>,
  //             key: "3",
  //             children: [
  //               // 子菜单
  //             ]
  //           },
  //           {
  //             title: "权限管理",
  //             url: "http:xxxxx", // 路由地址
  //             // iconComponent: <HomeOutlined/>,
  //             key: "4",
  //             children: [
  //               // 子菜单
  //             ]
  //           }
  //           // {
  //           //   title: "页面(URL)",
  //           //   url: "http:xxxxx", // 路由地址
  //           //   iconComponent: <HomeOutlined/>,
  //           //   key: "2-3",
  //           //   children: [
  //           //     // 子菜单
  //           //   ],
  //           // },
  //           // {
  //           //   title: "页面(路由)",
  //           //   url: "http:xxxxx", // 路由地址
  //           //   iconComponent: <HomeOutlined/>,
  //           //   key: "2-4",
  //           //   children: [
  //           //     // 子菜单
  //           //   ],
  //           // },
  //         ]
  //       }
  //     ]
  //   }
  // ]);
  // const isProjectPage = () => {
  //   let reg = /^\/index\/\:id\?$/gi;
  //   return reg.test(path) && id;
  // };
  // const getMenuData = () => {
  //   let reg = /^\/index\/\:id\?$/gi;

  //   setMenuData([
  //     // {
  //     //   // title: "项目列表",
  //     //   // url: "/index", // 路由地址
  //     //   // iconComponent: <ProjectOutlined />,
  //     //   // key: "1",
  //     //   // children: [
  //     //   //   {
  //     //   //     title: "脚本异常",
  //     //   //     url: "http:xxxxx", // 路由地址
  //     //   //     // iconComponent: <WarningOutlined/>,
  //     //   //     key: "1-1",
  //     //   //     children: [
  //     //   //       // 子菜单
  //     //   //     ],
  //     //   //   },
  //     //   //   {
  //     //   //     title: "资源下载",
  //     //   //     url: "http:xxxxx", // 路由地址
  //     //   //     // iconComponent: <WarningOutlined/>,
  //     //   //     key: "1-2",
  //     //   //     children: [
  //     //   //       // 子菜单
  //     //   //     ],
  //     //   //   },
  //     //   //   {
  //     //   //     title: "网络请求",
  //     //   //     url: "http:xxxxx", // 路由地址
  //     //   //     // iconComponent: <WarningOutlined/>,
  //     //   //     key: "1-3",
  //     //   //     children: [
  //     //   //       // 子菜单
  //     //   //     ],
  //     //   //   },
  //     //   // ],
  //     // },
  //     {
  //       title: "系统设置",
  //       url: "http:xxxxx", // 路由地址
  //       iconComponent: <SettingOutlined />,
  //       key: "1",
  //       children: [
  //         {
  //           title: "账号权限",
  //           url: "http:xxxxx", // 路由地址
  //           // iconComponent: <SettingOutlined />,
  //           key: "2",
  //           children: [
  //             {
  //               title: "账号管理",
  //               url: routePaths.accountManagement, // 路由地址
  //               // iconComponent: <HomeOutlined/>,
  //               key: "5",
  //               children: [
  //                 // 子菜单
  //               ]
  //             },
  //             {
  //               title: "角色管理",
  //               url: "http:xxxxx", // 路由地址
  //               // iconComponent: <HomeOutlined/>,
  //               key: "3",
  //               children: [
  //                 // 子菜单
  //               ]
  //             },
  //             {
  //               title: "权限管理",
  //               url: "http:xxxxx", // 路由地址
  //               // iconComponent: <HomeOutlined/>,
  //               key: "4",
  //               children: [
  //                 // 子菜单
  //               ]
  //             }
  //             // {
  //             //   title: "页面(URL)",
  //             //   url: "http:xxxxx", // 路由地址
  //             //   iconComponent: <HomeOutlined/>,
  //             //   key: "2-3",
  //             //   children: [
  //             //     // 子菜单
  //             //   ],
  //             // },
  //             // {
  //             //   title: "页面(路由)",
  //             //   url: "http:xxxxx", // 路由地址
  //             //   iconComponent: <HomeOutlined/>,
  //             //   key: "2-4",
  //             //   children: [
  //             //     // 子菜单
  //             //   ],
  //             // },
  //           ]
  //         }
  //       ]
  //     }
  //   ]);
  //   setSelectedKeys("0");
  // };
  useEffect(() => {
    const menuSelectedKeys =
      sessionStorage.getItem("adminMenuSelectedKeys") || "";
    let menuOpenKeys = sessionStorage.getItem("adminMenuOpenKeys") || "[]";
    menuOpenKeys = JSON.parse(menuOpenKeys);

    setSelectedKeys(menuSelectedKeys);
    setOpenKeys(menuOpenKeys);
    // defaultOpenKeys
  }, [id, path]);

  // const mapIconComponent = useCallback((key) => {
  //   const ionComponent = {
  //     PieChartOutlined: <PieChartOutlined />,
  //     DesktopOutlined: <DesktopOutlined />,
  //     ContainerOutlined: <ContainerOutlined />,
  //     WarningOutlined: <WarningOutlined />,
  //     PerformanceIcon: <PerformanceIcon />
  //   };
  //   return (key in ionComponent && ionComponent[key]) || null;
  // }, []);
  const getMenu = useCallback((menuData = [], index = null) => {
    return menuData.map((item, _index) => {
      const menuKey = index === null ? _index : `${index}_${_index}`;
      return item.children && item.children.length ? (
        <SubMenu key={menuKey} icon={item.iconComponent} title={item.title}>
          {getMenu(item.children, menuKey)}
        </SubMenu>
      ) : (
        <Menu.Item
          key={menuKey}
          icon={item.iconComponent}
          onClick={() => {
            goTo(item);
          }}>
          {item.title}
        </Menu.Item>
      );
    });
  }, []);

  //   const onChange = useCallback((value) => {});

  // const onBlur = useCallback(() => {});

  // const onFocus = useCallback(() => {});

  // const onSearch = useCallback((val) => {});

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKeys]}
      openKeys={openKeys}
      onOpenChange={(keyPath) => {
        sessionStorage.setItem("adminMenuOpenKeys", JSON.stringify(keyPath));
        setOpenKeys(keyPath);
      }}
      onSelect={(value) => {
        const { key: selectedKeys, keyPath } = value;
        sessionStorage.setItem("adminMenuSelectedKeys", selectedKeys);
        sessionStorage.setItem("adminMenuOpenKeys", JSON.stringify(keyPath));
        setSelectedKeys(selectedKeys);
        setOpenKeys(keyPath);
      }}
      defaultSelectedKeys={[selectedKeys]}>
      {/*
        //   isProjectPage() ? (
        //   <Menu.Item key="-1" icon={<HomeOutlined />}>
        //     <Select
        //       style={{ width: "185px" }}
        //       className="menu-select"
        //       showSearch
        //       placeholder="请选择项目"
        //       optionFilterProp="children"
        //       onChange={onChange}
        //       onFocus={onFocus}
        //       onBlur={onBlur}
        //       onSearch={onSearch}
        //       filterOption={(input, option) =>
        //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        //       }
        //     >
        //       <Option value="jack">Jack</Option>
        //       <Option value="lucy">Lucy</Option>
        //       <Option value="tom">Tom</Option>
        //     </Select>
        //   </Menu.Item>
        // ) : null}
        */}

      {getMenu(menuData)}
    </Menu>
  );
});
