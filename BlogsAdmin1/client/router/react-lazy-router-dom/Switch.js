import PropTypes from "prop-types";
import React, {
  Children,
  Component,
  createContext
  // isValidElement
  // createElement
} from "react";
// import { isContextConsumer, isValidElementType } from "react-is";
import invariant from "tiny-invariant";

import { matchPath } from "./matchPath";
import { __RouterContext as RouterContext } from "./Router";

var createNamedContext = function createNamedContext(name) {
  var context = createContext();
  context.displayName = name;
  return context;
};

const MatchContext = createNamedContext("Router-Match");

// const isValidElement = (object) => {
//   // return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
//   return typeof object === "object" && object !== null && object.$$typeof;
// };

const isValidElementType = (type) => {
  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === "function" && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol
    ? Symbol.for("react.strict_mode")
    : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?
  var REACT_ASYNC_MODE_TYPE = hasSymbol
    ? Symbol.for("react.async_mode")
    : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol
    ? Symbol.for("react.concurrent_mode")
    : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol
    ? Symbol.for("react.forward_ref")
    : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol
    ? Symbol.for("react.suspense_list")
    : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol
    ? Symbol.for("react.fundamental")
    : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 0xead7;

  return (
    // typeof type === "string" ||
    // typeof type === "function" ||
    // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE ||
    type === REACT_CONCURRENT_MODE_TYPE ||
    type === REACT_PROFILER_TYPE ||
    type === REACT_STRICT_MODE_TYPE ||
    type === REACT_SUSPENSE_TYPE ||
    type === REACT_SUSPENSE_LIST_TYPE ||
    (typeof type === "object" &&
      type !== null &&
      (type.$$typeof === REACT_FRAGMENT_TYPE ||
        type.$$typeof === REACT_CONCURRENT_MODE_TYPE ||
        type.$$typeof === REACT_PROFILER_TYPE ||
        type.$$typeof === REACT_STRICT_MODE_TYPE ||
        type.$$typeof === REACT_SUSPENSE_TYPE ||
        type.$$typeof === REACT_SUSPENSE_LIST_TYPE ||
        type.$$typeof === REACT_ELEMENT_TYPE ||
        type.$$typeof === REACT_ASYNC_MODE_TYPE ||
        type.$$typeof === REACT_PORTAL_TYPE ||
        type.$$typeof === REACT_LAZY_TYPE ||
        type.$$typeof === REACT_MEMO_TYPE ||
        type.$$typeof === REACT_PROVIDER_TYPE ||
        type.$$typeof === REACT_CONTEXT_TYPE ||
        type.$$typeof === REACT_FORWARD_REF_TYPE ||
        type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
        type.$$typeof === REACT_RESPONDER_TYPE ||
        type.$$typeof === REACT_SCOPE_TYPE ||
        type.$$typeof === REACT_BLOCK_TYPE))
  );
};

const NullComponent = () => {
  return <div> </div>;
};
class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AsynComponent: NullComponent,
      locationKey: "",
      match: null,
      isSync: true
    };
  }
  componentDidMount() {
    let { loading: Loading } = this.context;
    if (Loading) {
      this.setState({
        AsynComponent: Loading
      });
    }
  }

  getSyncComponent = (component, callback = () => {}) => {
    if (
      Object.prototype.toString.call(component).slice(1, -1) === "object Object"
    ) {
      if (isValidElementType(component)) {
        return component;
      } else if (component.__esModule) {
        component = this.getSyncComponent(component.default, callback);
      }
    } else if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Function"
    ) {
      component = component(this.props);
      component = this.getSyncComponent(component, callback);
    } else if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Promise"
    ) {
      this.resolveComponent(component, callback).then((AsynComponent) => {
        callback(AsynComponent);
      });
      return null;
    }
    return component;
  };

  resolveComponent = async (component, callback = () => {}) => {
    if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Promise"
    ) {
      /* eslint-disable   */
      // component = await new Promise(async (relove, reject) => {
      //   setTimeout(async () => {
      //     let data = await component;
      //     relove(data);
      //   }, 2000);
      // });
      /* eslint-enable   */
      component = await component;
      component = await this.resolveComponent(component, callback);
    } else {
      component = this.getSyncComponent(component, callback);
    }
    return component;
  };

  getComponent = () => {
    const { AsynComponent, locationKey, match } = this.state;
    let { children } = this.props;
    let { history = {}, location = {}, routesComponent = [] } = this.context;
    let { key } = location;

    if (!Object.keys(this.context).length) {
      throw new Error(
        invariant(false, "You should not use <Switch/> outside a <Router>")
      );
    }

    if (key === locationKey) {
      return (
        <MatchContext.Provider
          value={{
            history,
            location,
            match
          }}>
          <AsynComponent
            match={match}
            history={history}
            location={location}
            exact={match.isExact}
            routesComponent={routesComponent}
          />
        </MatchContext.Provider>
      );
    }

    var newMatch = null;
    let SyncComponent = null;

    Children.forEach(children, (el) => {
      if (newMatch === null) {
        let {
          path: pathProp,
          exact,
          strict,
          sensitive,
          from,
          component,
          element,
          render
        } = el.props;
        let path = pathProp || from;
        component = component || element || render;
        newMatch = matchPath(location.pathname, {
          path: path,
          exact: exact,
          strict: strict,
          sensitive: sensitive
        });

        if (newMatch) {
          SyncComponent = this.getSyncComponent(component, (AsynComponent) => {
            this.setState({
              isSync: false,
              AsynComponent,
              match: newMatch,
              locationKey: key
            });
          });
          if (SyncComponent) {
            this.setState({
              isSync: true,
              AsynComponent: SyncComponent,
              match: newMatch,
              locationKey: key
            });
          }
        }
      }
    });
    return SyncComponent ? (
      <MatchContext.Provider
        value={{
          history,
          location,
          match: newMatch
        }}>
        <SyncComponent
          match={newMatch}
          history={history}
          location={location}
          exact={newMatch?.isExact}
          routesComponent={routesComponent}
        />
      </MatchContext.Provider>
    ) : (
      <MatchContext.Provider
        value={{
          history,
          location,
          match: newMatch
        }}>
        <AsynComponent
          match={newMatch}
          history={history}
          location={location}
          exact={newMatch?.isExact}
          routesComponent={routesComponent}
        />
      </MatchContext.Provider>
    );
  };

  render() {
    return this.getComponent();
  }
}

Switch.contextType = RouterContext;
Switch.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export { isValidElementType, MatchContext, Switch };
