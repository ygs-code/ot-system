import { Skeleton } from "antd";
import { getUserInfo } from "client/assets/js/request";
import Layout from "client/component/Layout";
import { mapRedux } from "client/redux";
import Routers, { addRouterApi } from "client/router";
import React, { useCallback, useEffect, useState } from "react";

const Index = (props) => {
  const {
    dispatch: {
      user: { setUserInfo }
    }
  } = props;
  const { routesComponent, history } = props;
  const [loading, setLoading] = useState(true);

  const getUser = useCallback(async () => {
    let { data } = await getUserInfo({});
    setUserInfo(data);
  }, []);

  useEffect(() => {
    getUser().then(() => {
      setLoading(false);
    });
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
