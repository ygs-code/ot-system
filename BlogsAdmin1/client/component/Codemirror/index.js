import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import className from "classnames";
import debounce from "lodash.debounce";
import isEqual from "lodash.isequal";
import codemirror from "codemirror";

function normalizeLineEndings(str) {
  if (!str) return str;
  return str.replace(/\r\n|\r/g, "\n");
}

class CodeMirror extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }
  static defaultProps = {
    preserveScrollPosition: false,
  };
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.any,
    codeMirrorInstance: PropTypes.func,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onCursorActivity: PropTypes.func,
    onFocusChange: PropTypes.func,
    onScroll: PropTypes.func,
    options: PropTypes.object,
    path: PropTypes.string,
    value: PropTypes.string,
    preserveScrollPosition: PropTypes.bool,
  };

  componentDidMount() {
    this.codeMirror = codemirror.fromTextArea(
      this.textareaNode,
      this.props.options
    );
    this.codeMirror.on("change", this.codemirrorValueChanged);
    this.codeMirror.on("cursorActivity", this.cursorActivity);
    this.codeMirror.on("focus", this.focusChanged.bind(this, true));
    this.codeMirror.on("blur", this.focusChanged.bind(this, false));
    this.codeMirror.on("scroll", this.scrollChanged);
    this.codeMirror.setValue(this.props.defaultValue || this.props.value || "");

    if (typeof this.props.options === "object") {
      for (let optionName in this.props.options) {
        if (this.props.options.hasOwnProperty(optionName)) {
          this.setOptionIfChanged(optionName, this.props.options[optionName]);
        }
      }
    }
  }
  componentWillUnmount() {
    // is there a lighter-weight way to remove the cm instance?
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.codeMirror &&
      nextProps.value !== undefined &&
      nextProps.value !== this.props.value &&
      normalizeLineEndings(this.codeMirror.getValue()) !==
        normalizeLineEndings(nextProps.value)
    ) {
      if (this.props.preserveScrollPosition) {
        var prevScrollPosition = this.codeMirror.getScrollInfo();
        this.codeMirror.setValue(nextProps.value);
        this.codeMirror.scrollTo(
          prevScrollPosition.left,
          prevScrollPosition.top
        );
      } else {
        this.codeMirror.setValue(nextProps.value);
      }
      return true;
    }
    return false;
  }
  setOptionIfChanged = (optionName, newValue) => {
    const oldValue = this.codeMirror.getOption(optionName);
    if (!isEqual(oldValue, newValue)) {
      this.codeMirror.setOption(optionName, newValue);
    }
  };
  getCodeMirror = () => {
    return this.codeMirror;
  };
  focus = () => {
    if (this.codeMirror) {
      this.codeMirror.focus();
    }
  };
  focusChanged = (focused) => {
    this.setState({
      isFocused: focused,
    });
    this.props.onFocusChange && this.props.onFocusChange(focused);
  };
  cursorActivity = (cm) => {
    this.props.onCursorActivity && this.props.onCursorActivity(cm);
  };
  scrollChanged = (cm) => {
    this.props.onScroll && this.props.onScroll(cm.getScrollInfo());
  };
  codemirrorValueChanged = (doc, change) => {
    if (this.props.onChange && change.origin !== "setValue") {
      this.props.onChange(doc.getValue(), change);
    }
  };
  render() {
    const editorClassName = className(
      "ReactCodeMirror",
      this.state.isFocused ? "ReactCodeMirror--focused" : null,
      this.props.className
    );
    return (
      <div className={editorClassName}>
        <textarea
          ref={(ref) => (this.textareaNode = ref)}
          name={this.props.name || this.props.path}
          defaultValue={this.props.value}
          autoComplete="off"
          autoFocus={this.props.autoFocus}
        />
      </div>
    );
  }
}
// CodeMirror.propTypes = {
//   autoFocus: PropTypes.bool,
//   className: PropTypes.any,
//   codeMirrorInstance: PropTypes.func,
//   defaultValue: PropTypes.string,
//   name: PropTypes.string,
//   onChange: PropTypes.func,
//   onCursorActivity: PropTypes.func,
//   onFocusChange: PropTypes.func,
//   onScroll: PropTypes.func,
//   options: PropTypes.object,
//   path: PropTypes.string,
//   value: PropTypes.string,
//   preserveScrollPosition: PropTypes.bool,
// };
export default CodeMirror;
