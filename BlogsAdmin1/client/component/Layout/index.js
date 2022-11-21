import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import "./index.less";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import React, {
  Suspense,
  lazy,
  useState,
  useCallback,
  Children,
  useEffect,
  memo
} from "react";
import {
  routePaths,
  historyPush,
  getHistory,
  addRouterApi
} from "client/router";

import { getUserInfo } from "client/assets/js/request";

import {
  Layout,
  //  Menu,
  Select
} from "antd";
import Menu from "client/component/Menu";
import Header from "client/component/Header";
import Store, { mapRedux } from "client/redux";
// import token from "@/common/js/request/token";
const { Sider, Content } = Layout;

// 权限跳转登录页面可以在这控制
const Index = memo((props) => {
  const {
    state: {
      breadcrumb: { items = [] } = {},
      user: { userInfo: { name, phone, account } = {} } = {}
    } = {},
    children,
    history: { push }
  } = props;
  console.log("props========", props);
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

  const getUser = useCallback(async () => {
    // let data = await getUserInfo({});
    // console.log("data=========", data);
  }, []);

  useEffect(() => {
    const { dispatch: { user: { login, fetchUser } = {} } = {} } = props;
    getUser();
    return () => {};
  }, []);
  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);
  return (
    <div className="root-layout">
      <div className="sider-layout">
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
      </div>

      <div className="site-layout">
        {/*顶部*/}
        <Header
          className="site-layout"
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
        <div className="children-page">
          {Children.map(children, (child, index) => {
            return <>{child}</>;
          })}
        </div>
      </div>
    </div>
  );
});

// 装饰器
export const layout = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <Index {...this.props}>
          <Component {...this.props} />
        </Index>
      );
    }
  };
};

export default mapRedux()(addRouterApi(Index));
