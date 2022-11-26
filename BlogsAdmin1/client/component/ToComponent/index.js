import React, {
  Children,
  cloneElement,
  forwardRef
  // memo
} from "react";
/* eslint-disable   */
const ToComponent = forwardRef((props, ref) => {
  const { children } = props;
  return children
    ? Children.map(children, (child) => {
        return cloneElement(child, props);
      })
    : null;
});

const toComponent = (Component) => {
  return forwardRef((props, ref) => {
    return <Component {...props} />;
  });
};
/* eslint-enable   */
export { toComponent };

export default ToComponent;
