import PropTypes from "prop-types";
import { Children, cloneElement } from "react";

const Route = (props) => {
  const { children } = props;
  return children
    ? Children.map(children, (child) => {
        return cloneElement(child, props);
      })
    : null;
};

Route.propTypes = {
  //   key: PropTypes.string.isRequired,
  //   exact: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};

export { Route };
