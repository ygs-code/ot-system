import "./index.less";

import { Skeleton } from "antd";
import Layout from "client/component/Layout";
import { mapRedux } from "client/redux";
import Routers, { addRouterApi } from "client/router";
import React, { useEffect, useState } from "react";
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
