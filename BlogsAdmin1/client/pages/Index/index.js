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
import Routers, {
  routePaths,
  historyPush,
  getHistory,
  addRouterApi
} from "client/router";
import {
  // Layout,
  //  Menu,
  Select,
  Input,
  Skeleton
} from "antd";
import Layout, { layout } from "client/component/Layout";
import Store, { mapRedux } from "client/redux";
const Index = (props) => {
  const { routesComponent, history } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);
  return (
    <Skeleton loading={loading}>
      <Layout>
        <Routers
          level={2}
          history={history}
          routesComponent={routesComponent}
        />
      </Layout>
    </Skeleton>
  );
};

export default mapRedux()(addRouterApi(Index));
