/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:13:35
 * @FilePath: /react-ssr-lazy-loading/client/router/Routers.js
 * @Description:
 */
import React from "react";
import PropTypes from "prop-types";
import Loading from "client/component/Loading";
import {
  Router,
  Switch as Routes,
  Route
} from "client/router/react-lazy-router-dom";

const NoPages = (props) => {
  console.log("props=====", props);

  return (
    <div style={{ padding: "1rem" }}>
      <p>There s nothing here!</p>
    </div>
  );
};
const Routers = (props) => {
  const { history, routesComponent = [], level } = props;

  return (
    <Router
      history={history}
      loading={Loading}
      routesComponent={routesComponent}>
      <Routes>
        {routesComponent
          .filter((item) => {
            return item.level == level;
          })
          .map((route) => {
            let { path, exact = true, Component } = route;
            return (
              <Route
                key={path}
                exact={exact}
                path={path}
                component={Component}
              />
            );
          })}
        <Route path="*" exact={true} component={NoPages} />
      </Routes>
    </Router>
  );
};

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  state: PropTypes.object,
  context: PropTypes.object
};
export default Routers;
