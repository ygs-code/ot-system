import { Children, cloneElement, memo } from "react";

const ToComponent = memo((props) => {
  const { children } = props;
  return children
    ? Children.map(children, (child) => {
        return cloneElement(child, props);
      })
    : null;
});

const toComponent = (Component) => {
  return memo(Component);
};
export { ToComponent };

export default toComponent;
