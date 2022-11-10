/*
 * @Author: your name
 * @Date: 2021-08-23 19:51:05
 * @LastEditTime: 2021-08-26 17:03:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Form/index.js
 */
import React, {
  Suspense,
  lazy,
  useState,
  useCallback,
  Children,
  PureComponent,
  useEffect,
  useRef,
} from "react";
import {
  Form as AntdForm,
  Input,
  Button,
  Checkbox,
  InputNumber,
  Radio,
  Rate,
  Select,
  Switch,
  Slider,
  TimePicker,
  Transfer,
} from "antd";
import Form from "client/common/component/Form";
import "./index.less";
export default (props) => {
  const formRef = useRef(null);
  let {
    fields = [],
    formProps = {},
    onReady = () => {},
    footer = () => null,
  } = props;

  const ready = (form) => {
    formRef.current = form;
    onReady(form);
  };
  let footerNode = footer(formRef);
  return (
    <div className="form-page">
      <div
        className="form-box"
        style={{
          height: footerNode ? "calc(100% - 65px)" : "100%",
        }}
      >
        <Form {...props} onReady={ready}></Form>
      </div>
      {footerNode ? <div className="footer">{footerNode}</div> : null}
    </div>
  );
};
