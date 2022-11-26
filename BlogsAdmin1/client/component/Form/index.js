/*
 * @Author: your name
 * @Date: 2021-08-23 19:51:05
 * @LastEditTime: 2021-08-26 18:17:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Form/index.js
 */
import "./index.less";

import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer
} from "antd";
import { CheckDataType } from "client/utils";
import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useState
} from "react";
const { Password } = Input;
const ItemChild = (props) => {
  let { type = "", itemChildProps = {}, component, render } = props;
  type = type.toLowerCase();
  const mapTpye = {
    input: <Input {...itemChildProps}></Input>,
    inputnumber: <InputNumber {...itemChildProps}></InputNumber>,
    radio: <Radio {...itemChildProps}></Radio>,
    rate: <Rate {...itemChildProps}></Rate>,
    select: <Select {...itemChildProps}></Select>,
    switch: <Switch {...itemChildProps}></Switch>,
    slider: <Slider {...itemChildProps}></Slider>,
    timepicker: <TimePicker {...itemChildProps}></TimePicker>,
    transfer: <Transfer {...itemChildProps}></Transfer>,
    checkbox: <Checkbox {...itemChildProps}></Checkbox>,
    password: <Password {...itemChildProps}></Password>
  };
  return render
    ? render(props)
    : component
    ? component
    : type in mapTpye
    ? mapTpye[type]
    : null;
};

const BaseForm = (props) => {
  const {
    fields = [],
    formProps = {},
    onReady = () => {},
    children = []
  } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    onReady(form);
  }, []);

  return (
    <div className="base-form">
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 5
        }}
        wrapperCol={{
          span: 8
        }}
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formProps}>
        {fields.map((item, index) => {
          const { type, title, items = [] } = item;
          return type !== "section" ? (
            <Form.Item {...item} key={index}>
              <ItemChild {...item}></ItemChild>
            </Form.Item>
          ) : (
            <div className="section" key={index}>
              <div className="title">{title}</div>
              {items.map((item, index) => {
                return (
                  <Form.Item {...item} key={index}>
                    <ItemChild {...item}></ItemChild>
                  </Form.Item>
                );
              })}
            </div>
          );
        })}

        {/* 子节点 */}
        {Children.map(
          CheckDataType.isFunction(children) ? children() : children,
          (child) => {
            return cloneElement(child, props);
          }
        )}
      </Form>
    </div>
  );
};

const SearchForm = (props) => {
  const {
    fields = [],
    formProps = {},
    onReady = () => {},
    children = [],
    shrinkLength
  } = props;
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    onReady(form);
  }, []);

  const renderFields = useCallback(() => {
    let length = shrinkLength
      ? expand
        ? fields.length
        : shrinkLength
      : fields.length;
    let fieldsVonde = [];
    for (let index = 0; index < length; index++) {
      const item = fields[index];
      const { span = 1 } = item;
      fieldsVonde.push(
        <div key={index} className={`span span-${span}`}>
          <Form.Item {...item}>
            <ItemChild {...item}></ItemChild>
          </Form.Item>
        </div>
      );
    }
    return fieldsVonde;
  }, [expand]);

  return (
    <div className="search-base-form-box">
      <Form
        className="search-base-form"
        form={form}
        name="basic"
        labelCol={{
          span: 10
        }}
        wrapperCol={{
          span: 30
        }}
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formProps}>
        {renderFields()}
        <div className={`buttons`}>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}>
            {expand ? (
              <>
                <UpOutlined />
                收起
              </>
            ) : (
              <>
                <DownOutlined /> 展开
              </>
            )}
          </a>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button htmlType="button">重置</Button>
        </div>

        {/* 子节点 */}
        {Children.map(
          CheckDataType.isFunction(children) ? children() : children,
          (child) => {
            return cloneElement(child, props);
          }
        )}
      </Form>
    </div>
  );
};
// BaseForm.SearchForm=SearchForm
export default BaseForm;
export { SearchForm };
