import "./index.less";

import {
  Layout
  //  Menu,
  // Select
} from "antd";
import Header from "client/component/Header";
import Menu from "client/component/Menu";
import { mapRedux } from "client/redux";
import { addRouterApi } from "client/router";
import React, {
  Children,
  cloneElement,
  memo,
  useCallback,
  useEffect,
  useState
} from "react";
// import token from "@/common/js/request/token";
const { Sider } = Layout;

// 权限跳转登录页面可以在这控制
const Index = memo((props) => {
  const {
    state: {
      breadcrumb: { items = [] } = {},
      user: { userInfo: { user: { name, phone } = {} } = {} } = {}
    } = {},
    children
  } = props;
  console.log("props=", props);

  // useEffect(() => {
  //   // 登录拦截
  //   if (!token.get()) {
  //     token.clearQueue();
  //     push("/logLn");
  //   }
  //   // hello()

  //   return () => {};
  // }, [token.get()]);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const adminCollapsed = sessionStorage.getItem("adminCollapsed");

    setCollapsed(adminCollapsed === 1 ? true : false);

    return () => {};
  }, []);
  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
    sessionStorage.setItem("adminCollapsed", !collapsed ? "1" : "0");
  }, [collapsed]);

  return (
    <Layout className="root-layout">
      {/*左侧菜单*/}
      <Sider
        width="250"
        className="sider"
        trigger={null}
        collapsible
        collapsed={collapsed}>
        {/*菜单*/}
        <Menu collapsed={collapsed} {...props} />
      </Sider>

      <Layout className="site-layout">
        {/*顶部*/}
        <Header
          // avatar="头像地址"
          nickname={name}
          areaCode={name}
          mobile={phone}
          collapsed={collapsed}
          onClick={(type) => {
            console.log("type=", type);
          }}
          onChangeCollapsed={() => {
            toggle();
          }}
          breadcrumb={items}></Header>

        {/*中间子页面*/}
        <div className="children-page-box">
          <div className="children-page">
            {Children.map(children, (child) => {
              return cloneElement(child, props);
              // return child;
            })}
          </div>
        </div>
      </Layout>
    </Layout>
  );
});

// 装饰器
export const layout = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <Index {...this.props}>
          <Component />
        </Index>
      );
    }
  };
};

export default mapRedux()(addRouterApi(Index));
