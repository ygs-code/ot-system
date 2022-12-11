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
  let {
    type = "",
    itemChildProps = {},
    component,
    render,
    onChange = () => {},
    value
  } = props;
  type = type.toLowerCase();
  const mapTpye = {
    input: (
      <Input {...itemChildProps} value={value} onChange={onChange}></Input>
    ),
    inputnumber: (
      <InputNumber
        {...itemChildProps}
        value={value}
        onChange={onChange}></InputNumber>
    ),
    radio: (
      <Radio {...itemChildProps} value={value} onChange={onChange}></Radio>
    ),
    rate: <Rate {...itemChildProps} value={value} onChange={onChange}></Rate>,
    select: (
      <Select {...itemChildProps} value={value} onChange={onChange}></Select>
    ),
    switch: (
      <Switch {...itemChildProps} value={value} onChange={onChange}></Switch>
    ),
    slider: (
      <Slider {...itemChildProps} value={value} onChange={onChange}></Slider>
    ),
    timepicker: (
      <TimePicker
        {...itemChildProps}
        value={value}
        onChange={onChange}></TimePicker>
    ),
    transfer: (
      <Transfer
        {...itemChildProps}
        value={value}
        onChange={onChange}></Transfer>
    ),
    checkbox: (
      <Checkbox
        {...itemChildProps}
        value={value}
        onChange={onChange}></Checkbox>
    ),
    password: (
      <Password
        {...itemChildProps}
        value={value}
        onChange={onChange}></Password>
    )
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
    children = [],
    onConfirm = () => {},
    onReset = () => {}
  } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    onConfirm(values);
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
          console.log("item===", item);
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
    shrinkLength,
    onConfirm = () => {},
    onReset = () => {}
  } = props;
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    onConfirm(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFill = () => {
    const values = form.getFieldsValue();
    const restValues = Object.keys(values).reduce((acc, item) => {
      return {
        ...acc,
        [item]: undefined
      };
    }, {});

    form.setFieldsValue(restValues);
    onReset(restValues);
  };

  useEffect(() => {
    onReady(form);
  }, []);

  const renderFields = useCallback(() => {
    let length = shrinkLength
      ? expand
        ? fields.length
        : shrinkLength > fields.length
        ? fields.length
        : shrinkLength
      : fields.length;
    let fieldsVonde = [];
    for (let index = 0; index < length; index++) {
      const item = fields[index];

      // label: "用户名称",
      // name: "name",
      // type: "input",
      // span: 1

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
          {shrinkLength >= fields.length ? null : (
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
          )}
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button htmlType="button" onClick={onFill}>
            重置
          </Button>
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
